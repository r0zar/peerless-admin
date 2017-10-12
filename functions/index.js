// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions')
const cors = require('cors')({origin: true});
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.users = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    switch (req.method) {
      case 'GET':
        if (req.query.id) {
          admin.auth().getUser(req.query.id)
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error))
        } else {
          // List batch of users, 1000 at a time.
          admin.auth().listUsers(1000)
            .then(listUsersResult => res.status(200).send(listUsersResult.users))
            .catch(error => res.status(400).send(error))
        }
        break;
      case 'PUT':
        admin.auth().updateUser(req.query.id, req.body)
          .then(user => res.status(201).send(user))
          .catch(error => res.status(400).send(error))
        break;
      case 'POST':
        admin.auth().createUser(req.body)
          .then(user => res.status(201).send(user))
          .catch(error => res.status(400).send(error))
        break;
      case 'DELETE':
        admin.auth().deleteUser(req.query.id)
          .then(resp => res.status(200).send(resp))
          .catch(error => res.status(400).send(error))
        break;
      default:
        res.status(500).send({ error: 'Unsupported request method.' });
        break;
    }
  })
})
