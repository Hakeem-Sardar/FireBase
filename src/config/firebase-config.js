
const serviceAccount = require("./serverAccount.json")
const firebase = require("firebase/app")
require("firebase/firestore")
const admin = require("firebase-admin");

// Initialize Firebase
 admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db =admin.firestore();
const User = db.collection("Users");
module.exports=User