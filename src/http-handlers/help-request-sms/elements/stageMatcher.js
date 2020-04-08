import { locationService } from '../../../services/services';

const copy = require('../../../locales/de.json');

const {
  getTitleReply,
  getDescriptionReply,
  getCategoriesReply,
  getLocationReply,
  getEmailReply,
  getEmailError
} = copy.sms.helpRequestConversation;

export default {
  'get-title': (value) => ({
    data: { title: value, stage: 'get-description' },
    smsReply: getTitleReply
  }),
  'get-description': (value) => ({
    data: { description: value, stage: 'get-categories' },
    smsReply: getDescriptionReply
  }),
  'get-categories': (value) => {
    const normalizedCategories = value.toLowerCase().split(/\W+/);
    const cleanedCategories = normalizedCategories.filter((c) => c.length);

    return {
      data: { category: cleanedCategories, stage: 'get-location' },
      smsReply: getCategoriesReply
    };
  },
  'get-location': async (value) => {
    const coordinates = await locationService.searchByZIP(value, 'ch');
    return {
      data: { location: coordinates, stage: 'get-email' },
      smsReply: getLocationReply
    };
  },
  'get-email': (value) => {
    const emailRegex = new RegExp(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    );

    if (!emailRegex.test(value)) {
      return {
        data: { email: 'invalid', stage: 'get-email' },
        smsReply: getEmailError
      };
    }
    return { data: { email: value, stage: 'get-confirmation' }, smsReply: getEmailReply };
  }
};
