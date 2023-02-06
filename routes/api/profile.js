const express =require("express");
const router = express.Router();
const {check,validationResult}=require("express-validator");
const auth =require("../../middleware/auth");
// @route  GET api/profile/me
// @desc   get user profile
// @access Private
const Location = require("../../models/location");
const User = require("../../models/User");
router.get("/me",auth, async (req,res)=> {
    try{
        const profile = await Location.findOne({user:req.user.id}).populate("user",["name","avator"]);
        if(!profile){
            return res.status(400).json({msg:"there is no profile for this user"});
            
        }
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
        let profile = await Location.findOne({user: req.user.id});
        if (profile) {
            await Location.findOneAndUpdate(
                { user: req.user.id },
                { $set: { "longitude": profileFields.longitude, "latitude": profileFields.latitude } },
                { new: true },
                (err, updatedProfile) => {
                    if (err) {
                        return res.status(400).json({ errors: [{ msg: err.message }] });
                    }
                    return res.json(updatedProfile);
                }
                );
            return
          };
        profile = new Location(profileFields);
        await profile.save();
         res.json(profile);
    }catch (err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});


// @route  delete api/profile
// @desc   delete user profile
// @access Private
router.delete("/",auth,async(req,res)=>{
    try{
        await Location.findOneAndRemove({user:req.user.id});
        await User.findOneAndRemove({ _id:req.user.id});

        res.json({msg:"user removed"});
    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;