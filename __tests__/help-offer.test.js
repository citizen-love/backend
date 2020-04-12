import request from 'supertest';

import helpRequestPayload from './payloads/helpRequest';
import helpOfferPayload from './payloads/helpOffer';
import cleanCollection from './helpers/cleanDatabase';

import { testApp as app } from '../functions';
import { firebase, fbOps } from '../src/services/services';

jest.mock('../src/services/emailService/emailService', () => ({
  getVariables: () => '',
  templateIds: '',
  sendEmail: async () => ''
}));

jest.mock('../src/services/slack/slack', () => ({
  templates: {
    helpRequest: () => ''
  },
  send: async () => ''
}));

jest.mock('../src/services/twillio/twillio', () => ({
  sendSms: async () => '',
  replySms: async () => '',
  getVariables: () => ''
}));


describe('API >> Create Help Offer', () => {
  beforeAll(async () => {
    await cleanCollection('help-requests');
  });
  afterAll(async () => {
    await cleanCollection('help-requests');
  });
  it('On sending a help request, outcome and database object should match the desired outcome', async () => {

    const { body: helpRequestBody } = await request(app)
      .post('/help-request')
      .set('Accept', 'application/json')
      .send(helpRequestPayload.income);

    const { body: helpOfferBody } = await request(app)
      .post(`/help-offer/${helpRequestBody.id}`)
      .set('Accept', 'application/json')
      .send(helpOfferPayload.income);

    const { geoDatabase } = firebase;
    const reference = geoDatabase.collection('help-requests').doc(helpRequestBody.id);
    const { counter: helpRequestCounter } = await fbOps.get(reference);

    expect(helpRequestCounter).toBe(1);
    expect(helpOfferBody).toEqual(expect.objectContaining(helpOfferPayload.outcome));
  });
});
