import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MessageDisplay from './Message';

export default function SignupPage() {
  let navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(''); // State for the message
  const [messageType, setMessageType] = useState('info'); // State for the message type

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r">
      <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 ease-in-out hover:scale-105">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Sign Up</h1>
        
        {/* Show MessageDisplay only if a message exists */}
        {message && <MessageDisplay message={message} type={messageType} />}
        
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 ease-in-out"
              placeholder="John"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 ease-in-out"
              placeholder="Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 ease-in-out"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 bg-white bg-opacity-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 ease-in-out"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div>
            <button
              onClick={async (e) => {
                e.preventDefault();
                setIsLoading(true);
                try {
                  const response = await axios.post('http://192.168.29.252:3000/api/v1/user/signup', {
                    email,
                    password,
                    firstname: firstName,
                    lastname: lastName,
                  });

                  // Handle success
                  setMessage(response.data.response || "Please Verify in Email");
                  setMessageType('success');
                  setTimeout(() => {
                    navigate('/signin');
                  }, 3000);
                  
                } catch (error) {
                  // Handle error
                  setMessage(error.response?.data?.message || "Error ");
                  setMessageType('error');
                } finally {
                  setIsLoading(false);
                }
              }}
              disabled={isLoading}
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-3" />
                  Signing up...
                </div>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/signin" className="font-medium text-black-500 hover:text-black-500 transition-colors duration-200">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
