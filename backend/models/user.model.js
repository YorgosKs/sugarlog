const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  infoComplete: {
    type: Boolean,
    default: false,
  },
});
const User = mongoose.model('User', userSchema);
module.exports = User;
