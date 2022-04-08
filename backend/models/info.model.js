const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const infoSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  sugarUnit: {
    type: String,
    required: true,
  },
  minRange: {
    type: String,
    required: true,
  },
  maxRange: {
    type: String,
    required: true,
  },
});

const Info = mongoose.model('Info', infoSchema);
module.exports = Info;
