import React from "react";

const Button = ({
  text,
  type,
  active,
  width,
  height,
  onButoonClick,
  className,
}) => {
  if (type === "status-filter") {
    return (
      <button
        className={`px-4  text-sm rounded w-[120px] h-[40px] ${
          active ? "bg-main text-white" : "bg-main text-white"
        } hover:bg-blue-700 transition duration-300`}
        onClick={onButoonClick}
      >
        {text}
      </button>
    );
  } else {
    return (
      <button
        className={`px-4 py-[13px] rounded text-sm bg-main ${
          className ?? `w-[${width}px] h-[${height}px]`
        } text-white hover:bg-blue-700  transition duration-300`}
        onClick={onButoonClick}
      >
        {text}
      </button>
    );
  }
};

export default Button;
