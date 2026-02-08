import React from 'react';
import Login from '../components/Login/Login';

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <Login />
      </div>
    </div>
  );
}

export default LoginPage;