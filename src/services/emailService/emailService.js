import axios from 'axios';

const ROOT_URL = 'https://api.sendgrid.com/v3/mail/send';
const CITIZEN_SENDER = 'share@citizen.love';

const templateIds = {
  confirmation: 'd-a2181be0bca343ac948f1b410e380cb2',
  helpNotification: 'd-fc60c46f39ed43aaaaf4a7bd716f0e87',
  emailSubscriptionConfirmation: 'd-cb4ed1348ea94e27a105a661875884ac',
  notifySubscribersOnHelp: 'd-4d135f68db824cd09aca40391d12ce7f'
};


const getVariables = (countryCode, templateID) => {
  // eslint-disable-next-line import/no-dynamic-require
  const locale = require(`../../locales/${countryCode}.json`);
  return locale[templateID];
};

const sendEmail = async ({ receiver, templateId }, variables = {}) => {
  const emailData = {
    from: { email: CITIZEN_SENDER },
    personalizations: [{
      to: [{ email: receiver }],
      dynamic_template_data: variables
    }],
    template_id: templateId
  };
  try {
    await axios({
      method: 'POST',
      url: ROOT_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SENDGRID_KEY}`
      },
      data: JSON.stringify(emailData)
    });
  } catch (e) {
    console.log(e);
  }
};

export default {
  getVariables, sendEmail, templateIds
};
