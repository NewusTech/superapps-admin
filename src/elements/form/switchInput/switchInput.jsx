import React from "react";

const SwitchInput = ({ checked, onChange, className }) => {
  return (
    <label
      className={`relative inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div
        className={`w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-1 peer-focus:ring-textSecondary dark:peer-focus:ring-textSecondary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}></div>
    </label>
  );
};

export default SwitchInput;
