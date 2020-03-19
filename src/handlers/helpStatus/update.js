import { collections } from '../../constants/constants';
import { database } from '../../services/services';

const handler = async ({ body, params }, res) => {
  const validator = new RegExp(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);

  if (!params.trackingId || !validator.test(params.trackingId) || !['completed', 'started', 'cancelled'].includes(body.status)) {
    return res.status(422).send('Payload is invalid');
  }

  try {

    const snapshot = await database.collection(collections.CONTACT_INFORMATION).doc(params.trackingId).get();
    const values = snapshot.data();

    if (values) {
      await database.collection(collections.HELP_REQUEST).doc(values.helpRequestId).update({
        status: body.status
      });
      return res.status(200).send('status updated');
    }
    return res.status(404).send('Not found');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Unexpected Error Happened');
  }


};

export default handler;
