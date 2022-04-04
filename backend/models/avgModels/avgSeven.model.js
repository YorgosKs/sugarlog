const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const avgSevenSchema = new Schema({
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

const AvgSeven = mongoose.model('AvgSeven', avgSevenSchema);
module.exports = AvgSeven;
