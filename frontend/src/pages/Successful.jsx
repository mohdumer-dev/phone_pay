import React from 'react';
import { CheckCircle, ArrowRight, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const TransferConfirmationPage = ({ amount, recipientName, transactionId, setAmount ,reciever}) => {
  
  const handleMakeAnotherTransfer = () => {
    setAmount('');
  };

  const handleBackToHome = () => {
    setAmount(''); 
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 font-poppins">
            Transfer Successful!
          </h2>
          <p className="mt-2 text-sm text-gray-600 font-poppins">
            Your money has been sent successfully.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="bg-green-100 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-700 font-poppins">Amount</span>
              <span className="text-2xl font-bold text-green-700 font-poppins">${amount}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-700 font-poppins">Recipient</span>
              <span className="text-lg font-semibold text-gray-900 font-poppins">{recipientName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 font-poppins">Transaction ID</span>
              <span className="text-sm text-gray-600 font-poppins">{transactionId}</span>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              onClick={handleBackToHome} 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 font-poppins"
            >
              <ArrowRight className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferConfirmationPage;
