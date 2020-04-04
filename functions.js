import express from 'express';
import cors from 'cors';

import { versions } from './src/constants/constants';

// http handlers

import createHelpRequest from './src/http-handlers/help-request/create';
import getHelpStatus from './src/http-handlers/help-request-status/get';
import updateHelpStatus from './src/http-handlers/help-request-status/update';
import createOffer from './src/http-handlers/help-offer/create';
import subscribeWithEmail from './src/http-handlers/subscribe-notifications/subscribe';

// background functions

import notifySubscribersOnHelp from './src/background-handlers/notify-subscribers/onhelp';

// dialogflow handler

import dialogFlowApp from './src/dialogflow-handler/server';

import {
  HELP_REQUEST,
  HELP_REQUEST_STATUS,
  HELP_OFFER,
  SUBSCRIBE_EMAIL
} from './src/routes';

const functions = require('firebase-functions');

const app = express();

app.use(cors({ origin: true }));

app.get('/', (req, res) => res.send(versions.http));

app.post(HELP_REQUEST, createHelpRequest);

app.get(HELP_REQUEST_STATUS, getHelpStatus);
app.post(HELP_REQUEST_STATUS, updateHelpStatus);

app.post(HELP_OFFER, createOffer);

app.post(SUBSCRIBE_EMAIL, subscribeWithEmail);


app.listen(8082, () => {
  console.log(`
  🐵🐵🐵 HTTP handler is running.
   Environment: ${process.env.APPLIED_ENV}
   Port: 8082
  `);
});

// REST API

exports.api = functions.https.onRequest(app);

// backround functions

exports.notifySubscribersOnHelp = notifySubscribersOnHelp;

// dialogflow

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(dialogFlowApp);
