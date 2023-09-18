const TeamModel = require('../../models/player');
const Joi = require('joi');

const teamResolver = {
  Query: {
    getTeam: async (parent, args) => {
      const team = await TeamModel.findById(args.id);
      if (!team) {
        throw new Error('Player not found');
      }
      return team;
    },
    getTeams: async () => {
      const teams = await TeamModel.find();
      if (!teams.length) {
        throw new Error('teams not found');
      }
      return teams;
    },
  },
  Mutation: {
    addTeam: async (parent, args) => {
      const schema = Joi.object({
        name: Joi.string().required(),
        location: Joi.number().required(),
      });
      const result = schema.validate(args.input);
      if (result.error) {
        throw new Error(result.error.message);
      }
      let team = new TeamModel(args.input);
      return await team.save();
    },
  },
};

module.exports = teamResolver;
