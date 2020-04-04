/* eslint-disable import/no-dynamic-require */
import { collections } from '../../../constants/constants';
import { firebase, fbOps } from '../../../services/services';

const NAME = 'helprequest-get-description';

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
    await fbOps.update(partialRequest, { description: query });
    return agent.add(helpRequestConversation.getDescriptionReply);
  } catch (e) {
    console.log(e);
    return agent.add(helpRequestConversation.getDescriptionError);
  }
};


export default {
  name: NAME,
  intent
};
