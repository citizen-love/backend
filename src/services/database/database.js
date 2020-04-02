import admin from 'firebase-admin';
import { GeoFirestore } from 'geofirestore';


/* if (process.env.NODE_ENV === 'local') {
const serviceAccount = require('../../../admin-sdk.json');

console.log('FUNCTIONS INITIALIZED LOCALLY');

adminInformation = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://citizen-love.firebaseio.com'
};
// } */

admin.initializeApp({});

const database = admin.firestore();
const geoDatabase = new GeoFirestore(database);
const incrementField = value => admin.firestore.FieldValue.increment(value);
const getLocationEntry = (location) => {
  const [lat, len] = location.split(',');
  return new admin.firestore.GeoPoint(parseFloat(lat), parseFloat(len));
};

export default {
  database,
  geoDatabase,
  incrementField,
  getLocationEntry
};
