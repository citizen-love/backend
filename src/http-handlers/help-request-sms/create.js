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
  const language = 'de'; // languageMatcher(body.Body);

  // eslint-disable-next-line import/no-dynamic-require
  const copy = require(`../../locales/${language}.json`);

  const existingReference = database.collection(collections.HELP_REQUEST_CONVERSATION).doc(phoneNumber);
  const existingDocument = await fbOps.get(existingReference);

  if (!existingDocument) {
    const convSession = helpRequestConversation(phoneNumber);
    await fbOps.create(existingReference, convSession);
    const reply = twillioService.replySms(copy.sms.helpRequestConversation.start);
    return res.send(reply);
  }

  if (moment(existingDocument.expires).isBefore(moment())) {
    await fbOps.deleteDoc(existingReference);
    const reply = twillioService.replySms(copy.sms.helpRequestConversation.sessionExpired);
    return res.send(reply);
  }

  if (existingDocument.stage === FINAL_STAGE) {
    await axios({
      method: 'POST',
      url: `${process.env.SELF_URL}/help-request`,
      data: finishedPayload(existingDocument)
    });
    await fbOps.deleteDoc(existingReference);
    return res.send('');
  }

  const { data, smsReply } = await stageMatcher[existingDocument.stage](body.Body);
  await fbOps.update(existingReference, data);
  const reply = twillioService.replySms(smsReply);
  return res.send(reply);
};

export default integrationHandler;
