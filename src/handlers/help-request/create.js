import uuid from 'uuid-random';
import { body } from 'express-validator';

import { collections } from '../../constants/constants';
import { firebase, fbOps, emailService } from '../../services/services';
import { validateSchema } from '../../utils/utils';

const ALLOWED_LANGUAGES = ['en', 'de', 'fr', 'it', 'ru_CH'];
const EMAIL_TEMPLATE_ID = 'confirmation';
const getUniqueURL = hash => `https://citizen.love/my-request/${hash}`;

const validations = [
  body('title').exists().isString(),
  body('description').exists().isString(),
  body('country').exists().isString(),
  body('language').exists().custom(val => ALLOWED_LANGUAGES.includes(val)),
  body('community').exists().isString(),
  body('location').exists().isString(),
  body('email').exists().isEmail(),
  body('phone').optional().isString(),
  body('category').exists().isArray(),
  body('customCategory').optional().isString(),
  validateSchema
];

const handler = async ({ body: {
  title, description, country, language,
  community, location, email,
  phone = '', category, customCategory = ''
} }, res) => {
  const { database } = firebase;
  try {
    const uniqueIdentifier = uuid();
    const helpRequest = database.collection(collections.HELP_REQUEST).doc();
    const requesterContact = database.collection(collections.REQUESTER_CONTACT).doc(uniqueIdentifier);

    const helpRequestInformation = {
      title,
      description,
      country,
      language,
      community,
      location,
      category,
      customCategory,
      createdAt: new Date(),
      counter: 0,
      status: 'started' };
    const requesterContactInformation = { email, phone, helpRequestId: helpRequest.id };


    await fbOps.create(helpRequest, helpRequestInformation);
    await fbOps.create(requesterContact, requesterContactInformation);

    const emailVariables = {
      ...emailService.getVariables(language, EMAIL_TEMPLATE_ID),
      trackingURL: getUniqueURL(uniqueIdentifier)
    };

    await emailService.sendEmail({
      receiver: requesterContactInformation.email,
      templateId: emailService.templateIds[EMAIL_TEMPLATE_ID]
    }, emailVariables);
    return res.status(200).send({ id: helpRequest.id });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Unexpected Error Happened');
  }


};

export default [...validations, handler];
