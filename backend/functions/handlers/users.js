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
  console.log('****');
  console.log(req.body.email);
  // destructuring
  const {valid, errors} = validateLoginData(user);
  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({token});
    })
    .catch(error => {
      console.log(error);
      // can implement auth/wrong-password & auth/user-not-user
      return res
        .status(403)
        .json({general: 'Wrong username/password, please try again'});
    });
};
// exports.login = (req, res) => {
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
//       // return data;
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
// };

// ********* GET OWN USER DETAILS *********  //
exports.getAuthenticatedUser = (req, res) => {
  let userData = {};
  console.log('REQUEST GET OWN DETAILS');
  console.log(req.user);
  // return res.json({confirmation: 'Success!', data: req.user});

  db.doc(`/users/${req.user.email}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        userData.information = doc.data();
      }
      return db.collection('profilePictures').where('userID', '==', req.user.uid).get();
    })
    .then(data => {
      userData.information.profilePictures = [];
      // Check if user has any photos, if not, then supply empty cover pic
      if (data) {
        data.forEach(doc => {
          userData.information.profilePictures.push(doc.data());
        });
        // empty index to fill 6 spots
        const emptyPic = {
          url: '',
          userID: '',
          order: '',
          createdAt: '',
        };

        // If user has < 6 profilePics, loop through to add empty indexes for UI
        while (userData.information.profilePictures.length < 6) {
          emptyPic.url = `${userData.information.profilePictures.length}`;
          userData.information.profilePictures.push(emptyPic);
        }
      } else {
        userData.information.profilePictures.push({url: 'https://res.cloudinary.com/yeetsoftware/image/upload/v1578779734/no-img_csiqbs.png'})
      }

      return res.json({confirmation: 'Success!', data: userData});
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({error: err.code});
    });
};
