const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
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
    required: false,
  },
  calories: {
    type: String,
    required: false,
  },
  note: {
    type: String,
  },
});

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
