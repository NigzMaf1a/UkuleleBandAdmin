"use client";
import React, { ReactNode } from "react";

interface DynamicDivProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function Skeleton({
  children,
  onClick,
  className = "",
  style = {},
}: DynamicDivProps) {
  return (
    <div
      onClick={onClick}
      className={`d-flex flex-column gap-3 w-100 h-100 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
