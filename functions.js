import express from 'express';
import cors from 'cors';

import createContactInformation from './src/handlers/contactInformation/create';
import getHelpStatus from './src/handlers/helpStatus/get';
import updateHelpStatus from './src/handlers/helpStatus/update';
import createOffer from './src/handlers/offer/create';

import {
  CONTACT_INFORMATION,
  STATUS_SINGLE,
  OFFER
} from './src/routes';

const functions = require('firebase-functions');

const app = express();

app.use(cors({ origin: true }));


app.post(CONTACT_INFORMATION, createContactInformation);
app.get(STATUS_SINGLE, getHelpStatus);
app.post(STATUS_SINGLE, updateHelpStatus);
app.post(OFFER, createOffer);


exports.api = functions.https.onRequest(app);
