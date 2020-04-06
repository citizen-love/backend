import TwilioClient from 'twilio';

const SWISS_DEFAULT_NUMBER = '+41798070883';

const getVariables = (countryCode, templateID) => {
  // eslint-disable-next-line import/no-dynamic-require
  const locale = require(`../../locales/${countryCode}.json`);
  return locale.sms[templateID];
};

const sendSms = async (phoneNumber, text) => {
  const client = TwilioClient(process.env.TWILIO_KEY, process.env.TWILIO_SECRET);
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
