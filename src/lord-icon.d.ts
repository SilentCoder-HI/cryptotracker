declare module 'react-lord-icon' {
  import React from 'react';

  interface LordIconProps {
    src: string;
    trigger?: string;
    style?: React.CSSProperties;
    [key: string]: unknown; // Allow additional props with unknown type
  }

  export const LordIcon: React.FC<LordIconProps>;
  export default LordIcon;
}
