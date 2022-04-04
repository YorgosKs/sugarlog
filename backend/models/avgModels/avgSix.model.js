const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const avgSixSchema = new Schema({
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

const AvgSix = mongoose.model('AvgSix', avgSixSchema);
module.exports = AvgSix;
