import type { ReactNode } from "react";

interface DynamicDivProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function DynamicDiv({
  children,
  onClick,
  className = "",
  style = {},
}: DynamicDivProps) {
  return (
    <div
      onClick={onClick}
      className={` rounded-1 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
