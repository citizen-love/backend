import request from 'supertest';

import payload from './payloads/subscribe';
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
    watchlistSignup: () => ''
  },
  send: async () => ''
}));


describe('API >> Subscribe to the watchlist', () => {
  beforeAll(async () => {
    await cleanCollection('helpgivers-contacts');
  });
  afterAll(async () => {
    await cleanCollection('helpgivers-contacts');
  });
  it('On watchlist subscribe, outcome and database object should match the desired outcome', async () => {

    const { body } = await request(app)
      .post('/subscribe')
      .set('Accept', 'application/json')
      .send(payload.income);

    const { geoDatabase } = firebase;
    const reference = geoDatabase.collection('helpgivers-contacts').doc(payload.income.uid);
    const documentOutcome = await fbOps.get(reference);

    expect(body).toEqual(expect.objectContaining(payload.outcome));
    expect(documentOutcome).toEqual(expect.objectContaining(payload.databaseOutcome));

  });
});
