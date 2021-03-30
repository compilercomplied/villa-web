import { Auth0Provider } from '@auth0/auth0-react';
import './App.css';
import { ToastBucket } from './components/notification/toast';
import { ToastProvider } from './contexts/toast';
import AppRouter from './routing/app-router';


function App() {
  return (
    <Auth0Provider
      domain={ process.env.REACT_APP_AUTH0_DOMAIN           ?? "" }
      clientId={ process.env.REACT_APP_AUTH0_VILLA_ID       ?? "" }
      audience={ process.env.REACT_APP_AUTH0_VILLA_AUDIENCE ?? "" }
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
