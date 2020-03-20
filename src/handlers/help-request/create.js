import uuid from 'uuid-random';
import { body } from 'express-validator';

import { collections } from '../../constants/constants';
import { firebase, fbOps, emailService } from '../../services/services';
import { validateSchema } from '../../utils/utils';

const validations = [
  body('title').exists().isString(),
  body('description').exists().isString(),
  body('country').exists().isString(),
  body('community').exists().isString(),
  body('location').exists().isString(),
  body('email').exists().isEmail(),
  body('phone').optional().isString(),
  body('category').exists().isString(),
  body('customCategory').optional().isString(),
  validateSchema
];

const handler = async ({ body: {
  title, description, country,
  community, location, email,
  phone, category, customCategory
} }, res) => {
  const { database } = firebase;
  try {
    const helpRequest = database.collection(collections.HELP_REQUEST).doc();
    const requesterContact = database.collection(collections.REQUESTER_CONTACT).doc(uuid());

    const helpRequestInformation = {
      title,
      description,
      country,
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

    await emailService.sendEmail({
      receiver: requesterContactInformation.email,
      templateId: emailService.templateIds.confirmation
    });
    return res.status(200).send({ id: helpRequest.id });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Unexpected Error Happened');
  }


};

export default [...validations, handler];
