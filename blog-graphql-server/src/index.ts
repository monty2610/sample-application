import { ApolloServer } from 'apollo-server';
import typeDefs from './schemas';
import resolvers from './resolvers';
import BlogsAPI from './dataSources/Blog';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    blogsAPI: new BlogsAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`server ready on ${url}`);
});
