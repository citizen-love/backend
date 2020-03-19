import express from 'express';
import cors from 'cors';

import createRequesterContact from './src/handlers/requester-contact/create';
import getHelpStatus from './src/handlers/help-request-status/get';
import updateHelpStatus from './src/handlers/help-request-status/update';
import createOffer from './src/handlers/help-offer/create';

import {
  REQUESTER_CONTACT,
  HELP_STATUS,
  HELP_OFFER
} from './src/routes';

const functions = require('firebase-functions');

const app = express();

app.use(cors({ origin: true }));


app.post(REQUESTER_CONTACT, createRequesterContact);

app.get(HELP_STATUS, getHelpStatus);
app.post(HELP_STATUS, updateHelpStatus);

app.post(HELP_OFFER, createOffer);


exports.api = functions.https.onRequest(app);
