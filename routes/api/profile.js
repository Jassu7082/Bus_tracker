const express =require("express");
const router = express.Router();
const {check,validationResult}=require("express-validator");
const auth =require("../../middleware/auth");
// @route  GET api/profile/me
// @desc   get user profile
// @access Private
const Location = require("../../models/location");
const User = require("../../models/User");
router.get("/",auth, async (req,res)=> {
    console.log("inside");
    try{
        const profile = await Location.findOne({user:"63e2bc14eb87b1a81a0f7d47"});
        console.log(profile);
        if(!profile){
            return res.status(400).json({msg:"there is no profile for this user"});
        } else return res.json(profile);
    } catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// @route  post api/profile
// @desc   update user profile
// @access Private

router.post("/",[
    auth,[
        check("longitude","longitude is required").not().isEmpty(),
        check("latitude","latitude is required").not().isEmpty(),
    ]
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {
        longitude,
        latitude
    }=req.body;
    const profileFields={};
    profileFields.user=req.user.id;
    if(longitude) profileFields.longitude=longitude;
    if(latitude) profileFields.latitude=latitude;
    try{
        let profile = await Location.findOne( {user:req.user.id});
        if (profile) {
            profile = await Location.findOneAndUpdate(
                { user: req.user.id },
                { $set: { "longitude": profileFields.longitude, "latitude": profileFields.latitude } },
                { new: true }
            );
            return res.json(profile);
        };
        profile = new Location(profileFields);
        await profile.save();
        return res.json(profile);
    }catch (err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;