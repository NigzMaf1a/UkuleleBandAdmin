import React from 'react';
import DynamicP from './DynamicP';
import DynamicDiv from '../DynamicDiv';

interface Props {
  text: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function LabelledP1({ text, label, className = '', style = {} }: Props) {
  return (
    <DynamicDiv className={`d-flex flex-row align-items-center gap-2 ${className}`} style={style}>
      <DynamicP text={label} 
                className="mb-0 fw-bold" 
                style={{fontFamily:"'Crimson Pro', serif", fontSize:'12px'}}
      />
      <DynamicP text={text} 
                className="mb-0 fst-italic" 
                style={{fontFamily:"'Merriweather', serif", fontSize:'12px'}}
      />
    </DynamicDiv>
  );
}
