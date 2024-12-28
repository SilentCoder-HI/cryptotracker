'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  bgColor?: string;
  delay?: number;
}

export const AnimatedSection = ({ 
  children, 
  className = "", 
  bgColor = "bg-gray-900",
  delay = 0
}: AnimatedSectionProps) => (
  <motion.section
    className={`w-full py-20 ${bgColor} ${className}`}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="max-w-7xl mx-auto px-6">
      {children}
    </div>
  </motion.section>
); 