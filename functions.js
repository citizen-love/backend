import express from 'express';
import cors from 'cors';

import { versions } from './src/constants/constants';

// http handlers

import createHelpRequest from './src/http-handlers/help-request/create';
import createHelpRequestBySms from './src/http-handlers/help-request-sms/create';
import getHelpStatus from './src/http-handlers/help-request-status/get';
import updateHelpStatus from './src/http-handlers/help-request-status/update';
import createOffer from './src/http-handlers/help-offer/create';
import subscribeWithEmail from './src/http-handlers/subscribe-notifications/subscribe';

// background functions

import notifySubscribersOnHelp from './src/background-handlers/notify-subscribers/onhelp';
import onAuthSignup from './src/background-handlers/authentication/onSignup';

import {
  HELP_REQUEST,
  HELP_REQUEST_SMS,
  HELP_REQUEST_STATUS,
  HELP_OFFER,
  SUBSCRIBE_EMAIL
} from './src/routes';

const functions = require('firebase-functions');

const app = express();

app.use(cors({ origin: true }));

app.get('/', (req, res) => res.send(versions.http));

app.post(HELP_REQUEST, createHelpRequest);
app.post(HELP_REQUEST_SMS, createHelpRequestBySms);

app.get(HELP_REQUEST_STATUS, getHelpStatus);
app.post(HELP_REQUEST_STATUS, updateHelpStatus);

app.post(HELP_OFFER, createOffer);

app.post(SUBSCRIBE_EMAIL, subscribeWithEmail);

// REST API

exports.api = functions.https.onRequest(app);

// backround functions

exports.notifySubscribersOnHelp = notifySubscribersOnHelp;
exports.onAuthSignup = onAuthSignup;
