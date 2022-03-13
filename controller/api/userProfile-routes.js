const router = require("express").Router();
const User = require("../../models").User;
const jwt = require("jsonwebtoken");


//Get all Gamer Profiles
router.get("/allProfiles", async (req, res) => {
  try {
    const user = await User.find().populate("scores");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "ERRORRRRR" });
  }
});

//Get one Gamer Profile (do it using tokens insted of id)
router.get("/Profile/:token", (req, res) => {
  try {
    jwt.verify(req.params.token, process.env.JWT_SECRET, async (err, data) => {
      if (err) {
        console.log(err);
        res.status(403).json({ msg: "Please LogIn and Re-Try", err });
      } else {
        const user = await User.findOne({ _id: data._id });
        res.json(user);
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "ERRORRRRR" });
  }
});

//Update Profile Info
router.put("/", async (req, res) => {
  const token = req.headers?.authorization;
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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
  const token = req.headers?.authorization;
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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

//Deleting Gamer Profile (do it using tokens insted of id)
router.delete("/:userId", async (req, res) => {
  const token = req.headers?.authorization;
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(403).json({ msg: "invalid credentials" });
    } else {
      return decoded;
    }
  });
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });
    res.json({ user, message: "Gamer Profile Deleted!" });
  } catch (error) {
    res.status(500).json({ message: "ERRORRRRR" });
  }
});


// router.delete("/", async (req, res) => {
//   const token = req.headers?.authorization;
//   const decodedToken = await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       console.log(err);
//       res.status(403).json({ msg: "invalid credentials" });
//     } else {
//       return decoded;
//     }
//   });
//   User.findOneAndDelete(
//     { username: decodedToken.username }
//   )
//   .then((userData) => {
//     res.json({ user, message: "Gamer Profile Deleted!" });
//   })
//   .catch((error) => {
//     res.status(500).json({ message: "ERRORRRRR" });
//   })
  
// })
module.exports = router;
