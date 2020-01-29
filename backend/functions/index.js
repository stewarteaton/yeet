require('dotenv').config();

const functions = require('firebase-functions');

const bodyParser = require('body-parser');

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

const FBAuth = require('./utilities/fbAuth');

const {db} = require('./utilities/admin');

const {getAllPosts, postOnePost} = require('./handlers/posts');
const {signup, login, getAuthenticatedUser} = require('./handlers/users');
const {cloudinaryUpload, addCloudUrl} = require('./handlers/camera');

// FBAuth middleware for protected routes, 
// GET and POST shouts
app.get('/posts', getAllPosts);
app.post('/post', FBAuth, postOnePost);

// *** USER Login/ Signup
app.post('/signup', signup);
app.post('/login', login);
app.get('/user', FBAuth, getAuthenticatedUser);

// **** Upload IMAGES ***** //
app.post('/cloudinary/:email/photo', cloudinaryUpload);
app.post('/users/:id/photo', addCloudUrl);

exports.api = functions.https.onRequest(app);
