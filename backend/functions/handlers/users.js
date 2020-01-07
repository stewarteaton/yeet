const {db, admin} = require('../utilities/admin');

const firebaseConfig = require('../utilities/firebaseConfig');

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails,
} = require('../utilities/validators');

// ******* SIGN UP ******** --------- //
exports.signup = (req, res) => {
  const newUser = {
    userName: req.body.userName,
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
        userName: newUser.userName,
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
};

// ********* LOG IN *********  //
exports.login = (req, res) => {
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
};
