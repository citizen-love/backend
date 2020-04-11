import moment from 'moment';
import axios from 'axios';

import { helpRequestConversation } from '../../models/models';
import { twillioService, firebase, fbOps } from '../../services/services';
import { collections } from '../../constants/constants';
// import { languageMatcher } from '../../utils/utils';

import stageMatcher from './elements/stageMatcher';
import finishedPayload from './elements/smsFinishedPayload';

const FINAL_STAGE = 'get-confirmation';

const integrationHandler = async ({ body }, res) => {
  const { database } = firebase;
  const phoneNumber = body.From;

  const existingReference = database.collection(collections.HELP_REQUEST_CONVERSATION).doc(phoneNumber);
  const existingDocument = await fbOps.get(existingReference);

  if (!existingDocument) {
    const { sms } = require('../../locales/en.json');
    const convSession = helpRequestConversation(phoneNumber);
    await fbOps.create(existingReference, convSession);
    const reply = twillioService.replySms(sms.helpRequestConversation.start);
    return res.send(reply);
  }

  const nowMS = moment().valueOf();
  // eslint-disable-next-line no-underscore-dangle
  const expires = existingDocument.expires._seconds * 1000;

  if (expires < nowMS) {
    // eslint-disable-next-line import/no-dynamic-require
    const { sms } = require(`../../locales/${existingDocument.language || 'en'}.json`);
    await fbOps.deleteDoc(existingReference);
    const reply = twillioService.replySms(sms.helpRequestConversation.sessionExpired);
    return res.send(reply);
  }

  if (existingDocument.stage === FINAL_STAGE) {
    const requestPayload = finishedPayload(existingDocument);
    await axios({
      method: 'POST',
      url: `${process.env.SELF_URL}/help-request`,
      data: requestPayload
    });
    await fbOps.deleteDoc(existingReference);
    return res.send('');
  }

  const { data, smsReply } = await stageMatcher[existingDocument.stage](body.Body, existingDocument.language);
  await fbOps.update(existingReference, data);
  const reply = twillioService.replySms(smsReply);
  return res.send(reply);
};

export default integrationHandler;
