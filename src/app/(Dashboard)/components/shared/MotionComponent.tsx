'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionComponentProps {
  children: ReactNode;
  className?: string;
  variants?: any;
  initial?: any;
  animate?: any;
  exit?: any;
  whileHover?: any;
  whileTap?: any;
  key?: string | number;
  transition?: any;
}

export const MotionDiv = ({
  children,
  className,
  variants,
  initial,
  animate,
  exit,
  whileHover,
  whileTap,
  key,
  transition
}: MotionComponentProps) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={key}
      className={className}
      variants={variants}
      initial={initial || "initial"}
      animate={animate || "animate"}
      exit={exit || "exit"}
      whileHover={whileHover}
      whileTap={whileTap}
      transition={transition}
      layout
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export const MotionSection = ({
  children,
  className,
  variants,
  initial,
  animate,
  key
}: MotionComponentProps) => (
  <AnimatePresence mode="wait">
    <motion.section
      key={key}
      className={className}
      variants={variants}
      initial={initial || "initial"}
      animate={animate || "animate"}
      layout
    >
      {children}
    </motion.section>
  </AnimatePresence>
); 