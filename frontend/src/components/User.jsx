import React from 'react';
import { Send } from 'lucide-react';

const UserCard = ({ firstname,lastname, onSendMoney }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg mr-3">
          {firstname[0].toUpperCase()}
        </div>
        <span className="text-gray-800 font-medium">{firstname} {lastname}</span>
      </div>
      <button
        onClick={onSendMoney}
        className="bg-green-600 text-white px-4 py-2 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        <Send size={18} className="mr-2" />
        Send Money
      </button>
    </div>
  );
};

export default UserCard;
