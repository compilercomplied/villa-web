import React from 'react';
import './App.css';
import { AuthProvider } from './contexts/auth';
import AppRouter from './routing/app-router';

function App() {
  console.log("app loaded");
  return (
    <AuthProvider>
      <AppRouter/>
    </AuthProvider>
  );
}

export default App;
