import React from 'react';
import { DollarSign } from 'lucide-react';

const AccountBalance = ({ balance }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Balance</h2>
      <div className="flex items-center">
        <DollarSign className="h-8 w-8 text-green-500 mr-2" />
        <span className="text-3xl font-bold text-gray-800">{balance}</span>
      </div>
    </div>
  );
};

export default AccountBalance;

