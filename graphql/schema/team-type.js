// 5 Type of GraphQl
//int, float, string, boolean, ID

// Import the "gql" function from the "graphql-tag" library
// This function is used to parse GraphQL query strings into the standard GraphQL syntax
// https://www.npmjs.com/package/graphql-tag
const gql = require('graphql-tag');
const teamType = gql`
  type TeamType {
    _id: ID
    name: String
    location: String
    player: ID!
    createdAt: String!
    updatedAt: String!
  }
  input TeamInput {
    _id: ID
    name: String
    location: String
    player: ID!
  }
  type Query {
    getTeam(id: ID!): TeamType
    getTeams: [TeamType]
  }
  type Mutation {
    addTeam(input: TeamInput): TeamType
  }
`;
module.exports = teamType;
