import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';

type AlertType = "info" | "success" | "warning" | "error";
interface AlertState {
  show: boolean;
  title: string;
  type: AlertType;
  message: string;
}

interface alertProps {
  alert:AlertState;
  hideAlert: () => void;
  time?:number
}



const Alert = ({
  alert,
  hideAlert, 
  time=5000
}:alertProps) => {
 
  const styles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-400',
      text: 'text-blue-700',
      icon: <Info className="w-5 h-5 text-blue-500" />,
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-400',
      text: 'text-green-700',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-400',
      text: 'text-yellow-700',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-400',
      text: 'text-red-700',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
    },
  };

  const alertType = typeof alert?.type === 'string' && alert?.type in styles ? alert.type as keyof typeof styles : 'info';
  const currentStyle = styles[alertType];

  

useEffect(() => {
  if (alert.show) {
    const timer = setTimeout(() => {
      hideAlert();
    }, time);

    return () => clearTimeout(timer);
  }
}, [alert, time, hideAlert]);


  return (
    <div className={`fixed top-6 right-4 p-4 shadow-lg border-l-4 ${currentStyle.bg} ${currentStyle.border} rounded-md flex items-start z-50 w-80 ${alert?.show?"block":"hidden"}`}>
      <div className="flex-shrink-0 mr-3">
        {currentStyle.icon}
      </div>
      <div className="flex-1">
       
        <div className={`text-sm ${currentStyle.text}`}>
          {alert?.message}
        </div>
      </div>
        <button 
          onClick={hideAlert}
          className={`ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentStyle.text} focus:ring-offset-${currentStyle.bg.split('-')[1]}-50 focus:ring-${currentStyle.text.split('-')[1]}-500`}
        >
          <span className="sr-only">Dismiss</span>
          <X className="w-4 h-4" />
        </button>
    </div>
  );
};

export default Alert;