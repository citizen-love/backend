import uuid from 'uuid-random';

import { collections } from '../../constants/constants';
import { contactInformation } from '../../models/models';
import { database } from '../../services/services';

const handler = async (req, res) => {
  const contactInfoModel = contactInformation(req.body);

  if (!contactInfoModel.helpRequestId) {
    return res.status(422).send('Payload is invalid');
  }

  try {

    await database.collection(collections.CONTACT_INFORMATION).doc(uuid()).set(contactInfoModel);
    return res.status(200).send('Resource created');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Unexpected Error Happened');
  }


};

export default handler;
