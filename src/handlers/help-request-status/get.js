import { param } from 'express-validator';
import { collections } from '../../constants/constants';
import { database } from '../../services/services';

const validations = [
  param('helpStatusId')
    .exists()
    .isString()
    .custom(val => {
      const validuuid = new RegExp(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);
      return validuuid.test(val);
    })
];

const handler = async ({ params: {
  helpStatusId
} }, res) => {
  try {

    const snapshot = await database.collection(collections.REQUESTER_CONTACT).doc(helpStatusId).get();
    const values = snapshot.data();

    if (values) {
      return res.status(200).send(values);
    }
    return res.status(404).send('');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Unexpected Error Happened');
  }


};

export default [...validations, handler];
