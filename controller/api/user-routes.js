const router = require('express').Router();
const {User, Score} = require('../../models');
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

router.post("/score/", async (req, res) => {
  const token = req.headers?.authorization?.split(" ").pop();
  if(token) {
    console.log("token = "+JSON.stringify(token));
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET, (err , decoded) =>{
      if (err) {
        console.log(err)
        res.status(403).json({ msg: 'invalid credentials'})
      } else {
        return decoded
      }
    } );
    console.log("decodedToken = "+decodedToken);
    let gamevalue = req.body.gamevalue;
    let score = {};
    try{
      if(gamevalue == 1) {
        score = await Score.find({gamevalue: gamevalue, username:decodedToken.username})
                           .sort({score:1})
                           .limit(1);
      } else if(gamevalue == 2) {
        score = await Score.find({gamevalue: gamevalue, username:decodedToken.username})
                           .sort({score:1});
      }
      res.json(score);
      console.log("tops = "+JSON.stringify(score));
    } catch(error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}); 



module.exports = router;