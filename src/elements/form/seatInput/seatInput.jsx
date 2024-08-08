import React from "react";

const SeatInput = ({ seat, onChange, isSelected }) => {
  const isAvailable = seat.status !== "terisi";

  return (
    <label className="relative">
      <input
        type="checkbox"
        className="absolute opacity-0"
        disabled={!isAvailable}
        checked={isSelected}
        onChange={() => onChange(seat)}
      />
      <div
        className={`flex items-center justify-center px-5 py-3 cursor-pointer 
          ${
            !isAvailable
              ? "bg-textSecondary"
              : isSelected
              ? "bg-secondary"
              : "bg-main"
          }`}>
        <p className="text-neutral-50 text-[16px] font-normal">
          {seat.nomor_kursi}
        </p>
      </div>
    </label>
  );
};

export default SeatInput;
