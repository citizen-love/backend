import uuid from 'uuid-random';
import { body } from 'express-validator';

import { collections } from '../../constants/constants';
import { firebase } from '../../services/services';
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
  const publicInformation = { title, description, country, community, location, category, customCategory };
  const privateInformation = { email, phone };
  try {
    const helpRequest = database.collection(collections.HELP_REQUEST).doc();
    await helpRequest.set({
      ...publicInformation,
      createdAt: new Date(),
      counter: 0
    });

    await database.collection(collections.REQUESTER_CONTACT).doc(uuid()).set({
      ...privateInformation,
      helpRequestId: helpRequest.id
    });
    return res.status(200).send({ id: helpRequest.id });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Unexpected Error Happened');
  }


};

export default [...validations, handler];
