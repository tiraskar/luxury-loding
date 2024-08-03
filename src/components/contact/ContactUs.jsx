
import { GoDotFill } from "react-icons/go";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import Wrapper from "../common/Wrapper";


const ContactUs = () => {


  return (
    <Wrapper>
      <div className="text-[#333333] font-onest tracking-tight flex flex-col justify-start gap-y-[56px]">

        <p className="flex items-center text-xs text-[#A1A196] gap-1">
          Home <GoDotFill />
          <span className="text-black">Contact Us</span>
        </p>

        <h1 className="text-[35px] font-semibold">Contact Us</h1>

        <div
          className="relative grid lg:grid-cols-2 lg:justify-between  bg-cardBackgroundLight rounded-xl md:rounded-2xl p-2 xs:p-3 sm:p-4 md:p-5 gap-4 lg:min-h-[697px]"
        >
          <ContactInfo />
          <ContactForm />
        </div>

      </div>
    </Wrapper>
  );
};

export default ContactUs;