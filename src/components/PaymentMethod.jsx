import { useState } from "react";

const PaymentMethod = () => {
  const paymentMethodOption = [
    {
      name: 'Card',
      image: '/images/card.png',
      value: 'card', // Add a value for each payment method
    },
    {
      name: 'USA bank account',
      image: '/images/usa-bank-account.png',
      value: 'bank-account',
    },
    {
      name: 'Affirm',
      image: '/images/affirm.png',
      value: 'affirm',
    },
  ];

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethodOption[0].value);

  const handleSelect = (value) => {
    setSelectedPaymentMethod(value);
  };

  return (
    <div className="font-inter text-[#333333] space-y-8">
      <h1 className="font-medium tracking-tight text-lg">Payment Method</h1>
      <div className="space-y-10">
        <div className="flex flex-row justify-between space-x-4">
          {paymentMethodOption.map((option, index) => {
            const isSelected = option.value === selectedPaymentMethod;
            return (
              <div
                key={index}
                onClick={() => handleSelect(option.value)}
                className={`flex items-center space-x-3 w-[207px] h-[66px] rounded-2xl p-3 cursor-pointer tracking-[-1%] delay-50 transition-all ${isSelected ? 'border-[1px] border-[#7B6944] bg-[#F5F5EF]' : 'bg-[#F9F9F9]'
                  }`}
              >
                <div className={`p-2.5 rounded-xl bg-white`}>
                  <img src={option.image} alt={option.name} className="w-[22px] h-auto" />
                </div>
                <p className="text-sm">{option.name}</p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col text-black text-sm font-normal space-y-3.5">
          <div className="flex gap-x-4">
          

            <div className="flex flex-col gap-y-2 relative">
              <label htmlFor="card-number" className="flex">Card number</label>
              <div className="relative">
                <input
                  id="card-number"
                  name="card-number"
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  placeholder="0000 0000 0000 0000"
                  className="border-[2px] border-[#F5F5F5] px-4 py-4 pr-12 rounded-xl w-full appearance-none"
                />
                <img src="/images/visacard.png" alt="Visa Card" className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6" />
              </div>
            </div>


            <div className="flex flex-col gap-y-2 max-w-[168px]">
              <label htmlFor="expiration" className="flex">Expiration</label>
              <input
                name="expiration"
                type="text"
                placeholder="MM/YY"
                className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-y-2 max-w-[135px]">
              <label htmlFor="security-code" className="flex">Security code</label>
              <input
                name="security-code"
                type="text"
                placeholder="CVC"
                className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl"
              />
            </div>
          </div>
          <p className="tracking-[-1%] text-xs leading-6">By providing your card information, you allow AvantStay, Inc. to charge your card for future payments in accordance with their terms.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
