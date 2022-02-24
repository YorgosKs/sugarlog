const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const User = require('./user.model');

const infoSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  sugarUnit: {
    type: String,
    required: true,
  },
  weightUnit: {
    type: String,
    required: true,
  },
  minRange: {
    type: String,
    required: true,
  },
  maxRange: {
    type: String,
    required: true,
  },
});

const Info = mongoose.model('Info', infoSchema);
module.exports = Info;
