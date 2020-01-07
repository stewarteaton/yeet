require('dotenv').config();

const functions = require('firebase-functions');
// const admin = require('firebase-admin');

// const serviceAccount = require('./serviceAccount');
// const cloudinary = require('cloudinary');

const bodyParser = require('body-parser');

//cloudinary is free cloud server used for hosting img, videos, and pdfs
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://yeet-7b4b7.firebaseio.com',
// });

// const db = admin.firestore();

// const firebase = require('firebase');
// var firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   databaseURL: process.env.DATABASE_URL,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGE_SENDER_ID,
//   appId: process.env.APP_ID,
// };
// firebase.initializeApp(firebaseConfig);

const express = require('express');
const app = express();
// Cors gives headers to tell applications that we can give resources to anyone that requests them
const cors = require('cors');

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
  cors(),
  bodyParser.json(),
);
// app.use(bodyParser.json());

// const {
//   validateSignupData,
//   validateLoginData,
//   reduceUserDetails,
// } = require('./utilities/validators');

// app.post('/signup', (req, res) => {
//   const newUser = {
//     userName: req.body.userName,
//     email: req.body.email,
//     password: req.body.password,
//   };

//   const {valid, errors} = validateSignupData(newUser);
//   if (!valid) return res.status(400).json(errors);

//   let token, userID;
//   db.doc(`/users/${newUser.email}`)
//     .get()
//     .then(doc => {
//       if (doc.exists) {
//         return res.status(400).json({error: 'This email is already in use'});
//       } else {
//         // res.json({confirmation: 'Success!', data: doc });
//         console.log('Success');
//         return firebase
//           .auth()
//           .createUserWithEmailAndPassword(newUser.email, newUser.password);
//       }
//     })
//     .then(data => {
//       userID = data.user.uid;
//       res.json({confirmation: 'Success!'});
//       return data.user.getIdToken();
//     })
//     .then(idToken => {
//       token = idToken;
//       const userCredentials = {
//         userName: newUser.userName,
//         password: newUser.password,
//         createdAt: new Date().toISOString(),
//         userID,
//       };
//       // returns a promise and sets user
//       return db.doc(`/users/${newUser.email}`).set(userCredentials);
//     })
//     .then(() => {
//       return res.status(201).json({token});
//     })
//     .catch(error => {
//       console.error(error.message);
//       res.status(500).json({error: 'something went wrong'});
//     });
//   return null;
// });

// app.post('/login', (req, res) => {
//   const user = {
//     email: req.body.email,
//     password: req.body.password,
//   };

//   const {valid, errors} = validateLoginData(user);
//   if (!valid) return res.status(400).json(errors);

//   firebase
//     .auth()
//     .signInWithEmailAndPassword(user.email, user.password)
//     .then(data => {
//       return res.json({confirmation: 'Success!', data: data});
//       // return data.user.getIdToken();
//     })
//     .then(token => {
//       // return res.json({token});
//       return;
//     })
//     .catch(error => {
//       console.log(error);
//       // can implement auth/wrong-password & auth/user-not-user
//       return res
//         .status(403)
//         .json({error: 'Wrong username/password, please try again'});
//     });

//   return null;
// });

const {db} = require('./utilities/admin');

const {signup, login} = require('./handlers/users');
const {cloudinaryUpload, addCloudUrl} = require('./handlers/camera');

// *** USER Login/ Signup
app.post('/signup', signup);
app.post('/login', login);

// **** Upload IMAGES ***** //
app.post('/cloudinary/:email/photo', cloudinaryUpload);
app.post('/users/:id/photo', addCloudUrl);

exports.api = functions.https.onRequest(app);
