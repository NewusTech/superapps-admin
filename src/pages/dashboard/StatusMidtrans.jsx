import React from "react";

export default function StatusMidtrans() {
  return (
    <div className="w-full flex flex-row justify-center mt-16">
      <div className="w-8/12 flex flex-col justify-center self-center">
        <div className="flex flex-col gap-4 items-center justify-center">
          <img src={SuccessIcon} alt="Success" />
          <p className="font-bold">Pembayaran Sukses!</p>
        </div>
      </div>
    </div>
  );
}
