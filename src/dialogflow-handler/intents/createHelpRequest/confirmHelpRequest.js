import axios from 'axios';


/* eslint-disable import/no-dynamic-require */
import { collections } from '../../../constants/constants';
import { firebase, fbOps } from '../../../services/services';

const NAME = 'helprequest-confirm';

const intent = agent => async ({ session, locale, originalRequest }) => {

  const { database } = firebase;
  const { phoneNumber } = originalRequest.payload;
  const sessionId = session.split('/').pop();

  const requestToConfirm = database.collection(collections.HELP_REQUEST_CONVERSATION).doc(sessionId);
  try {
    const {
      title, description, zip, email, category
    } = await fbOps.get(requestToConfirm, false);
    const payload = {
      title,
      description,
      country: 'CH',
      community: 'Not defined',
      location: `${zip.lat},${zip.lng}`,
      email,
      category,
      language: locale,
      source: 'sms',
      phone: phoneNumber || ''
    };

    await axios({
      method: 'POST',
      url: `${process.env.SELF_URL}/help-request`,
      data: payload
    });
    agent.add(' ');
  } catch (e) {
    console.log(e);
    agent.add(' ');
  }
};


export default {
  name: NAME,
  intent
};
