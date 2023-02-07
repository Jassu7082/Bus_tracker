const mongoose = require("mongoose");

const DuserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = Duser =mongoose.model("duser",DuserSchema);