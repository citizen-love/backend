import { body } from 'express-validator';

import { collections } from '../../constants/constants';
import { firebase, fbOps, emailService } from '../../services/services';
import { validateSchema } from '../../utils/utils';

const ALLOWED_LANGUAGES = ['en', 'de', 'fr', 'it', 'ru_CH'];
const EMAIL_TEMPLATE_ID = 'emailSubscriptionConfirmation';

const validations = [
  body('email').exists().isString(),
  body('location').exists().isLatLong(),
  body('radius').optional().isNumeric(),
  body('language').exists().custom(val => ALLOWED_LANGUAGES.includes(val)),
  validateSchema
];

const handler = async ({ body: {
  location, email, radius = 100, language
} }, res) => {
  const { geoDatabase, getLocationEntry } = firebase;

  try {
    const helpGiver = geoDatabase.collection(collections.HELPGIVER_CONTACT).doc();

    const helpGiverInformation = {
      email,
      radius,
      language,
      coordinates: getLocationEntry(location),
      createdAt: new Date()
    };


    await fbOps.create(helpGiver, helpGiverInformation);

    const emailVariables = emailService.getVariables(language, EMAIL_TEMPLATE_ID);

    await emailService.sendEmail({
      receiver: email,
      templateId: emailService.templateIds[EMAIL_TEMPLATE_ID]
    }, emailVariables);
    return res.status(200).send({ id: helpGiver.id });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Unexpected Error Happened');
  }


};

export default [...validations, handler];
