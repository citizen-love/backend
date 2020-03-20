import { body, param } from 'express-validator';
import { collections } from '../../constants/constants';
import { firebase } from '../../services/services';
import { validateSchema } from '../../utils/utils';

const validations = [
  param('helpRequestId').exists().isString(),
  body('offerBody').exists().isString(),
  validateSchema
];

const handler = async ({ body: {
  offerBody
}, params: { helpRequestId } }, res) => {
  const { database, incrementField } = firebase;
  try {

    const contactData = await database.collection(collections.HELP_REQUEST).doc(helpRequestId).get();
    const contactValues = contactData.data();

    if (contactValues) {
      await database.collection(collections.HELP_REQUEST).doc(helpRequestId).update({
        counter: incrementField(1)
      });
      return res.status(200).send({
        helpRequestId, offerBody
      });
    }
    return res.status(404).send(' ');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Unexpected Error Happened');
  }


};

export default [...validations, handler];
