import { MdKeyboardArrowLeft } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { TiTick } from "react-icons/ti";
import { Wrapper } from "../components";
import PaymentMethod from "../components/payment/PaymentMethod";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import LoaderScreen from "../components/ui/LoaderScreen";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryList } from "../redux/slices/listingSlice";
import { appearance } from "../lib/stripe";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51OsSKpGurTGjjGfhdLcO3WBZDR1UkYvvDWBUFFRnqQU2pSAThq4xfLVHLz11h94g2i4jONlHecSXhcxwkbJNz4a300y43aO1nM"
);

const BookingConfirmation = () => {
  const dispatch = useDispatch();
  const { clientSecret, loading } = useSelector((state) => state.payment);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCountryList());
  }, [dispatch]);

  return (
    <div className="lg:col-span-5 font-inter tracking-[-1%]">
      {loading && <LoaderScreen />}
      <Wrapper>
        <div className=" flex flex-col mx-auto  lg:max-w-[652px]">
          <div className="flex flex-col justify-start ">
            <div className="space-y-16">
              <p className="flex items-center text-xs text-[#A1A196] gap-1">
                Home <GoDotFill /> Listing <GoDotFill className="text-black" />
                <span className="text-black">Booking</span>
              </p>

              <div className="flex flex-col lg:flex-row justify-between  xl:min-w-[652px] gap-4 pb-7">
                <div className="flex items-center ">
                  <MdKeyboardArrowLeft size={24} onClick={() => navigate(-1)} />
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

            {clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{ clientSecret, appearance }}
              >
                <PaymentMethod />
              </Elements>
            )}
            {/* </div> */}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default BookingConfirmation;
