import { ApolloClient, InMemoryCache } from '@apollo/client';

export default function createApolloClient() {
  return new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
  });
}
