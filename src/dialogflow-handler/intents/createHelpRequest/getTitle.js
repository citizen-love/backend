/* eslint-disable import/no-dynamic-require */
import { collections } from '../../../constants/constants';
import { firebase, fbOps } from '../../../services/services';

const NAME = 'helprequest-get-title';

const intent = agent => async ({
  query, session, locale, ...rest
}) => {

  console.log(locale);
  console.log(rest);

  const { database } = firebase;
  const sessionId = session.split('/').pop();
  const { sms: {
    helpRequestConversation
  } } = require(`../../../locales/${locale}.json`);

  const partialRequest = database.collection(collections.HELP_REQUEST_CONVERSATION).doc(sessionId);
  try {
    await fbOps.create(partialRequest, { title: query });
    return agent.add(helpRequestConversation.getTitleReply);
  } catch (e) {
    console.log(e);
    return agent.add(helpRequestConversation.getTitleError);
  }
};


export default {
  name: NAME,
  intent
};
