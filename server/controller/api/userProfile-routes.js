const router = require("express").Router();
const User = require("../../models").User;
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Arcade-Sweet';


//Get all Gamer Profiles
router.get("/allProfiles", async (req, res) => {
  try {
    const user = await User.find().populate("scores");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "ERRORRRRR" });
  }
});

//Get one Gamer Profile
router.get("/Profile/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "ERRORRRRR" });
  }
});

//Update Profile Info
router.put("/:userId", (req, res) => {
  try {
    const token = req.headers.authorization.split(' ').pop()
    console.log(token)
    jwt.verify(token, JWT_SECRET, async (err, data)=> {
      // console.log("data = "+JSON.stringify(data));
      if (err) {
        console.log(err);
        res.status(403).json({ msg: "invalid credentials", err });
      } else {
        // console.log("req = "+JSON.stringify(req.body));
        const userData = await User.findOneAndUpdate(
          { 
            username: data.username 
          },
          req.body,
          {
            runValidators: true,
            new: true,
          }
        )
        // console.log("userData : "+JSON.stringify(userData));
        res
          .status(200)
          .json({
            userData: userData
          });
        return; 
      }
    })
  } catch (error) {
    console.log("error = "+error);
    res.status(500).json({ message: "ERRORRRRR" });
  }
});

//Upadting Avatar
router.put("/avatarUpdate/:userId", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body.file_name,
      {
        new: true,
      }
    );
    res.json(user);
    console.log(user);
    // { username: req.body.username, email:req.body.email, password: req.body.password},
  } catch (error) {
    res.status(500).json({ message: "ERRORRRRR" });
  }
});

//Deleting Gamer Profile
router.delete("/:userId", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });
    res.json({ message: "Gamer Profile Deleted!" });
  } catch (error) {
    res.status(500).json({ message: "ERRORRRRR" });
  }
});

module.exports = router;
