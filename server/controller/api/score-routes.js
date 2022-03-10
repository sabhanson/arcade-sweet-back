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
        const token = req.headers?.authorization
        const decodedToken = await jwt.verify(token, JWT_SECRET, (err , decoded) =>{
          if (err) {
            console.log(err)
            res.status(403).json({ msg: 'invalid credentials'})
          } else {
            return decoded
          }
        } )
        console.log(decodedToken)
        Score.create(req.body)
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
      }); 

module.exports = router;