
import express from 'express';
import { urlencoded } from 'body-parser';

import integration from './integration/integration';

import createHelpRequest from './intents/createHelpRequest/createHelpRequest';
import { versions } from '../constants/constants';

const { WebhookClient } = require('dialogflow-fulfillment');

const app = express();
app.use(urlencoded({ extended: false }));

app.post('/integration', integration);

app.post('/dialogflow', (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  const intentMap = new Map();
  intentMap.set(createHelpRequest.getTitle.name, createHelpRequest.getTitle.intent(agent));
  intentMap.set(createHelpRequest.getDescription.name, createHelpRequest.getDescription.intent(agent));
  intentMap.set(createHelpRequest.getCategories.name, createHelpRequest.getCategories.intent(agent));
  intentMap.set(createHelpRequest.getLocation.name, createHelpRequest.getLocation.intent(agent));
  intentMap.set(createHelpRequest.getEmail.name, createHelpRequest.getEmail.intent(agent));
  intentMap.set(createHelpRequest.confirmHelpRequest.name, createHelpRequest.confirmHelpRequest.intent(agent));

  agent.handleRequest(intentMap);
});

app.listen(8081, () => {
  console.log(`
  🐵🐵🐵 Dialogflow Handler is running.
   Environment: ${process.env.APPLIED_ENV}
   Port: 8081
  `);
});

export default app;
