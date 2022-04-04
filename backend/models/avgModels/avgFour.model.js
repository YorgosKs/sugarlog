const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const avgFourSchema = new Schema({
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

const avgFour = mongoose.model('avgFour', avgFourSchema);
module.exports = avgFour;
