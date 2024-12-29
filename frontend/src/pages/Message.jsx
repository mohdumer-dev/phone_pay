import React from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

const MessageDisplay = ({ message, type = 'info' }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50';
      case 'error':
        return 'bg-red-50';
      default:
        return 'bg-blue-50';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-400';
      case 'error':
        return 'border-red-400';
      default:
        return 'border-blue-400';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-700';
      case 'error':
        return 'text-red-700';
      default:
        return 'text-blue-700';
    }
  };

  return (
    <div className={`rounded-md ${getBackgroundColor()} p-4 mb-4 animate-fade-in`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${getTextColor()}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageDisplay;

