const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const avgThreeSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
});

const avgThree = mongoose.model('avgThree', avgThreeSchema);
module.exports = avgThree;
