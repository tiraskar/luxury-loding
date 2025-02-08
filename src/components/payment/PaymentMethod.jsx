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
import { formateDate } from "../../helper/date";
import { Link } from "react-router-dom";
import { FaHouseChimneyWindow } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
  const [isAgreeTerms, setIsAgreeTerms] = useState(false);
  const [isShowHouseRule, setIsShowHouseRule] = useState(false);

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

  const guestNumber = localStorage?.getItem('guests');
  const bookingCheckIn = localStorage?.getItem('checkIn');
  const bookingCheckOut = localStorage?.getItem('checkOut');
  const { listingInfo } = useSelector(state => state.listing);
  useEffect(() => {
    if (confirmPayment) {
      paymentConfirmation();
    }
  }, [confirmPayment]);

  useEffect(() => {
    if (customerId !== "") {
      dispatch(savePaymentInfo({
        customerId: customerId,
        guests: Number(guestNumber),
        checkIn: formateDate(new Date(bookingCheckIn)),
        checkOut: formateDate(new Date(bookingCheckOut)),
      }));
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
    <form onSubmit={handleSubmit(onSubmit)}
      className="space-y-[35px]">
      {isPaymentConfirmationLoading && <LoaderScreen />}
     
      <PersonalInfoForm register={register} setValue={setValue} errors={errors} />
      <div className="min-w-full h-px bg-[#E0E0E0] px-4"></div>
      <div className="font-inter text-[#333333] space-y-[31px]">
        <h1 className="font-medium tracking-tight text-lg h-[13px]">Payment method</h1>
        <div className='flex flex-col space-y-[14px]'>
          <PaymentElement onChange={handlePaymentElementChange} id="payment" />
          {paymentType == 'card' && <p className="text-xs font-normal tracking-[-0.12px] leading-6 text-[#333]">
            By providing your card information, you allow Luxury Lodging, Inc. to
            charge your card for future payments in accordance with their terms.
          </p>}
        </div>
      </div>

      <div className="min-w-full h-px bg-[#E0E0E0] px-4"></div>
      <BillingAddress register={register} errors={errors} />

      <div className="min-w-full h-px bg-[#E0E0E0] px-4"></div>
      {listingInfo?.houseRules && <div className="flex gap-3">
        <div className="lg:max-w-[318px] flex  rounded-2xl space-x-3 ">
          <div className="flex flex-row items-center justify-center h-[42px] w-[42px] rounded-xl bg-[#F5F5EF]">
            <FaHouseChimneyWindow
              onClick={() => setIsShowHouseRule(!isShowHouseRule)}
              size={22} color="black"
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full space-y-[6px]">
          <div
            onClick={() => setIsShowHouseRule(!isShowHouseRule)}
            className=" flex justify-between items-center text-sm font-semibold tracking-[-1%] mt-3 cursor-pointer w-full"
          >
            <p className="flex-grow">House rule</p>
            {
              isShowHouseRule ? (
                <IoIosArrowUp size={18} className="text-gray-600" />
              ) : (
                <IoIosArrowDown size={18} className="text-gray-600" />
              )}

          </div>

          {
            isShowHouseRule &&
            <p className="text-xs leading-5 -ml-10">
              {listingInfo?.houseRules?.split("✔️").map((rule, index) => (
                <span key={index} className="py-4">
                  {index !== 0 && "✔️"} {rule}
                  <br />
                </span>
              ))}
            </p>
          }
        </div>
      </div>}
      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          value={isAgreeTerms}
          onClick={() => setIsAgreeTerms(!isAgreeTerms)}
          className="mt-1.5" />
        <p className="  lg:relative text-xs leading-6 ">
          By clicking the button below, I agree to Luxury {`Lodging's`}{" "}
          terms & conditions, guest agreement and cancellation policy, I
          am aware that I must be at least 21 to book this stay. I agree
          to pay the total amount shown, which includes service fees.{" "}
          <Link to="/contact" className="underline">
            Contact us &nbsp;
          </Link>
          if you have any questions!
        </p>
      </div>

      <div className=" relative pt-10 pb-10">
        <button
          type="submit"
          disabled={!isAgreeTerms}
          className="flex  items-center py-3 px-7 bg-[#333333] text-white rounded-[14px] w-[161px] h-[40px] text-[13px] font-semibold"
        >
          Confirm and pay
        </button>
      </div>
    </form>
  );
};

export default PaymentMethod;
