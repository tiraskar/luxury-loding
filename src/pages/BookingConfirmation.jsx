import Booking from "../components/booking/Booking";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { TiTick } from "react-icons/ti";
import { Wrapper } from "../components";
import PaymentMethod from "../components/payment/PaymentMethod";
import PersonalInfoForm from "../components/payment/PersonalInfoForm";
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from "react";
import { baseUrl } from "../config/baseurl";
import toast from "react-hot-toast";
import LoaderScreen from "../components/ui/LoaderScreen";
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryList } from "../redux/slices/listingSlice";
import { appearance } from "../lib/stripe";
// import { createPaymentIntent } from "../redux/slices/paymentSlice.js";
const stripePromise = loadStripe('pk_test_51OsSKpGurTGjjGfhdLcO3WBZDR1UkYvvDWBUFFRnqQU2pSAThq4xfLVHLz11h94g2i4jONlHecSXhcxwkbJNz4a300y43aO1nM');


const BookingConfirmation = () => {

  const dispatch = useDispatch();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const createPaymentIntent = async () => {
    setIsLoading(true);
    const response = await fetch(`${baseUrl}/payment/createpaymentintent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "listingId": 169541,
        "checkIn": "2024-08-04",
        "checkOut": "2024-08-05",
        "guests": 2,
        "amount": "27000",
        "currency": "usd"
      }),
    });

    if (response.status !== 201) {
      setIsLoading(false);
      console.error(`Failed to create payment intent`);
      toast.error("Something went wrong!!!", { duration: 2000 });
    }

    const { clientSecret, paymentIntentId } = await response.json();
    setClientSecret(clientSecret);
    setPaymentIntentId(paymentIntentId);
    setIsLoading(false);
  };

  useEffect(() => {
    createPaymentIntent();
    // dispatch(createPaymentIntent());
    dispatch(fetchCountryList());
  }, [dispatch])

  return (
    <div className=" lg:grid lg:grid-cols-9">
      {isLoading && <LoaderScreen />}
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
                    <MdKeyboardArrowLeft size={24} />
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
                {clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                    <PaymentMethod
                        selectedPaymentMethod={selectedPaymentMethod}
                        clientSecret={clientSecret}
                      paymentIntentId={paymentIntentId}
                        setSelectedPaymentMethod={setSelectedPaymentMethod}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                      />
                    </Elements>
                  )
                }
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      <div className="lg:col-span-4 bg-[#F9F9F9] w-full lg:-mt-10">
        <Wrapper>
          <div className="flex flex-col lg:mx-auto max-w-[541px] py-20">
            <Booking />
            <div className="block lg:hidden pt-10 pb-10 lg:pt-64">
            <button className="py-3 px-7 bg-[#333333] text-white rounded-[14px] ">
              Confirm and Pay
            </button>
          </div>
          </div>
        </Wrapper>
      </div>

    </div>
  );
};

export default BookingConfirmation;