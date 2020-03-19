import admin from 'firebase-admin';

admin.initializeApp({});

const DB = admin.firestore();

export default DB;
