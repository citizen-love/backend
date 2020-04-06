import axios from 'axios';
import helpRequest from './templates/helpRequest';
import watchlistSignup from './templates/watchlistSignup';

import { environments } from '../../constants/constants';

const { PRODUCTION, LOCAL, DEVELOPMENT, ENVIRONMENT } = environments;

const ROOT_URL = {
  [DEVELOPMENT]: process.env.SLACK_URL_STAGING,
  [LOCAL]: process.env.SLACK_URL_STAGING,
  [PRODUCTION]: process.env.SLACK_URL_PRODUCTION
};

const slackRequest = async (messageBody) => {
  try {
    await axios({
      method: 'POST',
      url: ROOT_URL[ENVIRONMENT],
      data: JSON.stringify(messageBody)
    });
  } catch (e) {
    console.log(e);
  }
};

export default {
  send: slackRequest,
  templates: {
    helpRequest, watchlistSignup
  }
};
