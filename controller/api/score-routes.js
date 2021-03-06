const router = require('express').Router();
const {User, Score} = require('../../models');
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'Arcade-Sweet'
//Get All scores
router.get("/", async(req,res)=>{
    try{
        const score = await Score.find();
        res.json(score);
    }
    catch (error) {
        res.status(500).json({ message: "ERRORRRRR" });
    }
})


router.post("/", async  (req, res) => {
    const token = req.headers?.authorization?.split(" ").pop();
    if(token) {
      console.log("token = "+JSON.stringify(token));
      const decodedToken = await jwt.verify(token, JWT_SECRET, (err , decoded) =>{
        if (err) {
          console.log(err)
          res.status(403).json({ msg: 'invalid credentials'})
        } else {
          return decoded
        }
      } );
      console.log("decodedToken = "+decodedToken);
      const scoreJson = {
        score: req.body.score,
        gamevalue: req.body.gamevalue,
        username: decodedToken.username
      };
      
      Score.create(scoreJson)
        .then((newScore) => {
         return User.findOneAndUpdate(
            {   username: decodedToken.username },
            { $addToSet: { scores: newScore._id} },
            { new: true }
          );
        })
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
    }
}); 


router.post("/top/", async (req, res) => {
  console.log("req = "+req);
  let gamevalue = req.body.gamevalue;
  try{
    const tops = await Score.find({gamevalue: gamevalue}).sort({score:1}).limit(3)
    res.json(tops);
    console.log("tops = "+JSON.stringify(tops));
  } catch(error) {
    console.log(error);
    res.status(500).json({ error });
  }
}); 

router.post("/wordle", async (req, res) => {
  console.log("req = "+req);
  let gamevalue = req.body.gamevalue;
  try{
    const tops = await Score.find({gamevalue: gamevalue}).sort({score:1})
    res.json(tops);
    console.log("tops = "+JSON.stringify(tops));
  } catch(error) {
    console.log(error);
    res.status(500).json({ error });
  }
}); 

module.exports = router;