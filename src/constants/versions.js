import env from './environments';

export default {
  http: {
    version: '1.1',
    mode: env.ENVIRONMENT,
    type: 'HTTP'
  },
  dialogflow: {
    version: '0.1',
    mode: env.ENVIRONMENT,
    type: 'DIALOGFLOW_WEBHOOK'
  }
};
