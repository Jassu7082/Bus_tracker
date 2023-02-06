const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  longitude: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
