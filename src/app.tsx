import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ToastProvider from './providers/toast';
import TsApiInterceptors from './components/ts-api-interceptors';
import Routes from './routes';

const App: FC = function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes />
      </Router>
      <TsApiInterceptors />
    </ToastProvider>
  );
};

export default App;
