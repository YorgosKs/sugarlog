const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema({
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
    // default: Date.now(),
  },
  carbs: {
    type: String,
    required: false,
  },
  protein: {
    type: String,
    required: false,
  },
  fats: {
    type: String,
    required: false,
  },
  note: {
    type: String,
  },
});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;
