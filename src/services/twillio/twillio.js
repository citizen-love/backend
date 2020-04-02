import TwilioClient from 'twilio';


const SWISS_PREFIX = new RegExp(/^\+41/);
const SWISS_DEFAULT_NUMBER = '';

const getVariables = (countryCode, templateID) => {
  // eslint-disable-next-line import/no-dynamic-require
  const locale = require(`../../locales/${countryCode}.json`);
  return locale.sms[templateID];
};

const sendSms = async (phoneNumber, text) => {
  if (!SWISS_PREFIX.test(phoneNumber)) {
    return null;
  }
  const client = TwilioClient('', '');

  try {
    await client.messages.create({
      body: text,
      from: SWISS_DEFAULT_NUMBER,
      to: phoneNumber
    });
  } catch (e) {
    console.log(e);
  }
};

export default {
  sendSms, getVariables
};
