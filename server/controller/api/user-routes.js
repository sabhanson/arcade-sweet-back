const router = require('express').Router();
const User = require('../../models').User;
const jwt = require('jsonwebtoken')
// require('dotenv').config();
// const JWT_SECRET="Arcade-Sweet";

//Signup
router.post('/signup', async (req, res) => {
   
    console.log(req.body);
    try {
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      console.log("token = "+process.env.JWT_SECRET);
      const token = jwt.sign(
        { 
          email: newUser.email, 
          username: newUser.username, 
          _id: newUser._id
        }, process.env.JWT_SECRET);
      let authorization = req.headers['Authorization']
      req.headers.authorization = 'Bearer '+token;
      console.log(req.headers.authorization);
      res
        .status(200)
        .json({
          userData : newUser, 
          token : token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    });


//Login
router.post("/login", async (req, res) => {
  try {
    res.set('Access-Control-Allow-Origin', '*');
    const userData = await User.findOne(
      { username: req.body.username },
    );

    console.log("userdata = " +userData);
    if (!userData) {
      res
        .status(400)
        .json({message: "Incorrect username or password, please try again"});
      
      return;
    }

    const validPassword = await userData.isCorrectPassword(
      req.body.password
    );

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again"});
      
      return;
    }

    const token = jwt.sign(
      { 
        email: userData.email, 
        username: userData.username, 
        _id:userData._id
      }, process.env.JWT_SECRET)
    
    res
      .status(200)
      .json({ 
        userData : userData, 
        token: token, 
        message:'you are now logged in'
      });
  }
  catch (err) {
    res.status(404).json({ message: "No user account found!" });
  }
});

//Logout
router.post('/logout', (req, res) => {
    // if (req.session.user) {
    //   req.session.destroy(() => {
    //      console.log(req.session);
    //     res.status(204).end();
    //   });
    // } else {
     
    //   res.status(404).end();
    // }
  console.log(req.header)
});



module.exports = router;