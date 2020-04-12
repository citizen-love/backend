
const PHONE_NUMBER = '+48798984651';

const income = {
  step1: {
    Body: 'Hey',
    From: PHONE_NUMBER
  },
  step2: {
    Body: 'en',
    From: PHONE_NUMBER
  },
  step3: {
    Body: 'Test help needed',
    From: PHONE_NUMBER
  },
  step4: {
    Body: 'I need to test this API in detailed',
    From: PHONE_NUMBER
  },
  step5: {
    Body: 'category1, category2, category3',
    From: PHONE_NUMBER
  },
  step6: {
    Body: '8001',
    From: PHONE_NUMBER
  },
  step7: {
    Body: 'test@test.com',
    From: PHONE_NUMBER
  },
  step8: {
    Body: 'yes',
    From: PHONE_NUMBER
  }
};

const outcome = {
  step1: {
    stage: 'get-language'
  },
  step2: {
    stage: 'get-title'
  },
  step3: {
    stage: 'get-description'
  },
  step4: {
    stage: 'get-categories'
  },
  step5: {
    stage: 'get-location'
  },
  step6: {
    stage: 'get-email'
  },
  step7: {
    stage: 'get-confirmation'
  }
};


export default { income, outcome, PHONE_NUMBER };
