const income = {
  title: 'Test help request',
  description: 'Well this is the description of the body, so better if we have something here than not.',
  country: 'Country',
  community: 'City',
  location: '1.23456, 1.123456',
  email: 'test@test.com',
  category: ['shopping', 'health', 'test'],
  phone: '+48123456789',
  source: 'web',
  preferences: ['email', 'sms'],
  language: 'en'
};

const databaseOutcome = {
  language: 'en',
  description: 'Well this is the description of the body, so better if we have something here than not.',
  source: 'web',
  counter: 0,
  status: 'started',
  preferences: ['email', 'sms'],
  community: 'City',
  coordinates: { _latitude: 1.23456, _longitude: 1.123456 },
  category: ['shopping', 'health', 'test'],
  title: 'Test help request',
  country: 'Country',
  customCategory: ''
};


export default { income, databaseOutcome };
