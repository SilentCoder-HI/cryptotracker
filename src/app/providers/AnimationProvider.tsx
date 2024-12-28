'use client';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { ReactNode } from 'react';

export const AnimationProvider = ({ children }: { children: ReactNode }) => (
  <LazyMotion features={domAnimation}>
    {children}
  </LazyMotion>
); 