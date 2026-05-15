import React from 'react';

interface AnimationProps{
  className?: string;
  className2?: string;
  style?: React.CSSProperties;
  style2?: React.CSSProperties;
}

export default function LoadingAnimation({className = '', className2 = '', style = {}, style2 = {}}:AnimationProps) {
  return (
    <div className={`text-center ${className}`} style={style}>
        <div className={`spinner-border text-primary ${className2}`} style={style2} role="status" />
    </div>
  );
}