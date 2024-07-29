import Booking from "./Booking";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { TiTick } from "react-icons/ti";
import PersonalInfoForm from "./PersonalInfoForm";
import PaymentMethod from "./PaymentMethod";
import BillingAddress from "./BillingAddress";

const BookingConfirmation = () => {
  return (
    <div className="flex flex-col justify-center max-w-[1440px]">
      <div className="flex justify-between font-inter">
        <div className=" flex justify-center w-full">
          <div className=" max-w-[652px] space-y-10">
            <p className="flex items-center text-xs text-[#A1A196] gap-1 font-medium">
              Home <GoDotFill /> Listing <GoDotFill className="text-black" />
              <span className="text-black">Booking</span>
            </p>

            <div className="flex  justify-between items-center min-w-[652px]">
              <div className="">
                <div className="flex items-center space-x-2">
                  <MdKeyboardArrowLeft size={24} />
                  <h1 className="text-xl font-onest tracking-tight font-semibold">Things to remember</h1>
                </div>
              </div>
              <div className="flex  items-center gap-4">
                <div className="flex items-center space-x-2">
                  <div className="flex justify-center items-center w-6 h-6 text-xs bg-[#4AC72B] text-white rounded-full">
                    <TiTick className="text-white" />
                  </div>
                  <h1>Remember</h1>
                </div>
                <div className="w-full h-px bg-black px-4 "></div>
                <div className="flex items-center space-x-2 ">
                  <p className="flex justify-center items-center w-6 h-6 text-xs bg-black text-white rounded-full">2</p>
                  <h1>Payment</h1>
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
            <div className="pt-16">
              <button className="py-3 px-7 bg-[#333333] text-white rounded-[14px] ">Confirm and pay</button>
            </div>
          </div>

        </div>
        <div className="">

          <Booking />
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;