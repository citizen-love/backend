import uuid from 'uuid-random';
import { body as bodyVal } from 'express-validator';

import { helpRequestModelPublic, helpRequestModelPrivate } from '../../models/models';
import { collections, urls } from '../../constants/constants';
import { firebase, fbOps, emailService, twillioService, slackService } from '../../services/services';
import { validateSchema } from '../../utils/utils';

const ALLOWED_LANGUAGES = ['en', 'de', 'fr', 'it', 'ru_CH'];
const ALLOWED_SOURCES = ['web', 'sms'];
const EMAIL_TEMPLATE_ID = 'confirmation';
const SMS_BODY_ID = 'helpRequestConfirmation';

const validations = [
  bodyVal('title').exists().isString(),
  bodyVal('description').exists().isString(),
  bodyVal('country').exists().isString(),
  bodyVal('language').exists().custom(val => ALLOWED_LANGUAGES.includes(val)),
  bodyVal('community').exists().isString(),
  bodyVal('location').exists().isLatLong(),
  bodyVal('email').optional().isEmail(),
  bodyVal('phone').optional().isString(),
  bodyVal('category').exists().isArray(),
  bodyVal('customCategory').optional().isString(),
  bodyVal('source').optional().custom(val => ALLOWED_SOURCES.includes(val)),
  validateSchema
];

const handler = async ({ body }, res) => {
  const { database, geoDatabase } = firebase;
  const { getUniqueURL } = urls;

  try {
    const uniqueIdentifier = uuid();
    const helpRequest = geoDatabase.collection(collections.HELP_REQUEST).doc();
    const requesterContact = database.collection(collections.REQUESTER_CONTACT).doc(uniqueIdentifier);

    const helpRequestInformation = helpRequestModelPublic(body);
    const requesterContactInformation = helpRequestModelPrivate({ ...body, id: helpRequest.id });


    await fbOps.create(helpRequest, helpRequestInformation);
    await fbOps.create(requesterContact, requesterContactInformation);

    const emailVariables = {
      ...emailService.getVariables(helpRequestInformation.language, EMAIL_TEMPLATE_ID),
      trackingURL: getUniqueURL(uniqueIdentifier, 'my-request')
    };

    if (helpRequestInformation.source === 'sms') {
      const smsBody = twillioService.getVariables(
        helpRequestInformation.language, SMS_BODY_ID
      ).replace('{{helpRequestUrl}}', getUniqueURL(helpRequest.id, 'help'));
      await twillioService.sendSms(requesterContactInformation.phoneNumber, smsBody);
    }

    await emailService.sendEmail({
      receiver: requesterContactInformation.email,
      templateId: emailService.templateIds[EMAIL_TEMPLATE_ID]
    }, emailVariables);

    await slackService.send(slackService.templates.helpRequest({
      ...helpRequestInformation,
      helpRequestUrl: getUniqueURL(helpRequest.id, 'help')
    }));

    return res.status(200).send({ id: helpRequest.id });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Unexpected Error Happened');
  }


};

export default [...validations, handler];
