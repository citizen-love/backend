import environments from './environments';

const {
  LOCAL,
  DEVELOPMENT,
  PRODUCTION,
  ENVIRONMENT
} = environments;

const ROOT_URL = {
  [LOCAL]: 'https://citizen-love-dev.web.app',
  [DEVELOPMENT]: 'https://citizen-love-dev.web.app',
  [PRODUCTION]: 'https://citizen.love'
};

const helpRequest = (helpRequestId, action) => `${ROOT_URL[ENVIRONMENT]}/${action}/${helpRequestId}`;


export default {
  getUniqueURL: helpRequest
};
