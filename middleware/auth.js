const jwt = require("jsonwebtoken");
const config =require("config");

module.exports =function(req,res,next){
    const token = req.header("x-auth-token");
    console.log(token);
    if(token==null){
     return res.status(401).json({msg:"no token"});
    }
    try {
        var decoded = jwt.verify(token,"rootmax");
        req.user = decoded.user;
        console.log(req.user.id );
        console.log("--------------")
        next();
    } catch(err) {
         res.status(401).json({msg:"token is not valid"});
    }
}