import request from 'supertest';

import payload from './payloads/helpRequestSms';
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


describe('API >> Submitting help request via SMS', () => {
  beforeAll(async () => {
    await cleanCollection('help-requests-unfinished-conversations');
  });
  afterAll(async () => {
    await cleanCollection('help-requests-unfinished-conversations');
  });
  it('Interacting with SMS should keep saving the proper items in the database', async () => {

    const { database } = firebase;

    await request(app)
      .post('/help-request-sms')
      .set('Accept', 'application/json')
      .send(payload.income.step1);
    const reference = database.collection('help-requests-unfinished-conversations').doc(payload.PHONE_NUMBER);
    const step1Outcome = await fbOps.get(reference);

    await new Promise(resolve => setTimeout(resolve, 1000));

    await request(app)
      .post('/help-request-sms')
      .set('Accept', 'application/json')
      .send(payload.income.step2);
    const step2Outcome = await fbOps.get(reference);

    await new Promise(resolve => setTimeout(resolve, 1000));

    await request(app)
      .post('/help-request-sms')
      .set('Accept', 'application/json')
      .send(payload.income.step3);
    const step3Outcome = await fbOps.get(reference);

    await new Promise(resolve => setTimeout(resolve, 1000));

    await request(app)
      .post('/help-request-sms')
      .set('Accept', 'application/json')
      .send(payload.income.step4);
    const step4Outcome = await fbOps.get(reference);

    await new Promise(resolve => setTimeout(resolve, 1000));

    await request(app)
      .post('/help-request-sms')
      .set('Accept', 'application/json')
      .send(payload.income.step5);
    const step5Outcome = await fbOps.get(reference);

    await new Promise(resolve => setTimeout(resolve, 1000));

    await request(app)
      .post('/help-request-sms')
      .set('Accept', 'application/json')
      .send(payload.income.step6);
    const step6Outcome = await fbOps.get(reference);

    await new Promise(resolve => setTimeout(resolve, 1000));

    await request(app)
      .post('/help-request-sms')
      .set('Accept', 'application/json')
      .send(payload.income.step7);
    const step7Outcome = await fbOps.get(reference);

    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(step1Outcome.stage).toEqual(payload.outcome.step1.stage);
    expect(step2Outcome.stage).toEqual(payload.outcome.step2.stage);
    expect(step3Outcome.stage).toEqual(payload.outcome.step3.stage);
    expect(step4Outcome.stage).toEqual(payload.outcome.step4.stage);
    expect(step5Outcome.stage).toEqual(payload.outcome.step5.stage);
    expect(step6Outcome.stage).toEqual(payload.outcome.step6.stage);
    expect(step7Outcome.stage).toEqual(payload.outcome.step7.stage);

  });
});
