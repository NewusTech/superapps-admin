import React from 'react';

const Button = ({ text, type, active, width, height }) => {
  if (type === 'status-filter') {
    if (active) {
      return (
        <button className="px-4  text-sm rounded w-[120px] h-[40px] bg-main text-white hover:bg-blue-700 transition duration-300">
          {text}
        </button>
      );
    } else {
      return (
        <button className="px-4 text-sm rounded w-[120px] h-[40px] bg-white text-main border border-main hover:bg-main hover: hover:text-white transition duration-300">
          {text}
        </button>
      );
    }
  }
  if (type === 'Tambah') {
    if (active) {
      return (
        <button className="px-4  text-sm rounded w-full h-[40px] bg-main text-white hover:bg-blue-700 transition duration-300">
          {text}
        </button>
      );
    } else {
      return (
        <button className="px-4 text-sm rounded w-full h-[40px] text-white   border border-main bg-main hover:bg-main hover: hover:text-white transition duration-300">
          {text}
        </button>
      );
    }
  } else {
    return (
      <button
        className={`px-4 py-[13px] rounded text-sm bg-main w-[${width}px] h-[${height}px] text-white hover:bg-blue-700  transition duration-300`}>
        {text}
      </button>
    );
  }
};

export default Button;
