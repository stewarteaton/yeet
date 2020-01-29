const {db, admin} = require('../utilities/admin');

exports.getAllPosts = (req, res) => {
//   console.log('GET ALL POSTS FIRED');
  db.collection('posts')
    .orderBy('createdAt', 'desc') //lists posts in most recent order
    .get()
    .then(data => {
      let posts = [];
      data.forEach(doc => {
        posts.push({
          postID: doc.id,
          body: doc.data().body,
          bodyImage: doc.data().bodyImage,
          userName: doc.data().userName,
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
          userImage: doc.data().userImage,
        });
      });
      console.dir(posts);
      return res.json(posts);
    })
    .catch(error => console.error(error));
};

exports.postOnePost = (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({body: 'Body must not be empty'});
  }

  const newShout = {
    body: req.body.body,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
    createdAt: new Date().toISOString(),
    // just been created
    likeCount: 0,
    commentCount: 0,
  };

  db.collection('shouts')
    .add(newShout)
    .then(doc => {
      const resShout = newShout;
      // you can edit a key in a const, but cannot change data type
      resShout.shoutID = doc.id;
      // check return
      return res.json(resShout);
    })
    .catch(error => {
      res.status(500).json({error: 'something went wrong'});
      console.error(error);
    });
};
