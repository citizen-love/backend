const sendSmsFilter = (document) => {
  if (!document.preferences.includes('SMS')) {
    return null;
  }

  if (!document.active) {
    return null;
  }

  const SWISS_PREFIX = new RegExp(/^\+41/);
  if (!SWISS_PREFIX.test(document.phoneNumber)) {
    return null;
  }
  return document;
};

const sendEmailFilter = (document) => {
  if (!document.preferences.includes('EMAIL')) {
    return null;
  }

  if (!document.active) {
    return null;
  }

  return document;
};

export default {
  sendSmsFilter,
  sendEmailFilter
};
