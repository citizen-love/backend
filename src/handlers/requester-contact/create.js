import uuid from 'uuid-random';
import { body } from 'express-validator';

import { collections } from '../../constants/constants';
import { database } from '../../services/services';

const validations = [
  body('helpRequestId').exists().isString(),
  body('email').exists().isEmail(),
  body('phone').optional().isString()
];

const handler = async ({ body: {
  helpRequestId, email, phone
} }, res) => {
  try {

    await database.collection(collections.REQUESTER_CONTACT).doc(uuid()).set({
      helpRequestId, email, phone
    });
    return res.status(200).send({ helpRequestId, email, phone });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Unexpected Error Happened');
  }


};

export default [...validations, handler];
