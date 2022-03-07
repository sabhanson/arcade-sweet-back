const router = require('express').Router();
const User = require('../../models/User');
const token = require('../utils/token');
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
     const token = token.getToken({username:newUser.username, email:newUser.email})
     req.session.user = {id:newUser.id, username:newUser.username, email:newUser.email, token:token};
      res.json(newUser);
    }
        catch (err) {
            res.status(500).json(err);
          
        }
    });


//Login
          router.post("/login", async (req, res) => {
            try {
              const userData = await User.findOne({
                where: { username: req.body.username },
              });

              if (!userData) {
                res
                  .status(400)
                  .json({
                    message: "Incorrect username or password, please try again",
                  });
                return;
              }

              const validPassword = await userData.checkPassword(
                req.body.password
              );

              if (!validPassword) {
                res
                  .status(400)
                  .json({
                    message: "Incorrect email or password, please try again",
                  });
                return;
              }

              const isValid = await userData.checkIsValid();
              if (!isValid) {
                console.log("IsValid = " + isValid);
                res.status(400).json({ message: "Please verify your email" });
                return;
              } else {
                const token = token.getToken({username:newUser.username, email:newUser.email})
                req.session.user = {id:newUser.id, username:newUser.username, email:newUser.email, token:token};
                  res.json({
                    user: userData,
                    message: "You are now logged in!",
                  });
                };
              }
             catch (err) {
              res.status(400).json({ message: "No user account found!" });
            }
          });

//Logout
router.post('/logout', (req, res) => {
    if (req.session.user) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      console.log(req.session);
      res.status(404).end();
    }
  });

module.exports = router;