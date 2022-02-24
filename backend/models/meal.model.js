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
    type: Date,
    required: true,
    default: Date.now(),
  },
  carbs: {
    type: String,
    required: true,
  },
  protein: {
    type: String,
    required: true,
  },
  fats: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;
