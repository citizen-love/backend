import admin from 'firebase-admin';

const serviceAccount = require('../../../admin-sdk.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://citizen-love.firebaseio.com'
});

const DB = admin.firestore();

export default DB;
