const router = require('express').Router();
const User = require('../../models/User');
// const tokenJs = require('../utils/token');

//Get all Gamer Profiles
router.get('/allProfiles', async(req,res)=>{
    try{
        const user = await User.find().populate("scores");
        
        res.json(user);
    }
    catch (error) {
       
        res.status(500).json({ message: "ERRORRRRR" });
    }
})

//Get one Gamer Profile
router.get('/Profile/:userId', async(req,res)=>{
    try{
        const user = await User.findOne( { _id: req.params.userId });
        res.json(user);
    }
    catch (error) {
       
        res.status(500).json({ message: "ERRORRRRR" });
    }
})


//Update Profile Info
router.put('/:userId', async(req,res)=>{
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId }, req.body, {
                runValidators: true,
                new: true,
              })
            //  req.body.password = bcrypt.hashSync(req.body.password, 10)
                res.json(user);
              console.log(user);
            // { username: req.body.username, email:req.body.email, password: req.body.password},
    } catch (error) {
       
        res.status(500).json({ message: "ERRORRRRR" });
    }
})

//Upadting Avatar
router.put('/avatarUpdate/:userId', async(req,res)=>{
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId }, req.body.file_name, {
                new: true,
              })
                res.json(user);
              console.log(user);
            // { username: req.body.username, email:req.body.email, password: req.body.password},
    } catch (error) {
        res.status(500).json({ message: "ERRORRRRR" });
    }
})

//Deleting Gamer Profile
router.delete('/:userId', async (req, res) => {
    try{
        const user = await  User.findOneAndDelete({  _id: req.params.userId  })
        res.json({ message: "Gamer Profile Deleted!" });
    }
        catch(error){
            res.status(500).json({ message: "ERRORRRRR" });
        }
    }
  );
  
module.exports = router;