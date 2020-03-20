import admin from 'firebase-admin';

admin.initializeApp({});


const database = admin.firestore();
const incrementField = value => admin.firestore.FieldValue.increment(value);

export default {
  database, incrementField
};
