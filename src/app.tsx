import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import ToastProvider from './providers/toast';
import createApolloClient from './apollo-client';
import PageLayout from './components/page-layout';
import Routes from './routes';

const apolloClient = createApolloClient();

const App: FC = function App() {
  return (
    <ToastProvider>
      <ApolloProvider client={apolloClient}>
        <Router>
          <PageLayout>
            <Routes />
          </PageLayout>
        </Router>
      </ApolloProvider>
    </ToastProvider>
  );
};

export default App;
