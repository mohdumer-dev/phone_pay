import React from 'react';
import { User } from 'lucide-react';

const Navbar = ({ firstName, lastName }) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-gray-800">Payment Portal </span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <User className="h-8 w-8 text-gray-400" />
              <span className="ml-2 text-gray-800 font-medium">
                {firstName} {lastName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

