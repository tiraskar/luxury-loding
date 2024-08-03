import Booking from "../components/booking/Booking";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { TiTick } from "react-icons/ti";
import { Wrapper } from "../components";
import BillingAddress from "../components/payment/BillingAddress";
import PaymentMethod from "../components/payment/PaymentMethod";
import PersonalInfoForm from "../components/payment/PersonalInfoForm";

const BookingConfirmation = () => {
  return (
    <div className="flex flex-wrap md:grid md:grid-cols-9 min-h-screen">
      <div className="col-span-5 font-inter tracking-[-1%]">
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
                <PaymentMethod />
                <div className="min-w-full h-px bg-[#E0E0E0] px-4"></div>
                <BillingAddress />
              </div>
              <div className="hidden md:block pt-10 pb-10">
                <button className="py-3 px-7 bg-[#333333] text-white rounded-[14px] ">Confirm and pay</button>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      <div className="col-span-4 bg-[#F9F9F9] w-full ">
        <Wrapper>
          <div className="flex mx-auto max-w-[541px] py-20">
            <Booking />
          </div>
          <div className="block md:hidden pt-10 pb-10 md:pt-64">
            <button className="py-3 px-7 bg-[#333333] text-white rounded-[14px] ">
              Confirm and Pay
            </button>
          </div>
        </Wrapper>
      </div>

    </div>
  );
};

export default BookingConfirmation;