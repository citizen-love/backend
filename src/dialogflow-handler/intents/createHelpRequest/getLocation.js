/* eslint-disable import/no-dynamic-require */
import { collections } from '../../../constants/constants';
import { firebase, locationService, fbOps } from '../../../services/services';

const NAME = 'helprequest-get-location';

const intent = agent => async ({
  query, session, locale
}) => {

  const { database } = firebase;
  const sessionId = session.split('/').pop();
  const { sms: {
    helpRequestConversation
  } } = require(`../../../locales/${locale}.json`);

  const partialRequest = database.collection(collections.HELP_REQUEST_CONVERSATION).doc(sessionId);
  try {
    const coordinates = await locationService.searchByZIP(query, 'ch');
    await fbOps.update(partialRequest, { zip: coordinates });
    return agent.add(helpRequestConversation.getLocationReply);
  } catch (e) {
    console.log(e);
    return agent.add(helpRequestConversation.getLocationError);
  }
};


export default {
  name: NAME,
  intent
};
