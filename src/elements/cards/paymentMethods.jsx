import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

function PaymentMethods({
  payments,
  selectedPaymentMethod,
  onPaymentMethodChange,
}) {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (methodId) => {
    setActiveAccordion(activeAccordion === methodId ? null : methodId);
  };

  const handleRadioChange = (metodeId) => {
    onPaymentMethodChange(metodeId);
    // setActiveAccordion(null);
  };

  const pembayarans = [
    {
      id: 1,
      name: "Payment Gateway",
      options: payments?.payment_gateway,
    },
    {
      id: 2,
      name: "Transfer Bank",
      options: payments?.bank_transfer,
    },
    {
      id: 3,
      name: "Cash",
      options: payments?.cash,
    },
  ];

  return (
    <div className="payment-methods">
      {pembayarans?.map((method, index) => (
        <div key={index} className="payment-method">
          <div
            className="payment-method-header flex justify-between items-center cursor-pointer"
            onClick={() => toggleAccordion(method.id)}>
            <span>{method.name}</span>
            <span>
              {activeAccordion === method.id ? <ChevronUp /> : <ChevronDown />}
            </span>
          </div>
          {activeAccordion === method.id && (
            <div className="payment-method-options">
              {method?.options?.map((option, index) => (
                <label
                  key={index}
                  htmlFor={`payment-option-${option.id}`}
                  className="flex items-center p-4 cursor-pointer border rounded-lg">
                  <input
                    type="radio"
                    id={`payment-option-${option.id}`}
                    name="payment-option"
                    value={option.id}
                    checked={selectedPaymentMethod === option.id}
                    onChange={() => handleRadioChange(option.id)}
                    className="hidden"
                  />
                  <img
                    src={option.img}
                    alt={option.keterangan}
                    className="h-12 w-12 mr-4"
                  />
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PaymentMethods;
