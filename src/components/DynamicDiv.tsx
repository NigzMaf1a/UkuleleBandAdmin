import type { ReactNode } from "react";

interface DynamicDivProps {
  children: ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function DynamicDiv({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = "",
  style = {},
}: DynamicDivProps) {
  return (
    <div
      onClick={onClick}
      className={` rounded-1 ${className}`}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
