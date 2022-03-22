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
    <BrowserRouter>
      <LandingProvider>
        <App />
      </LandingProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
