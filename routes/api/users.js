const express = require("express");
const router = express.Router();

const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User= require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check ,validationResult}= require("express-validator");
// @route  POST api/users
// @desc   Test route
// @access Public

router.post("/",
[
check('name',"name is requied").not().isEmpty(),
check("email","enter valid email").isEmail(),
check("password","enter a password with 8 or more character").isLength({min:8})
],async (req,res)=> {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {name ,email,phone,password} = req.body;
    try{
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({errors:[{msg:"user exit"}]});
        }

        const avatar =gravatar.url(email,{
            s:"200",
            r: "pg",
            d: "mm"
        })

        user=User({
            name,
            email,
            phone,
            avatar,
            password
        });

        const salt= await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password,salt);

        await user.save();

        const payload={ 
            user:{
                id: user.id
            }
        }

        jwt.sign(payload,
            config.get("jwtToken"),
            {expiresIn: 360000},
            (err,token) =>{
                if(err) throw err;
                res.json({token});
            }
        );

        

    }catch(err){
        console.log(err.message);
        res.status(500).send("server error");
    };
    });

module.exports = router;