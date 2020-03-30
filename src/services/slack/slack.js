import axios from 'axios';
import helpRequest from './templates/helpRequest';
import watchlistSignup from './templates/watchlistSignup';

const ROOT_URL = process.env.SLACK_URL;

const slackRequest = async (messageBody) => {
  try {
    await axios({
      method: 'POST',
      url: ROOT_URL,
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
