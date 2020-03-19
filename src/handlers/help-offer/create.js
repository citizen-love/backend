import { body, param } from 'express-validator';
import { collections } from '../../constants/constants';
import { database } from '../../services/services';

const validations = [
  param('helpRequestId').exists().isString(),
  body('offerBody').exists().isString()
];

const handler = async ({ body: {
  offerBody
}, params: { helpRequestId } }, res) => {

  try {

    const snapshot = await database.collection(collections.HELP_REQUEST).doc(helpRequestId).get();
    const values = snapshot.data();

    if (values) {
      // we have an email address sends the offerBody
      console.log(offerBody);
      console.log(values);
      return res.status(200).send(offerBody);
    }
    return res.status(404).send(' ');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Unexpected Error Happened');
  }


};

export default [...validations, handler];
