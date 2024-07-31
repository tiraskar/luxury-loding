import Wrapper from "../../../components/Wrapper";
import { GoDotFill } from "react-icons/go";
import { FaAsterisk } from "react-icons/fa";
const ContactUsForm = () => {

  return (
    <Wrapper>
      <div className="text-[#333333] font-onest tracking-tight flex flex-col justify-start gap-y-[56px]">

        <p className="flex items-center text-xs text-[#A1A196] gap-1">
          Home <GoDotFill />
          <span className="text-black">Contact Us</span>
        </p>

        <h1 className="text-[35px] font-semibold">Contact Us</h1>

        <div
          className="relative grid lg:grid-cols-2 lg:justify-between  bg-cardBackgroundLight rounded-xl md:rounded-2xl p-2 md:p-5 gap-4 lg:min-h-[697px]"
        >
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-y-8 mt-8 sm:mt-12 lg:mt-16">
              <div className="flex flex-col gap-y-3 max-w-[389px]">
                <h1 className=" text-3xl xxs:text-[2rem] sm:text-4xl md:text-[38px]">Say Hello!</h1>
                <p className="text-xs leading-[22px] text-[#8E8E80]">Whether you have questions about our services or need assistance with your property, we’re here to help. Fill out the contact form below, and a member of our team will get back to you.</p>
              </div>
              <div className="flex flex-col gap-y-8 text-xl sm:text-2xl font-inter">
                <p>info@directbooking.com</p>
                <p>(+1) 8111-874-512</p>
              </div>
            </div>
            <div className="flex flex-col gap-y-4 sm:gap-y-6 max-w-[501px]">
              <h1 className="font-medium font-inter tracking-[-1%] text-2xl sm:text-[28px]">
                Co-hosting services</h1>
              <p className=" text-xs sm:text-[13px] leading-5 sm:leading-[22px] text-[#8E8E80]">
                Looking for a trustworthy co-host to elevate your
                vacation rental? We specialize in bespoke,
                full-service co-hosting, managing everything
                from marketing and pricing optimization to guest
                interactions and property maintenance.
                Trust us to be stewards of your property,
                ensuring your investment is well cared for
                and consistently profitable. Enjoy the benefits
                of vacation rental ownership without the hassle,
                knowing your property is in expert hands.
              </p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end ">
            <form action="" className="bg-white flex-col px-3 py-6 sm:py-8 sm:px-8 font-inter text-sm text-black space-y-2 rounded-2xl sm:rounded-3xl tracking-normal min-w-full lg:min-w-[450px] xl:min-w-[495px] ">
              <div className="flex flex-col gap-y-2">
                <label htmlFor="full-name" className="flex">Full Name
                  <FaAsterisk color="#DE2424" size={8} className="mt-1" /></label>
                <input
                  name="full-name"
                  type="text"
                  placeholder="Enter full name"
                  className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
              </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="email" className="flex">Your email<FaAsterisk color="#DE2424" size={8} className="mt-1" /></label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
              </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="phone-number" className="flex">Phone number<FaAsterisk color="#DE2424" size={8} className="mt-1" /></label>
                <input
                  name="phone-number"
                  type="text"
                  inputMode="numeric"
                  pattern="\d*" 
                  placeholder="Enter phone number"
                  className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
              </div>
              <div className="py-1">
                <textarea
                  className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl w-full"
                  name="message"
                  rows={6}
                  placeholder="How can we help you?"
                />
              </div>

              <button className="text-white bg-black w-full text-center py-5 font-inter font-semibold text-[1rem] rounded-[1rem] ">Submit</button>
              <div className="flex justify-center">
                <p className="text-xs text-[#A1A196] mt-4 text-center leading-6 max-w-[335px]">
                  By contacting us, you agree to our Terms of services and Privacy Policy
                </p>
              </div>
            </form>
          </div>
        </div>

      </div>
    </Wrapper>
  );
};

export default ContactUsForm;