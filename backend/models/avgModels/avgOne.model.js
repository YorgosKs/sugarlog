const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const avgOneSchema = new Schema({
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

const avgOne = mongoose.model('avgOne', avgOneSchema);
module.exports = avgOne;
