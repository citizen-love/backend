import express from 'express';
import cors from 'cors';

import createHelpRequest from './src/handlers/help-request/create';
import getHelpStatus from './src/handlers/help-request-status/get';
import updateHelpStatus from './src/handlers/help-request-status/update';
import createOffer from './src/handlers/help-offer/create';

import {
  HELP_REQUEST,
  HELP_REQUEST_STATUS,
  HELP_OFFER
} from './src/routes';

const functions = require('firebase-functions');

const app = express();

app.use(cors({ origin: true }));


app.post(HELP_REQUEST, createHelpRequest);

app.get(HELP_REQUEST_STATUS, getHelpStatus);
app.post(HELP_REQUEST_STATUS, updateHelpStatus);

app.post(HELP_OFFER, createOffer);


exports.api = functions.https.onRequest(app);
