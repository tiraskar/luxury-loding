import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect } from "react";
import BillingAddress from "./BillingAddress";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createCustomer, handlePaymentType, savePaymentInfo } from "../../redux/slices/paymentSlice";
import PersonalInfoForm from "./PersonalInfoForm";

const PaymentMethod = () => {
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();

  const { billingInfo, personalInfo, customerId, clientSecret, confirmPayment, paymentType } = useSelector(state => state.payment);

  const handlePaymentElementChange = (event) => {
    dispatch(handlePaymentType(event.value.type));
  };

  useEffect(() => {
    if (elements) {
      const paymentElement = elements.getElement(PaymentElement);
      if (paymentElement) {
        paymentElement.on("change", handlePaymentElementChange);
      }
    }
  }, [elements]);

  const paymentConfirmation = async () => {

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    if (!elements.getElement(PaymentElement)) {
      toast.error("Please select a payment method");
      return;
    }

    let result;
    try {
      result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `https://luxury-loding.vercel.app/success`,
          shipping: {
            name: `${billingInfo.firstName} ${billingInfo.lastName}`,
            address: {
              line1: billingInfo.line1,
              line2: billingInfo.line2,
              city: billingInfo.city,
              state: billingInfo.state,
              postal_code: billingInfo.postalCode,
              country: billingInfo.country,
            },
          },
        },
      });
    } catch (error) {
      toast.error("Payment failed!!!", { duration: 2000 });
      return;
    }

    if (result.error) {
      toast.error("Payment failed!!!", { duration: 2000 });
      return;
    }

    console.log("Payment successful!");
    toast.success("Payment successful!!!", { duration: 2000 });
  };

  useEffect(() => {
    if (confirmPayment) {
      paymentConfirmation();
    }
  }, [confirmPayment]);

  useEffect(() => {
    if (customerId !== "") {
      dispatch(savePaymentInfo(customerId));
    }
  }, [customerId]);


  const handleSubmitPayment = async () => {
    toast.dismiss();
    if (!stripe || !elements || !clientSecret) {
      toast.error("Payment has not been loaded. Please refresh the page.", {
        duration: 2000
      });
    }
    if (!personalInfo.firstName) return toast.error("Please provide first name.");
    if (!personalInfo.lastName) return toast.error("Please provide last name.");
    if (!personalInfo.email) return toast.error("Please provide email.");
    if (!personalInfo.phone) return toast.error("Please provide phone number.");

    if (!paymentType) {
      return toast.error("Please select a payment method.");
    }

    if (!billingInfo.firstName) return toast.error("Please provide billing first name.");
    if (!billingInfo.lastName) return toast.error("Please provide billing last name.");
    if (!billingInfo.city) return toast.error("Please provide city.");
    if (!billingInfo.state) return toast.error("Please provide state.");
    if (!billingInfo.line1) return toast.error("Please provide billing address.");
    if (!billingInfo.postalCode) return toast.error("Please provide postal code.");

    dispatch(createCustomer());

  };


  return (
    <div className="space-y-10">
      <div className="min-w-full h-px bg-[#E0E0E0] px-4"></div>
      <PersonalInfoForm />
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

      <div className="absolute bottom-0 md:relative pt-20 md:pb-10">
        <button
          className="py-3 px-7 bg-[#333333] text-white rounded-[14px] "
          onClick={() => handleSubmitPayment()}
        >
          Confirm and pay
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
