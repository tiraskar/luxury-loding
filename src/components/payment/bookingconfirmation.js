import { MdKeyboardArrowLeft } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { TiTick } from "react-icons/ti";
import { Wrapper } from "../components";
import PaymentMethod from "../components/payment/PaymentMethod";
import PersonalInfoForm from "../components/payment/PersonalInfoForm";
import { useEffect } from "react";
// import LoaderScreen from "../components/ui/LoaderScreen";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryList } from "../redux/slices/listingSlice";
import { useNavigate, useParams } from "react-router-dom";
import { createCustomer, createPaymentIntent, fetchStripPromiseKey, savePaymentInfo } from "../redux/slices/paymentSlice";
import BillingAddress from "../components/payment/BillingAddress";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { stripePromise } from "../lib/stripe";
import toast from "react-hot-toast";



const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const { clientSecret, personalInfo, paymentType, billingInfo,
    customerId
  } = useSelector(state => state.payment);

  const { bookingPrice } = useSelector(state => state.booking);

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


  useEffect(() => {
    dispatch(fetchStripPromiseKey());
    dispatch(fetchCountryList());
  }, [dispatch]);

  useEffect(() => {
    if (id && bookingPrice?.totalPrice) {
      dispatch(createPaymentIntent({
        id,
        amount: bookingPrice.totalPrice,
      }));
    }
  }, [id, bookingPrice.totalPrice]);

  useEffect(() => {
    if (customerId !== '') {
      dispatch(savePaymentInfo(customerId));
    }
  }, [customerId]);


  return (

    <div className="md:col-span-5 font-inter tracking-[-1%]">
      <Wrapper>
        <div className=" flex flex-col mx-auto  max-w-[652px]">
          <div className="flex flex-col justify-start lg:-ml-4">

            <div className="space-y-16">
              <p className="flex items-center text-xs text-[#A1A196] gap-1">
                Home <GoDotFill /> Listing <GoDotFill className="text-black" />
                <span className="text-black">Booking</span>
              </p>

              <div className="flex flex-col lg:flex-row justify-between  xl:min-w-[652px] gap-4">
                <div className="flex items-center ">
                  <MdKeyboardArrowLeft size={24} onClick={() => navigate(-1)} className="cursor-pointer" />
                  <h1 className="text-xl font-onest tracking-tight font-semibold">
                    Confirm and Pay
                  </h1>
                </div>
                <div className="flex  items-center gap-4 ">
                  <div className="flex items-center space-x-2">
                    <div className="flex justify-center items-center w-6 h-6 text-xs bg-[#4AC72B] text-white rounded-full">
                      <TiTick className="text-white" />
                    </div>
                    <h1>Remember</h1>
                  </div>
                  <div className="w-full h-px bg-textDark px-4 "></div>
                  <div className="flex items-center space-x-2 ">
                    <p className="flex justify-center items-center w-6 h-6 text-xs bg-black text-white rounded-full">
                      2
                    </p>
                    <h1>Payment</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-full h-px bg-[#E0E0E0] my-[22px] px-4"></div>
            <div className="flex flex-col gap-y-10">
              <PersonalInfoForm />
              <div className="min-w-full h-px bg-[#E0E0E0] px-4"></div>
              {clientSecret &&
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <PaymentMethod />
                </Elements>
              }

              <div className="min-w-full h-px bg-[#E0E0E0] my-[22px] px-4"></div>
              <BillingAddress />
              <div className="absolute bottom-0  md:relative ">
                <button
                  onClick={() => {
                    handleSubmitPayment();
                  }}
                  className="py-3 px-7 bg-[#333333] text-white rounded-[14px]"
                >
                  Confirm and pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
    //  </Elements>
  );
};

export default BookingConfirmation;