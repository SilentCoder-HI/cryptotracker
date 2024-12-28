'use client';
import { motion } from 'framer-motion';

export const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <motion.div
      animate={{
        rotate: 360,
        transition: {
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }
      }}
      className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full"
    />
  </motion.div>
); 