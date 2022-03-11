const router = require('express').Router();
const {User, Review} = require('../../models');
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'Arcade-Sweet'

router.post("/", async  (req, res) => {
    const token = req.headers?.authorization?.split(" ").pop();
    console.log("token = "+token);
    const decodedToken = await jwt.verify(token, JWT_SECRET, (err , decoded) =>{
        if (err) {
            console.log(err)
            res.status(403).json({ msg: 'invalid credentials'})
        } else {
            return decoded
        }
    } );
    console.log("decodedToken = "+decodedToken);
    const user = await User.findOne({ username: decodedToken.username });
    console.log(user);
    const reviewJson = {
        review: req.body.review,
        gamevalue: req.body.gamevalue,
        username: decodedToken.username,
        imgSrc: user.file_name
    };

    Review.create(reviewJson)
    .then((data) => {;
        if (!data) {
            return res.status(404).json({ message: "user does not exist" });
        }
        return res.status(200).json(data);
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
}); 


router.post("/latest/", async (req, res) => {
  console.log("req = "+req);
  let gamevalue = req.body.gamevalue;
  try{
    const latest = await Review.find({gamevalue: gamevalue}).sort({createdAt:-1}).limit(3)
    res.json(latest);
    console.log("latest = "+JSON.stringify(latest));
  } catch(error) {
    console.log(error);
    res.status(500).json({ error });
  }
}); 

module.exports = router;