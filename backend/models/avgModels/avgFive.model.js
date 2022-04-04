const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const avgFiveSchema = new Schema({
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

const avgFive = mongoose.model('avgFive', avgFiveSchema);
module.exports = avgFive;
