import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { makeServer } from './server';
import { BrowserRouter } from 'react-router-dom';
import { LandingProvider } from './frontend/context';

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <LandingProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LandingProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
