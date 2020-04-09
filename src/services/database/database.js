import admin from 'firebase-admin';
import { GeoFirestore } from 'geofirestore';
import { environments } from '../../constants/constants';


const { LOCAL, ENVIRONMENT } = environments;

admin.initializeApp(LOCAL === ENVIRONMENT ? {
  credential: admin.credential.cert(require('../../../admin-sdk.json')),
  databaseURL: 'https://citizen-love.firebaseio.com'
} : {});

// admin.initializeApp({});

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
