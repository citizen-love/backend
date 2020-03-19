import { collections } from '../../constants/constants';
import { database } from '../../services/services';

const handler = async (req, res) => {

  if (!req.body.offer || !req.body.helpRequestId) {
    return res.status(422).send('Payload is invalid');
  }

  try {

    const snapshot = await database.collection(collections.CONTACT_INFORMATION).doc(req.body.helpRequestId).get();
    const values = snapshot.data();

    if (values) {
      return res.status(200).send(`Email sent to ${values.email}`);
    }
    return res.status(404).send('Not found');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Unexpected Error Happened');
  }


};

export default handler;
