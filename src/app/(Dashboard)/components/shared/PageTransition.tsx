'use client';
import { motion } from 'framer-motion';
import { fadeIn } from '@/src/constants/animations';

export const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={fadeIn}
    initial="initial"
    animate="animate"
    exit="exit"
    className="min-h-screen"
  >
    {children}
  </motion.div>
); 