'use client'
import React from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

type Props = { 
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: any; retry: () => void }>;
};

type State = { 
  hasError: boolean; 
  error: any;
  errorId: string;
};

export class GlobalErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: any) {
    return { 
      hasError: true, 
      error,
      errorId: `ERR-${Date.now().toString(36).toUpperCase()}`
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Global Error Caught:", error, errorInfo);
    // Optionally log to server or Sentry
    // logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorId: '' });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} retry={this.handleRetry} />;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4 w-screen">
          <div className="max-w-2xl w-full">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-red-50 dark:bg-red-950/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <Bug className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>

            {/* Error Content */}
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                We encountered an unexpected error. Don't worry, our team has been notified.
              </p>
            </div>

            {/* Error Details Card */}
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Error Details
                </h3>
                <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {this.state.errorId}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Error Message
                  </label>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-mono bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded px-3 py-2 mt-1">
                    {this.state.error?.message || 'Unknown error occurred'}
                  </p>
                </div>
                
                {this.state.error?.stack && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Stack Trace
                    </label>
                    <pre className="text-xs text-gray-600 dark:text-gray-400 font-mono bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded px-3 py-2 mt-1 overflow-x-auto max-h-32 overflow-y-auto">
                      {this.state.error.stack}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 font-medium rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </button>
            </div>

            {/* Help Text */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                If this problem persists, please contact support with error ID:{' '}
                <span className="font-mono font-medium text-gray-700 dark:text-gray-300">
                  {this.state.errorId}
                </span>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}