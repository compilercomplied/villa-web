import React from 'react';
import './App.css';
import { ToastBucket } from './components/notification/toast';
import { AuthProvider } from './contexts/auth';
import { ToastProvider } from './contexts/toast';
import AppRouter from './routing/app-router';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppRouter/>
        <ToastBucket/>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
