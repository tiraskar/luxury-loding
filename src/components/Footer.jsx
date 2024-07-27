import { Link } from "react-router-dom";
import Logo from "./Logo";
import Wrapper from "./Wrapper";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram, FaYoutube } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import { LuPhone } from "react-icons/lu";

const Footer = () => {
  return (
    <Wrapper>
      <div className="  flex flex-wrap gap-20 lg:gap-0 lg:justify-between font-onest mt-[150px] px-4 xl:px-0">
        <div className="space-y-16">
          <div>
            <Logo />
            <p className="text-sm font-inter tracking-tight text-[#939387] py-2">Discover the soul of the southestwest</p>
          </div>
          <div className="flex flex-col font-inter text-sm space-y-4">
            <p className="flex items-center gap-4"><LuPhone size={20} /> +1 (813) 295-7602</p>
            <p className="flex  items-center gap-4"><FiMail size={20} /> receipts@luxurylodgingstr.com</p>
          </div>
        </div>
        <div className="flex flex-col space-y-[17px]">
          <h1 className="text-textLight font-inter font-medium">Main</h1>
          <ul className="flex flex-col space-y-[14px] text-sm">
            <Link to='/about'>About Us</Link>
            <Link to='/'>Home</Link>
            <Link to='/listing'>Listing</Link>
          </ul>
        </div>
        <div className="flex flex-col space-y-[17px]">
          <h1 className="text-textLight font-inter font-medium">Manual</h1>
          <ul className="space-y-[14px] text-sm">
            <Link to='/home/blog-and-guidebook'>Guidebook</Link>
            <li>Management</li>
          </ul>
        </div>
        <div className="flex flex-col space-y-[14px]">
          <h1 className="text-textLight font-inter font-medium">Subscribe</h1>
          <p className="text-xs">Enter your email to get notified our updates!</p>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="">
              <input type="text" className="border-none bg-cardBackgroundLight p-2 rounded-xl" />
            </div>
            <button className="px-5 py-2 rounded-xl text-white bg-black h-fit">Send</button>
          </div>
        </div>
      </div>

      <div className="min-w-full h-px bg-[#E0E0E0] my-[22px] px-4"></div>

      <div className="flex flex-col md:flex-row gap-10 md:gap-0 md:justify-between text-textLight text-sm items-center pb-[60px] px-4 xl:px-0">
        <p className="order-2 md:order-1">@ 2024 Direct Booking</p>
        <div className="order-1 md:order-2 flex gap-[38px]">
          <p>Privacy and policy</p>
          <p>Terms and conditions</p>
          <div className="flex gap-6 text-black text-2xl">
            <FaLinkedin />
            <FaSquareInstagram />
            <FaYoutube />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Footer;