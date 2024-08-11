import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { baseUrl } from "../../config/baseurl";
import { useEffect } from "react";
import BillingAddress from "./BillingAddress";
import axios from "axios";
import toast from "react-hot-toast";

const PaymentMethod = ({
  clientSecret,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  setIsLoading,
  paymentIntentId,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentElementChange = (event) => {
    setSelectedPaymentMethod(event.value.type);
  };

  useEffect(() => {
    if (elements) {
      const paymentElement = elements.getElement(PaymentElement);
      if (paymentElement) {
        paymentElement.on("change", handlePaymentElementChange);
      }
    }
  }, [elements]);

  const handleSubmit = async () => {
    setIsLoading(true);

    if (!stripe || !elements || !clientSecret) {
      setIsLoading(false);
      return;
    }

    if (!elements.getElement(PaymentElement)) {
      setIsLoading(false);
      toast.error("Please select a payment method");
      return;
    }

    //save the personal info
    const response = await fetch(`${baseUrl}/payment/createcustomer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        email: personalInfo.email,
        phone: personalInfo.phone,
      }),
    });

    if (response.status !== 201) {
      setIsLoading(false);
      throw new Error("Failed to create customer");
    }

    const { customerId } = await response.json();

    // Save the payment info in the server
    await savePaymentInfo(customerId);

    let result;
    try {
      result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `http://localhost:5173/success`,
          shipping: {
            name: `${billingAddress.firstName} ${billingAddress.lastName}`,
            address: {
              line1: billingAddress.line1,
              line2: billingAddress.line2,
              city: billingAddress.city,
              state: billingAddress.state,
              postal_code: billingAddress.postalCode,
              country: billingAddress.country,
            },
          },
        },
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Payment failed!!!", { duration: 2000 });
      console.error(error.message);
      return;
    }

    if (result.error) {
      setIsLoading(false);
      toast.error("Payment failed!!!", { duration: 2000 });
      console.error(result.error.message);
      return;
    }

    setIsLoading(false);
    console.log("Payment successful!");
    toast.success("Payment successful!!!", { duration: 2000 });
  };

  const savePaymentInfo = async (customerId) => {
    const requestObj = {
      guestName: `${personalInfo.firstName} ${personalInfo.lastName}`,
      guestEmail: personalInfo.email,
      guestPhone: personalInfo.phone,
      listingId: 169541,
      checkInDate: "2024-08-04",
      checkOutDate: "2024-08-05",
      guests: 2,
      paymentIntentId: paymentIntentId,
      customerId,
      paymentMethod: selectedPaymentMethod,
      amount: "27000",
      currency: "usd",
      paymentStatus: "initiated",
    };
    const response = await axios.post(
      `${baseUrl}/payment/savepaymentinfo`,
      requestObj
    );
    if (response.status !== 201) {
      console.error(`Failed to save payment info`);
      toast.error("Failed to save payment info!!!", { duration: 2000 });
    }
    return response.data;
  };

  return (
    <>
      <div className="font-inter text-[#333333] space-y-8">
        <h1 className="font-medium tracking-tight text-lg">Payment Method</h1>
        <div className='flex flex-col space-y-2'>
          <PaymentElement onChange={handlePaymentElementChange} />
          <p className="text-xs font-normal tracking-[-0.12px] leading-6 text-[#333]">
            By providing your card information, you allow AvantStay, Inc. to
            charge your card for future payments in accordance with their terms.
          </p>
        </div>
      </div>

      <div className="min-w-full h-px bg-[#E0E0E0] px-4"></div>
      <BillingAddress />

      <div className="hidden md:block pt-10 pb-10">
        <button
          className="py-3 px-7 bg-[#333333] text-white rounded-[14px] "
          onClick={() => handleSubmit()}
        >
          Confirm and pay
        </button>
      </div>
    </>
  );
};

export default PaymentMethod;
