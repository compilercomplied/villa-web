import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import './App.css';
import { ToastBucket } from './components/notification/toast';
import { ToastProvider } from './contexts/toast';
import AppRouter from './routing/app-router';

function App() {
  return (
    <Auth0Provider
      domain="gdariodev.eu.auth0.com"
      clientId="7smC2h3PphTDfo0G24nQPjfVa9m7S4mU"
      audience="pfm.gdario.dev"
      useRefreshTokens={ true }
      redirectUri={ window.location.origin }
    >
      <ToastProvider>
        <AppRouter/>
        <ToastBucket/>
      </ToastProvider>
    </Auth0Provider>
  );
}

export default App;
