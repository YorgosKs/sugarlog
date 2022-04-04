const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const avgTwoSchema = new Schema({
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

const avgTwo = mongoose.model('avgTwo', avgTwoSchema);
module.exports = avgTwo;
