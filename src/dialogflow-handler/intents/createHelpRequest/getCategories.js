/* eslint-disable import/no-dynamic-require */
import { collections } from '../../../constants/constants';
import { firebase, fbOps } from '../../../services/services';

const NAME = 'helprequest-get-categories';

const intent = agent => async ({
  query, session, locale
}) => {

  const { database } = firebase;
  const sessionId = session.split('/').pop();
  const { sms: {
    helpRequestConversation
  } } = require(`../../../locales/${locale.substring(0, 2)}.json`);

  const normalizedCategories = query.toLowerCase().split(/\W+/);
  const cleanedCategories = normalizedCategories.filter(c => c.length);

  const partialRequest = database.collection(collections.HELP_REQUEST_CONVERSATION).doc(sessionId);
  try {
    await fbOps.update(partialRequest, { category: cleanedCategories });
    return agent.add(helpRequestConversation.getCategoriesReply);
  } catch (e) {
    console.log(e);
    return agent.add(helpRequestConversation.getCategoriesReply);
  }
};


export default {
  name: NAME,
  intent
};
