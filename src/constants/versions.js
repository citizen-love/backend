import env from './environments';

export default {
  http: {
    version: '1.2',
    mode: env.ENVIRONMENT,
    type: 'HTTP'
  }
};
