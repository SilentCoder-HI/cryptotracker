import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full"
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
