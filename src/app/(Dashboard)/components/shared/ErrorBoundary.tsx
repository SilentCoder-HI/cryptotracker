'use client';
import { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex items-center justify-center bg-gray-900"
        >
          <div className="text-center p-8 bg-gray-800 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-white">Oops, something went wrong!</h2>
            <p className="text-gray-400 mb-6">{this.state.error?.message}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
            </motion.button>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
} 