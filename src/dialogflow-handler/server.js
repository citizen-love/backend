
import express from 'express';
import WebhookClient from 'dialogflow-fulfillment';

import { versions } from '../constants/constants';

const app = express();

app.get('/', (req, res) => res.send(versions.dialogflow));

app.post('/dialogflow', express.json(), (req, res) => {
  console.log('request hits the server');
  console.log(req);
  const agent = new WebhookClient({ request: req, response: res });

  function welcome() {
    agent.add('Welcome to my agent!');
  }

  const intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
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
