const functions = require('firebase-functions');
const admin = require('firebase-admin');

const uuidv5 = require('uuid/v5');
const uuid = require('uuid/v1');


require('cors')({ origin: true})

admin.initializeApp();

const NAME_SPACE = uuid()

exports.addNewUser = functions.https.onRequest(async (req, res) => {
  const newUser = req.body;
  const userTable = admin.database().ref('/users');

  const snapshot = await userTable.push(newUser)
  return res.send(200, snapshot)
})

exports.getUsers = functions.https.onRequest(async (req, res) => {
  const userTable = admin.database().ref('/users');

  const snapshot = await userTable.once('value');
  const users = snapshot.val();

  return res.send(200, users);
})

exports.generateUserId = functions.database.ref('/users/{pushId}').onCreate((snapshot, context) => {
  const id = uuidv5("enye", NAME_SPACE);
  return snapshot.ref.update({id})
})  