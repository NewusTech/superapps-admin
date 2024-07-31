import React from "react";

const Button = ({
  text,
  type,
  active,
  width,
  height,
  onButoonClick,
  className,
  icon,
  outline = false,
  color
}) => {
  let _color;
  let _colorB;
  switch (color) {
    case 'red':
      _color = "bg-redColor text-white hover:bg-red-400"
      _colorB = "border-redColor text-redColor hover:text-white hover:bg-main"
      break;
    default:
      _color = "bg-main text-white hover:bg-blue-700"
      _colorB = "border-main text-main hover:text-white hover:bg-main"
      break;
  }
  if (type === "status-filter") {
    return (
      <button
        className={`px-4  text-sm rounded w-[120px] h-[40px] ${active ? "bg-main text-white" : "bg-main text-white"
          } hover:bg-blue-700 transition duration-300`}
        onClick={onButoonClick}
      >
        {text}
      </button>
    );
  } else {
    return (
      <button
        className={`px-4 py-[13px] rounded text-sm ${outline ? `border ${_colorB}` : _color}  ${className ?? `w-[${width}px] h-[${height}px]`
          } transition duration-300 flex flex-row items-center gap-2 justify-center`}
        onClick={onButoonClick}
      >
        {icon}
        {text}
      </button>
    );
  }
};

export default Button;
