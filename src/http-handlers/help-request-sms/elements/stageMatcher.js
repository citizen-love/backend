import { locationService } from '../../../services/services';

const getLanguageCopy = (lang) => {
  // eslint-disable-next-line import/no-dynamic-require
  const copy = require(`../../../locales/${lang}.json`);
  return copy.sms.helpRequestConversation;
};

export default {
  'get-language': (value) => {
    const allowedLanguages = ['en', 'de', 'fr', 'it'];
    const normalizedLang = value.toLowerCase().replace(/[^a-z]/g, '');

    if (!allowedLanguages.includes(normalizedLang)) {
      const { getLanguageErrorReply } = getLanguageCopy('en');
      return {
        data: { stage: 'get-language' },
        smsReply: getLanguageErrorReply
      };
    }
    const { getLanguageReply } = getLanguageCopy(normalizedLang);
    return {
      data: { language: normalizedLang, stage: 'get-title' },
      smsReply: getLanguageReply
    };
  },
  'get-title': (value, language) => {
    const { getTitleReply } = getLanguageCopy(language);
    return {
      data: { title: value, stage: 'get-description' },
      smsReply: getTitleReply
    };
  },
  'get-description': (value, language) => {
    const { getDescriptionReply } = getLanguageCopy(language);
    return {
      data: { description: value, stage: 'get-categories' },
      smsReply: getDescriptionReply
    };
  },
  'get-categories': (value, language) => {
    const { getCategoriesReply } = getLanguageCopy(language);
    const normalizedCategories = value.toLowerCase().split(/\W+/);
    const cleanedCategories = normalizedCategories.filter((c) => c.length);

    return {
      data: { category: cleanedCategories, stage: 'get-location' },
      smsReply: getCategoriesReply
    };
  },
  'get-location': async (value, language) => {
    const { getLocationReply } = getLanguageCopy(language);
    const coordinates = await locationService.searchByZIP(value, 'ch');
    return {
      data: { location: coordinates, stage: 'get-email' },
      smsReply: getLocationReply
    };
  },
  'get-email': (value, language) => {
    const { getEmailReply } = getLanguageCopy(language);
    const normalizedEmail = value.replace(' ', '').toLowerCase();
    const emailRegex = new RegExp(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    );
    return {
      data: {
        email: !emailRegex.test(normalizedEmail) ? 'INVALID' : normalizedEmail,
        stage: 'get-confirmation'
      },
      smsReply: getEmailReply
    };
  }
};
