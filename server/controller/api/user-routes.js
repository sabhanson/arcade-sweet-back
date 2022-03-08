const router = require('express').Router();
const User = require('../../models/User');
// const tokenJs = require('../utils/token');
// const auth = require('../utils/auth');

//Signup
router.post('/signup', async (req, res) => {
   
    console.log(req.body);
    try {
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
    //  const token = tokenJs.getToken({username:newUser.username, email:newUser.email})
    //  req.session.user = {id:newUser.id, username:newUser.username, email:newUser.email, token:token};
     req.session.user = {id:newUser.id, username:newUser.username, email:newUser.email};
    //  console.log("sesssion = "+req.session);
     res.json(newUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    });


//Login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne(
     { username: req.body.username },
  );
  console.log("userdata = " +userData);
  if (!userData) {
  res
  .status(400)
  .json({message: "Incorrect username or password, please try again",
  });
  return;
  }

  const validPassword = await userData.isCorrectPassword(
  req.body.password
  );

  if (!validPassword) {
    res
    .status(400)
    .json({ message: "Incorrect username or password, please try again",
          });
    return;
  }

  req.session.save(() => {
      // const token = token.getToken({username:newUser.username, email:newUser.email})
      // req.session.user = {id:newUser.id, username:newUser.username, email:newUser.email, token:token};
      req.session.user = userData.id;
     
      res.json({
          user: userData,
          message: "You are now logged in!",
          });
      });
      console.log("session"+req.session);
  }
     catch (err) {
        res.status(400).json({ message: "No user account found!" });
     }
});

//Logout
router.post('/logout', (req, res) => {
    if (req.session.user) {
      req.session.destroy(() => {
         console.log(req.session);
        res.status(204).end();
      });
    } else {
     
      res.status(404).end();
    }
  });

module.exports = router;