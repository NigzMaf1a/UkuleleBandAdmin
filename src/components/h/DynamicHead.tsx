import React from 'react';

// Props interface
interface Head1Props {
  text: string | number;        
  onClick?: () => void;    
  className?: string;               
  style?: React.CSSProperties;       
}

export default function DynamicHead({
  text,
  onClick,
  className,
  style = {},
}: Head1Props) {
  return (
    <h5
      onClick={onClick}
      className={` ${className}`}
      style={style}
    >
      {text}
    </h5>
  );
}
