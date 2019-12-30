require('dotenv').config();

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccount');
const cloudinary = require('cloudinary');

const bodyParser = require('body-parser');

//cloudinary is free cloud server used for hosting img, videos, and pdfs
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://yeet-7b4b7.firebaseio.com',
});

const db = admin.firestore();

const firebase = require('firebase');
var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.APP_ID,
};
firebase.initializeApp(firebaseConfig);

const express = require('express');
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails,
} = require('./validators');

app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
  };

  const {valid, errors} = validateSignupData(newUser);
  if (!valid) return res.status(400).json(errors);

  let token, userID;
  db.doc(`/users/${newUser.email}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({error: 'This email is already in use'});
      } else {
        // res.json({confirmation: 'Success!', data: doc });
        // res.json({confirmation: 'Success!', });
        // console.log(newUser.email + ' ' + newUser.password);
        console.log('Success');
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userID = data.user.uid;
      res.json({confirmation: 'Success!'});
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        password: newUser.password,
        createdAt: new Date().toISOString(),
        userID,
      };
      // returns a promise and sets user
      return db.doc(`/users/${newUser.email}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({token});
    })
    .catch(error => {
      console.error(error.message);
      res.status(500).json({error: 'something went wrong'});
    });
  return null;
});

app.post('/login', (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const {valid, errors} = validateLoginData(user);
  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return res.json({confirmation: 'Success!', data: data});
      // return data.user.getIdToken();
    })
    .then(token => {
      // return res.json({token});
      return;
    })
    .catch(error => {
      console.log(error);
      // can implement auth/wrong-password & auth/user-not-user
      return res
        .status(403)
        .json({error: 'Wrong username/password, please try again'});
    });

  return null;
});

// For camera
// Upload to Cloudinary
app.post('/cloudinary/:id/photo', (req, res) => {
  console.log('\nUID ' + req.params.id);
  // Add file to cloudinary
  cloudinary.v2.uploader
    .upload(req.body.uri.substr(5), {
      folder: req.params.id,
      use_filename: true,
      unique_filename: false,
    })
    .then(result => {
      // Gets url for new pdf uploaded and stores the address with document in database
      console.log('Successfully Pushed to Cloudinary!');
      console.log(result.url);
      req.body.cdnURL = result.url;
      console.log(req.body.cdnURL);
      //to move on to next piece of middleware
      return res.json(result);
      // return result;
    })
    .catch(() => {
      console.log('Error pushing to cloudinary');
    });
});

// ADD user's cloudinary photo URL to Firebase
app.post('/users/:id/photo', (req, res) => {
  console.log(req.body.url);
  // Add cloud URL to user's Firebase
  const newImg = {
    url: req.body.url,
    userID: req.params.id,
    createdAt: new Date().toISOString(),
  };
  console.dir(newImg);
  db.collection('pictures')
    .add(newImg)
    .then(doc => {
      const resPost = newImg;
      // you can edit a key in a const, but cannot change data type
      resPost.picID = doc.id;
      return res.json(resPost);
    })
    .catch(error => {
      res.status(500).json({error: 'something went wrong'});
      console.error(error);
    });
});

exports.api = functions.https.onRequest(app);
