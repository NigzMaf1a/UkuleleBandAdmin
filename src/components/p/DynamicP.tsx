import React from 'react';

// interfaces and types

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function DynamicP({ text, className = '', style = {} }: Props) {
  return (
    <p className={`m-0 ${className}`} style={style}>
      {text}
    </p>
  );
}
