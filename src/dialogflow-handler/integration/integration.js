import dialogflow from 'dialogflow';
import uuid from 'uuid-random';

import { twillioService } from '../../services/services';


const integrationHandler = async ({ body, ...rest }, res) => {

  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath('local-connected-test-dswwqo', uuid());

  const dialogPayload = {
    session: sessionPath,
    queryInput: {
      text: {
        text: body.Body,
        languageCode: 'en-US' // de-CH
      }
    }
  };
  console.log('<<< PAYLOAD >>>', dialogPayload);
  const dialogFlowResponse = await sessionClient.detectIntent(dialogPayload);
  console.log('<<< RESPONSE >>>', dialogFlowResponse);

  const result = dialogFlowResponse[0].queryResult;

  if (result) {
    const reply = await twillioService.replySms(dialogFlowResponse);
    return res.send(reply);
  }
  return res.send('no match');
};


export default integrationHandler;
