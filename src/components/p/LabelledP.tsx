import React from 'react';
import DynamicP from './DynamicP';
import DynamicDiv from '../DynamicDiv';

interface Props {
  text: string;
  label: string ;
  className?: string;
  style?: React.CSSProperties;
}

export default function LabelledP({ text, label, className, style = {} }: Props) {
  return (
    <DynamicDiv className={`d-flex align-items-center gap-2 ${className}`} style={style}>
      <DynamicP text={label} className="fw-bold mb-0" style={{fontFamily:"'Crimson Pro', serif"}}/>
      <DynamicP text={text} className="mb-0" style={{fontFamily:"'Merriweather', serif"}}/>
    </DynamicDiv>
  );
}
