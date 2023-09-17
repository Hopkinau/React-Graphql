//https://www.apollographql.com/docs/apollo-server/getting-started
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const glob = require('glob');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
require('dotenv').config();
const config = require('config');
const { connect } = require('./helpers/connection.js');

const appPrivateKey = config.get('appPrivateKey');
const dbConnectionString = config.get('db.connectionString');
// Check that appPrivateKey and dbConnectionString are defined
if (!appPrivateKey && dbConnectionString) {
  console.error(
    'FATAL ERROR: APP_PRIVATE_KEY is not defined and or DB_CONNECTION_STRING is not defined'
  );
  process.exit(1);
}
const resolvers = glob.sync('graphql/resolver/*-resolver.js');
const registerResolvers = resolvers.map((resolver) => require(`./${resolver}`));
const types = glob.sync('graphql/schema/*-type.js');
const registerTypes = types.map((type) => require(`./${type}`));

const typeDefsMerged = mergeTypeDefs(registerTypes);
const resolversMerged = mergeResolvers(registerResolvers);
//server setup
startServer();
// Define the startServer function
async function startServer() {
  //?CREATE A NEW APOLLO SERVER INSTANCE
  // Loads the GraphQL type definitions and resolvers into a new Apollo Server instance
  const server = new ApolloServer({
    typeDefs: typeDefsMerged,
    resolvers: resolversMerged,
    introspection: true, // prevents clients from retrieving information about the schema.
  });

  //?CONNECT TO THE DATABASE
  const databaseName = 'book-management';
  connect(`${dbConnectionString}${databaseName}`);

  //?START THE SERVER
  // Start the server and get the server URL
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀 Server ready at ${url}`);
}
