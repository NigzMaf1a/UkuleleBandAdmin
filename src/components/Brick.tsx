"use client";
import React from "react";
import type { ReactNode } from "react";

interface DynamicDivProps {
  children: ReactNode;         
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function Brick({
  children,
  onClick,
  className,
  style = {},
}: DynamicDivProps) {
  return (
    <div
      onClick={onClick}
      className={`${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
