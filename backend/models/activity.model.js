const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  time: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  type: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  calories: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
});

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
