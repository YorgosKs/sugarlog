const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const insulinSchema = new Schema({
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
  units: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  note: {
    type: String,
  },
});

const Insulin = mongoose.model('Insulin', insulinSchema);
module.exports = Insulin;
