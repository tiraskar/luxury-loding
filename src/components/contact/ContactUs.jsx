import { GoDotFill } from "react-icons/go";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import Wrapper from "../common/Wrapper";

const ContactUs = () => {
  return (
    <Wrapper>
      <div className="text-[#333333] font-onest tracking-tight flex flex-col justify-start space-y-[76px] pt-7">
        <div className="space-y-5">
          <p className="flex items-center text-sm font-medium text-[#A1A196] gap-1">
            Home <GoDotFill className="h-2 font-medium text-black" />
            <span className="text-black">Contact us</span>
          </p>
          <h1 className="text-[35px] xxs:text-[40px] sm:text-[46px] md:text-[50px] lg:text-[58px] font-semibold h-[41px]">Contact us</h1>
        </div>

        <div className="relative grid lg:grid-cols-2 lg:justify-between  bg-cardBackgroundLight rounded-xl md:rounded-3xl p-2 xs:p-3 sm:p-4 md:p-7 lg:p-10 gap-4 lg:min-h-[697px]">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </Wrapper>
  );
};

export default ContactUs;
