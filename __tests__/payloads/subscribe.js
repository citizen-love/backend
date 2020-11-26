const income = {
  location: '1.23456,1.23456',
  email: 'test@test.com',
  radius: 30,
  language: 'en',
  preferences: ['sms'],
  phoneNumber: '+48123456789',
  uid: 'TEST-01'
};

const databaseOutcome = {
  language: 'en',
  phoneNumber: '+48123456789',
  radius: 30,
  active: true,
  preferences: ['sms'],
  email: 'test@test.com',
  coordinates: { _latitude: 1.23456, _longitude: 1.23456 },
  uid: 'TEST-01'
};

const outcome = {
  uid: 'TEST-01'
};


export default { income, outcome, databaseOutcome };
