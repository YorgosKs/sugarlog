const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pressureSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
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
  systolic: {
    type: String,
    required: false,
  },
  diastolic: {
    type: String,
    required: false,
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
