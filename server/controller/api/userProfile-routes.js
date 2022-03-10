const router = require("express").Router();
const User = require("../../models").User;
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Arcade-Sweet";

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
router.put("/", async (req, res) => {
  const token = req.headers?.authorization;
  const decodedToken = await jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(403).json({ msg: "invalid credentials" });
    } else {
      return decoded;
    }
  });
  User.findOneAndUpdate(
    { username: decodedToken.username },
    {
      username: req.body.username,
      email: req.body.email,
      file_name: req.body.file_name,
    }
  )
  .then((userData) => {
    if (!data) {
      return res.status(404)
    }
    return res.status(200).json(userData)
  })
  .catch((err) => {
    return res.status(500).json(err)
  })
  
});

//Upadting Avatar
router.put("/avatarUpdate", async (req, res) => {
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
    res.json({ user, message: "Gamer Profile Deleted!" });
  } catch (error) {
    res.status(500).json({ message: "ERRORRRRR" });
  }
});

module.exports = router;
