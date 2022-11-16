import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
});

const authenticationLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('authenticationToken');
  return {
    headers: token ? {
      ...headers,
      authorization: token && `Bearer ${token}`,
    } : headers,
  };
});

export default function createApolloClient() {
  return new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
    link: authenticationLink.concat(httpLink),
  });
}
