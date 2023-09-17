const PlayerModel = require('../../models/player');
const Joi = require('joi');

const playerResolver = {
  Query: {
    player: async (parent, args) => {
      const player = await PlayerModel.findById(args.id);
      if (!player) {
        throw new Error('Player not found');
      }
      return player;
    },
    players: async () => {
      const players = await PlayerModel.find();
      if (!players.length) {
        throw new Error('Players not found');
      }
      return players;
    },
  },
  Mutation: {
    addPlayer: async (parent, args) => {
      const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        position: Joi.string().required(),
        team: Joi.string().required(),
      });
      const result = schema.validate(args.input);
      if (result.error) {
        throw new Error(result.error.message);
      }
      let player = new PlayerModel(args.input);
      return await player.save();
    },
  },
};

module.exports = playerResolver;
