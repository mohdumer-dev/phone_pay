import React from 'react';
import { Home, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-extrabold text-white tracking-widest font-poppins">
            404
          </h1>
          <h2 className="text-3xl font-bold text-white mt-4 mb-8 font-poppins">
            Oops! Page not found
          </h2>
          <p className="text-lg text-white mb-8 font-poppins">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;

