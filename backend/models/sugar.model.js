const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sugarSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  time: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  activity: {
    type: String,
    required: true,
  },
  medication: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
});

const Sugar = mongoose.model('Sugar', sugarSchema);
module.exports = Sugar;
