import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import BillingAddress from "./BillingAddress";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createCustomer, handlePaymentType, savePaymentInfo } from "../../redux/slices/paymentSlice";
import PersonalInfoForm from "./PersonalInfoForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoaderScreen from "../ui/LoaderScreen";

const schema = yup.object({
  personalInfo: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.number().required(),
    countryCode: yup.string().required().default('us'),
    countryDialCode: yup.string().required()
  }),
  billingInfo: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    line1: yup.string().required(),
    postalCode: yup.string().required(),
    country: yup.string().required().default('US')
  })
})

const PaymentMethod = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      personalInfo: {
        countryCode: 'US',
        countryDialCode: '+1'
      },
      billingInfo: {
        country: 'US'
      }
    },
    resolver: yupResolver(schema)
  });
  const [isPaymentConfirmationLoading, setIsPaymentConfirmationLoading] = useState(false)
  const [isPaymentElementComplete, setIsPaymentElementComplete] = useState(false)
  const stripe = useStripe();
  const elements = useElements();


  const dispatch = useDispatch();

  const { billingInfo, customerId, clientSecret, confirmPayment, paymentType } = useSelector(state => state.payment);


  const handlePaymentElementChange = (event) => {
    setIsPaymentElementComplete(event.complete);
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
    setIsPaymentConfirmationLoading(true)
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    if (!elements.getElement(PaymentElement)) {
      toast.error("Please select a payment method");
      return;
    }

    const baseUrl = `${window.location.origin}${import.meta.env?.BASE_URL}`;
    let result;
    try {
      result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${baseUrl}success`,
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
    } finally {
      setIsPaymentConfirmationLoading(false)
    }

    if (result.error) {
      toast.error("Payment failed!!!", { duration: 2000 });
      return;
    }
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


  const onSubmit = async () => {

    if (!isPaymentElementComplete) {
      const paymentElement = document.getElementById('payment');
      if (paymentElement) {
        paymentElement.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (!stripe || !elements || !clientSecret) {
      toast.error("Payment has not been loaded. Please refresh the page.", {
        duration: 2000
      });
    }
    if (!paymentType) {
      return toast.error("Please select a payment method.");
    }

    dispatch(createCustomer());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-[35px]">
      {isPaymentConfirmationLoading && <LoaderScreen />}
      <div className="min-w-full h-px bg-[#E0E0E0] px-4"></div>
      <PersonalInfoForm register={register} setValue={setValue} errors={errors} />
      <div className="min-w-full h-px bg-[#E0E0E0] px-4"></div>
      <div className="font-inter text-[#333333] space-y-[31px]">
        <h1 className="font-medium tracking-tight text-lg h-[13px]">Payment method</h1>
        <div className='flex flex-col space-y-[14px]'>
          <PaymentElement onChange={handlePaymentElementChange} id="payment" />
          {paymentType == 'card' && <p className="text-xs font-normal tracking-[-0.12px] leading-6 text-[#333]">
            By providing your card information, you allow AvantStay, Inc. to
            charge your card for future payments in accordance with their terms.
          </p>}
        </div>
      </div>

      <div className="min-w-full h-px bg-[#E0E0E0] px-4"></div>
      <BillingAddress register={register} errors={errors} />

      <div className="absolute bottom-0 lg:relative lg:pt-10 lg:pb-10">
        <button
          type="submit"
          className="flex  items-center py-3 px-7 bg-[#333333] text-white rounded-[14px] w-[161px] h-[40px] text-[13px] font-semibold"
        >
          Confirm and pay
        </button>
      </div>
    </form>
  );
};

export default PaymentMethod;
