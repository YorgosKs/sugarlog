const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weightSchema = new Schema({
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
    type: String,
    required: false,
  },
  weightNum: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
});

const Weight = mongoose.model('Weight', weightSchema);
module.exports = Weight;
