const admin = require("firebase-admin");
const serviceAccount = require("../config/firebaseServiceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://indiahometuitionauth.firebaseio.com" // Replace with your Firebase DB URL if needed
});

module.exports = admin;
