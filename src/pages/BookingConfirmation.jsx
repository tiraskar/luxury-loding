import { MdKeyboardArrowLeft } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { TiTick } from "react-icons/ti";
// import { Wrapper } from "../components";
import PaymentMethod from "../components/payment/PaymentMethod";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import LoaderScreen from "../components/ui/LoaderScreen";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryList } from "../redux/slices/listingSlice";
import { appearance } from "../lib/stripe";
import { useNavigate } from "react-router-dom";
import { Booking } from "../components";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const BookingConfirmation = () => {
  // const { id } = useParams()
  const dispatch = useDispatch();
  const { clientSecret, loading } = useSelector((state) => state.payment);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCountryList());
  }, [dispatch]);

  // useEffect(() => {
  //   const agreeTerms = localStorage?.getItem('agreeTerms');

  //   if (agreeTerms == 'false' || "") {
  //     navigate(`/listings/${id}`);
  //   }
  // }, [])

  return (
    <div className="lg:col-span-5 font-inter tracking-[-1%] bg-white">
      {loading && <LoaderScreen />}
      <>
        <div className=" flex flex-col  lg:max-w-[652px]">
          <div className="flex flex-col justify-start ">
            <div className="space-y-[59px]">
              <p className="flex items-center text-sm font-medium h-[17px] text-[#A1A196] gap-1">
                Home <GoDotFill className="h-2" /> Listings <GoDotFill className="h-2 text-black" />
                <span className="text-black">Booking</span>
              </p>

              <div className="flex flex-col lg:flex-row justify-between  xl:min-w-[652px] gap-4 pb-[26px] ">
                <div className="flex items-center space-x-2 h-[26px]">
                  <MdKeyboardArrowLeft size={24} onClick={() => navigate(-1)} className="cursor-pointer" />
                  <h1 className="text-xl font-onest tracking-tight font-semibold">
                    Confirm and Pay
                  </h1>
                </div>
                <div className="flex  items-center gap-4 h-[24px]">
                  <div className="flex items-center space-x-2">
                    <div className="flex justify-center items-center w-6 h-6  bg-[#4AC72B] text-white rounded-full">
                      <TiTick className="text-white" />
                    </div>
                    <h1 className="text-[13px] h-[1rem]">Remember</h1>
                  </div>
                  <div className="w-full h-px bg-textDark px-8 "></div>
                  <div className="flex items-center space-x-2 ">
                    <p className="flex justify-center items-center w-6 h-6 text-xs bg-black text-white rounded-full">
                      2
                    </p>
                    <h1 className="text-[13px] h-[1rem]">Payment</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="block lg:hidden space-y-6 pb-10">
              <div className="w-full h-px bg-textDark  bg-opacity-20 px-8 "></div>
              <Booking />
            </div>



            {/* {clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{ clientSecret, appearance }}
              > */}
                <PaymentMethod />
            {/* </Elements>
            )} */}
          </div>
        </div>
      </>
    </div>
  );
};

export default BookingConfirmation;
