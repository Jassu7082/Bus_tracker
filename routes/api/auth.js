const express =require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User =require("../../models/User");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const {check ,validationResult}= require("express-validator");
const config = require("config");



function verifyToken(req, res, next) {
    const token = req.header("x-auth-token");
    console.log(token);
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
      const decoded = jwt.verify(token, "rootmax");
      req.user = decoded.user;
      console.log(req.user.id);
      console.log("--------------");
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  }
// @route  GET api/auth
// @desc   Test route
// @access Public

router.get("/",verifyToken(req, res, next), async (req,res)=> {
    try{
        var id=req.user.id;
        console.log(id);
        const user1 = await User.findById(id);
        res.json(user1);
    } catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// @route  POST api/auth
// @desc   user  and token 
// @access Public

router.post("/",
[
check("email","enter valid email").isEmail(),
check("password"," password is required").exists()
],async (req,res)=> {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({errors:[{msg:"invalid credentials"}]});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({errors:[{msg:"invalid credentials"}]});
            
        }
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