import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { makeServer } from './server';
import { BrowserRouter } from 'react-router-dom';
import {
  LandingProvider,
  AuthenticationProvider,
  LikedProvider,
  HistoryProvider
} from './frontend/context';

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthenticationProvider>
        <LandingProvider>
          <LikedProvider>
            <HistoryProvider>
              <App />
            </HistoryProvider>
          </LikedProvider>
        </LandingProvider>
      </AuthenticationProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
