// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions')

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.users = functions.https.onRequest((req, res) => {
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000)
    .then(listUsersResult => res.status(200).send(listUsersResult.users))
    .catch(error => res.status(400).send(JSON.stringify('Error listing users')))
})
