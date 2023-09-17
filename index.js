//https://www.apollographql.com/docs/apollo-server/getting-started
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

//server setup
const server = new ApolloServer({
  //1.typeDefs-schema
  //2.resolvers
});
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`🚀 Server ready at ${url}`);
