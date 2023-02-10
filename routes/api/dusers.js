const express = require("express");
const router = express.Router();

const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const Duser= require("../../models/Duser");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check ,validationResult}= require("express-validator");

// @route  POST api/dusers
// @desc   Test route
// @access Public

router.post("/",async (req,res)=> {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password} = req.body;
    try{
        let duser = await Duser.findOne({email});

        if(duser){
            return res.status(400).json({errors:[{msg:"user exit"}]});
        }

        duser=Duser({
            email,
            password
        });

        const salt= await bcrypt.genSalt(10);

        duser.password = await bcrypt.hash(password,salt);

        await duser.save();

        const payload={ 
            user:{
                id: duser.id
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