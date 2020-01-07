require('dotenv').config();

const serviceAccount = require('../serviceAccount');

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://yeet-7b4b7.firebaseio.com',
});

const db = admin.firestore();

module.exports = {admin, db};
