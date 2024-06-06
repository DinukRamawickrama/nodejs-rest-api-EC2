const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json'); // Adjust the path as necessary

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nodejs-rest-api-ec2.firebaseio.com" // Replace with your Firebase database URL
});

const db = admin.firestore();

module.exports = db;
