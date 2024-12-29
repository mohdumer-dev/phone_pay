import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const VerifyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    if (token) {
      axios.get(`http://192.168.29.252:3000/api/v1/user/verification?token=${token}`)
        .then((response) => {
          setMessage(response.data.msg);
          setIsVerified(true);
          setTimeout(() => {
            navigate('/signin');
          }, 3000);
        })
        .catch((error) => {
          setMessage(error.response?.data?.msg || 'Verification failed. Please try again.');
          setIsVerified(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setMessage('Invalid token.');
      setIsLoading(false);
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl p-8 w-full max-w-md transform transition-all duration-500 ease-in-out hover:scale-105">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <Loader className="w-16 h-16 text-blue-500 animate-spin" />
            <p className="mt-4 text-lg font-medium text-gray-700">Verifying your account...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {isVerified ? (
              <CheckCircle className="w-24 h-24 text-green-500 mb-4 animate-bounce" />
            ) : (
              <XCircle className="w-24 h-24 text-red-500 mb-4 animate-pulse" />
            )}
            <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
              {isVerified ? 'Account Verified' : 'Verification Failed'}
            </h1>
            <p className="text-center text-lg text-gray-600 mb-6">{message}</p>
            {isVerified && (
              <p className="text-sm text-gray-500 animate-pulse">
                Redirecting to dashboard in 3 seconds...
              </p>
            )}
            {!isVerified && (
              <button
                onClick={() => navigate('/signin')}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full font-medium transition-all duration-200 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Back to Sign Up
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;

