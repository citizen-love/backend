import dialogflow from 'dialogflow';
import uuid from 'uuid-random';
import { environments } from '../../constants/constants';
import { twillioService } from '../../services/services';

import { languageMatcher } from '../../utils/utils';

const { LOCAL, ENVIRONMENT } = environments;

const sessionClient = new dialogflow.SessionsClient(
  ENVIRONMENT === LOCAL
    ? { credentials: require('../../../dialogflow-sdk.json') }
    : {}
);

const sessionPath = sessionClient.sessionPath(
  'local-connected-test-dswwqo',
  uuid()
);

const integrationHandler = async ({ body }, res) => {
  const projectedLanguage = languageMatcher(body.Body);
  const dialogPayload = {
    session: sessionPath,
    queryInput: {
      text: {
        text: body.Body,
        languageCode: projectedLanguage
      }
    },
    queryParams: {
      payload: {
        fields: {
          phoneNumber: {
            stringValue: body.From
          }
        }
      }
    }
  };

  const dialogFlowResponse = await sessionClient.detectIntent(dialogPayload);
  const result = dialogFlowResponse[0].queryResult;

  if (result) {
    const reply = await twillioService.replySms(result.fulfillmentText);
    return res.send(reply);
  }
  return res.send('no match');
};

export default integrationHandler;
