import admin from 'firebase-admin';

admin.initializeApp({});


const database = admin.firestore();
const incrementField = value => admin.firestore.FieldValue.increment(value);
const getLocationEntry = (location) => {
  const [lat, len] = location.split(',');
  return new admin.firestore.GeoPoint(parseFloat(lat), parseFloat(len));
};

export default {
  database, incrementField, getLocationEntry
};
