import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  label: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onHover?: () => void;
  onLeave?: () => void;
}

const DynamicButton: React.FC<ButtonProps> = ({
  type = "button",
  label,
  className = "",
  style = {},
  onClick,
  onHover,
  onLeave,
}) => {
  return (
    <button
      type={type}
      className={`btn d-flex flex-row align-items-center justify-content-center ${className}`}
      style={style}
      onClick={onClick}
      onMouseEnter={onHover} 
      onMouseLeave={onLeave}
    >
      {label}
    </button>
  );
};

export default DynamicButton;
