/* eslint-disable no-restricted-globals */
import { body as bodyVal } from 'express-validator';

import { helpGiverModel } from '../../models/models';
import { collections } from '../../constants/constants';
import { firebase, fbOps, emailService, slackService } from '../../services/services';
import { validateSchema } from '../../utils/utils';

const ALLOWED_LANGUAGES = ['en', 'de', 'fr', 'it', 'rm'];
const EMAIL_TEMPLATE_ID = 'emailSubscriptionConfirmation';

const validations = [
  bodyVal('email').exists().isString(),
  bodyVal('location').exists().isLatLong(),
  bodyVal('radius').optional().isNumeric(),
  bodyVal('language').exists().custom(val => ALLOWED_LANGUAGES.includes(val)),
  bodyVal('preferences').optional().isArray(),
  bodyVal('phoneNumber').optional().isString(),
  bodyVal('uid').exists().isString(),
  validateSchema
];

const handler = async ({ body }, res) => {
  const { geoDatabase } = firebase;

  try {
    const helpGiver = geoDatabase.collection(collections.HELPGIVER_CONTACT).doc(body.uid);
    const helpGiverInformation = helpGiverModel(body);
    const emailVariables = emailService.getVariables(helpGiverInformation.language, EMAIL_TEMPLATE_ID);


    await fbOps.create(
      helpGiver,
      helpGiverInformation
    );
    if (helpGiverInformation.preferences.includes('email')) {
      await emailService.sendEmail({
        receiver: helpGiverInformation.email,
        templateId: emailService.templateIds[EMAIL_TEMPLATE_ID]
      }, emailVariables);
    }
    await slackService.send(
      slackService.templates.watchlistSignup(helpGiverInformation.email)
    );

    return res.status(200).send({ uid: helpGiverInformation.uid });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Unexpected Error Happened');
  }


};

export default [...validations, handler];
