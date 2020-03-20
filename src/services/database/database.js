import admin from 'firebase-admin';

const serviceAccount = require('../../../admin-sdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://citizen-love.firebaseio.com'
});

const database = admin.firestore();
const incrementField = value => admin.firestore.FieldValue.increment(value);

export default {
  database, incrementField
};
