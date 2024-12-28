'use client';  // Add this to indicate it's a client component

import { motion } from 'framer-motion';

interface LoadingAnimationProps {
  children: React.ReactNode;  // Define type for children prop
}

const LoadingAnimation = ({ children }: LoadingAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default LoadingAnimation;
