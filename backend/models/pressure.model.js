const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pressureSchema = new Schema({
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
  systolic: {
    type: String,
    required: true,
  },
  diastolic: {
    type: String,
    required: true,
  },
  pulse: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
});

const Pressure = mongoose.model('Pressure', pressureSchema);
module.exports = Pressure;
