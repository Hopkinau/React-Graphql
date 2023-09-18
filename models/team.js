const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: { String, required: true },
  location: { String, required: true },
  player: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  //create a relationship between the player and the team
});
module.exports = mongoose.model('Team', teamSchema);
