const router = require('express').Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken')

//Signup
router.post('/signup', async (req, res) => {
   
    console.log(req.body);
    try {
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      const token = jwt.sign({ email: newUser.email, username: newUser.username, _id:newUser._id}, 'Arcade-Sweet')
      res.status(200).json({newUser, token})
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

  const token = jwt.sign({ email: userData.email, username: userData.username, _id:userData._id}, 'Arcade-Sweet')
  res.status(200).json({ userData, token, message:'you are now logged in'})
  }
     catch (err) {
        res.status(404).json({ message: "No user account found!" });
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