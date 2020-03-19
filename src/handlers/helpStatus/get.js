import { collections } from '../../constants/constants';
import { database } from '../../services/services';

const handler = async (req, res) => {
  const validator = new RegExp(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);

  if (!req.params.trackingId || !validator.test(req.params.trackingId)) {
    return res.status(422).send('Payload is invalid');
  }

  try {

    const snapshot = await database.collection(collections.CONTACT_INFORMATION).doc(req.params.trackingId).get();
    const values = snapshot.data();

    if (values) {
      return res.status(200).send(values);
    }
    return res.status(404).send('Not found');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Unexpected Error Happened');
  }


};

export default handler;
