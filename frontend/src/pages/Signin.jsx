import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MessageDisplay from './Message'; // Import the MessageDisplay component

const SigninPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null); // State for error/success message
  const [messageType, setMessageType] = useState('info'); // 'success', 'error', or 'info'
  const [isCheckingToken, setIsCheckingToken] = useState(true)

  useEffect(() => {
    const checkToken = async () => {
      const token =localStorage.getItem('token')
      if(!token){
        setIsCheckingToken(false)
        return
      }
      try {
        const response = await axios.get('http://192.168.29.252:3000/api/v1/user/confirmation', {
          headers: {
            'token': localStorage.getItem('token')
          }
        });
        const data = await response.data.response;
        if (data) {
          return navigate('/payment'); // If token is valid, redirect to payment
        }
      } catch (error) {
        console.error('Error checking token:', error);
      } finally {
        setIsCheckingToken(false); // Finish token check
      }
    }
    checkToken()

  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://192.168.29.252:3000/api/v1/user/signin', {
        email,
        password,
      });
      console.log(response.data.msg);
      localStorage.setItem('token', response.data.msg);
      setMessage("Login Successful");
      setMessageType('success'); // Show success message
      setInterval(() => {
        navigate('/payment');
      }, 1000)

    } catch (error) {
      console.error('Signin failed:', error);
      setMessage('Signin failed. Please check your credentials and try again.');
      setMessageType('error'); // Show error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 ease-in-out hover:scale-105">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back</h1>

        {/* Display error or success message */}
        {message && <MessageDisplay message={message} type={messageType} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white bg-opacity-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="john@example.com"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white bg-opacity-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="••••••••"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-3" />
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="font-medium text-black-600 hover:text-black-500 transition-colors duration-200">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
