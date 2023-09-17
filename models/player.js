const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const playerSchema = new Schema({
  name: String,
  age: Number,
  position: String,
  team: String,
});
module.exports = mongoose.model('Player', playerSchema);
