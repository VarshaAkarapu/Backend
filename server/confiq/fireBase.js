const admin = require("firebase-admin");

const firebaseConfigBase64 = process.env.FIREBASE_CONFIG_BASE64;

if (!firebaseConfigBase64) {
  throw new Error("FIREBASE_CONFIG_BASE64 environment variable is missing");
}

const serviceAccount = JSON.parse(
  Buffer.from(firebaseConfigBase64, "base64").toString("utf8")
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
