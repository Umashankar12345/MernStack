import React from 'react';
import Register from '../components/Register/Register';

function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <Register />
      </div>
    </div>
  );
}

export default RegisterPage;