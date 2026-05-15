import React from 'react';
import DynamicP from './DynamicP';
import DynamicDiv from '../DynamicDiv';

// interfaces and types

interface Props {
  text: string;
  label: string;
  classNameDiv?: string;
  classNameLabel?: string;
  classNameText?: string;
  style?: React.CSSProperties;
}

export default function LabelledDynamicP({ text, label, classNameDiv = '', classNameLabel = '', classNameText = '', style = {} }: Props) {
  return (
    <DynamicDiv className={`d-flex align-items-center gap-2 ${classNameDiv}`} style={style}>
      <DynamicP text={label} className={`mb-0 fw-bold ${classNameLabel}`} style={{fontFamily:"'Crimson Pro', serif"}}/>
      <DynamicP text={text} className={`mb-0 ${classNameText}`} style={{fontFamily:"'Merriweather', serif"}}/>
    </DynamicDiv>
  );
}
