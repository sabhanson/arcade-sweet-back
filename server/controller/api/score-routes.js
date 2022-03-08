const router = require('express').Router();
const User = require('../../models/User');
const Score = require('../../models/Score');

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

//Get score by game Id => show {username:score}
// router.get("/:gameId", async(req,res)=>{
//     try{
//         const score = await Score.findOne({ _id: req.params.userId });
//         res.json(score);
//     }
//     catch (error) {
       
//         res.status(500).json({ message: "ERRORRRRR" });
//     }
// })

//post score by session id
//new score created in a game 
//game completed it makes post req
router.post("/",   (req, res) => {
    
        Score.create(req.body)
        
          .then((newScore) => {
            return User.findOneAndUpdate(
              {   _id: req.session.user },
              { $push: { scores: newScore } },
              { new: true }
            );
          })
          .then((data) => {
            if (!data) {
              res.status(404).json({ message: "user does not exist" });
              return;
            }
            res.status(200).json(data);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      }); 

module.exports = router;