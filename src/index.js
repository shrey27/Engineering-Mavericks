import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { makeServer } from './server';
import { BrowserRouter } from 'react-router-dom';
import {
  LandingProvider,
  AuthenticationProvider,
  LikedProvider,
  HistoryProvider,
  WatchProvider
} from './frontend/context';

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthenticationProvider>
        <LandingProvider>
          <LikedProvider>
            <WatchProvider>
              <HistoryProvider>
                <App />
              </HistoryProvider>
            </WatchProvider>
          </LikedProvider>
        </LandingProvider>
      </AuthenticationProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
