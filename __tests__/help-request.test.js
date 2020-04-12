import request from 'supertest';

import payload from './payloads/helpRequest';
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


describe('API >> Submitting help request', () => {
  beforeAll(async () => {
    await cleanCollection('help-requests');
  });
  afterAll(async () => {
    await cleanCollection('help-requests');
  });
  it('On sending a help request, outcome and database object should match the desired outcome', async () => {

    const { body } = await request(app)
      .post('/help-request')
      .set('Accept', 'application/json')
      .send(payload.income);

    const { geoDatabase } = firebase;
    const reference = geoDatabase.collection('help-requests').doc(body.id);
    const documentOutcome = await fbOps.get(reference);

    expect(body.id).toBeDefined();
    expect(documentOutcome).toEqual(expect.objectContaining(payload.databaseOutcome));
  });
});
