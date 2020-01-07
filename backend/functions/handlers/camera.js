const cloudinary = require('../utilities/cloudinary');
const {db, admin} = require('../utilities/admin');

// For camera
// Upload to Cloudinary
exports.cloudinaryUpload = (req, res) => {
  console.log('\nEmail ' + req.params.email);
  // Add file to cloudinary
  cloudinary.v2.uploader
    .upload(req.body.uri.substr(5), {
      folder: `users/${req.params.email}`,
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
};

// ADD user's cloudinary photo URL to Firebase
exports.addCloudUrl = (req, res) => {
  console.log(req.body.url);
  // Add cloud URL to user's Firebase
  const newImg = {
    url: req.body.url,
    userID: req.params.id,
    createdAt: new Date().toISOString(),
  };
  console.dir(newImg);
  db.collection('profilePictures')
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
};
