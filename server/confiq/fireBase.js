const admin = require("firebase-admin");
const serviceAccount = require(process.env.firebase); // Adjust the path as needed

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
module.exports = admin;
