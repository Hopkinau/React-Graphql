// 5 Type of GraphQl
//int, float, string, boolean, ID

// Import the "gql" function from the "graphql-tag" library
// This function is used to parse GraphQL query strings into the standard GraphQL syntax
// https://www.npmjs.com/package/graphql-tag
const gql = require('graphql-tag');
const playersType = gql`
  type PlayerType {
    _id: ID
    name: String
    age: Int
    position: String
    team: String
  }
  input PlayerInput {
    _id: ID
    name: String
    age: Int
    position: String
    team: String
  }
  type Query {
    player(id: ID): PlayerType
    players: [PlayerType]
  }
  type Mutation {
    addPlayer(input: PlayerInput): PlayerType
  }
`;
module.exports = playersType;
