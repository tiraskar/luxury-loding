import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram, FaYoutube } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import { LuPhone } from "react-icons/lu";
import Wrapper from "./Wrapper";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { emailSubscription, } from "../../redux/slices/contactSlice";
import { useEffect } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

const Footer = () => {
  const { pathname } = useLocation();

  const footerContentMapping = {
    '/': {
      logo: "Luxury Lodging",
      email: "support@luxurylodgingpm.com",
      contact: "(813) 531-8988"
    },
    '/default': {
      logo: "Luxury Lodging",
      email: "support@luxurylodgingpm.com",
      contact: "(813) 531-8988"
    }
  };

  const footerContent = footerContentMapping[pathname] || footerContentMapping['/default'];

  return (
    <Wrapper>
      <div className="  flex flex-wrap gap-20 lg:gap-0 lg:justify-between font-onest    mt-[5rem] sm:mt-[7rem] lg:mt-[8rem] xl:mt-[9.375rem] ">
        <div className="space-y-9 md:space-y-12 lg:space-y-16">
          <div className="flex flex-col space-y-1">
            <Logo logoText={`${footerContent.logo}`} />
            <a
              href="https://www.instagram.com/luxurylodgingstr/"
              target="_blank"
              className="flex flex-row items-center text-sm font-semibold text-black opacity-50 hover:text-[#F43F5E] transition-colors duration-300"
            >
              <FaSquareInstagram className="text-2xl pr-2 hover:scale-110 transform transition-all duration-200" />
              <span>@LuxuryLodgingstr</span>
            </a>

            {/* <p className="text-sm font-inter tracking-tight text-[#939387] py-2">Discover the soul of the southestwest</p> */}
          </div>
          <div className="flex flex-col font-inter text-sm space-y-4">
            <a href={`tel:${footerContent.contact}`} className="flex items-center gap-4"><LuPhone size={20} />
              {footerContent.contact}</a>
            <a href={`mailto:${footerContent.email}`} className="flex  items-center gap-4"><FiMail size={20} /> {
              footerContent.email
            }</a>
          </div>
        </div>
        <div className="flex flex-col  space-y-4 md:space-y-[17px]">
          <h1 className="text-textLight font-inter font-medium">Main</h1>
          <ul className="flex flex-col space-y-[14px] text-sm">
            <Link to='#'>About Us</Link>
            <Link to='/'>Home</Link>
            <Link to='/listings'>Listing</Link>
          </ul>
        </div>
        <div className="flex flex-col space-y-4 md:space-y-[17px]">
          <h1 className="text-textLight font-inter font-medium">Manual</h1>
          <ul className="space-y-[14px] text-sm flex-col">
            <Link to={`/blog/guidebook/`}>Guidebook</Link>
            <li>
              <Link to="https://luxurylodgingpm.com" target="_blank">Management</Link>
            </li>
          </ul>
        </div>
        <EmailSubscription />
      </div>

      <div className="min-w-full h-px bg-[#E0E0E0] my-[22px] px-4"></div>

      <div className="flex flex-col md:flex-row lg:gap-10 md:gap-0 md:justify-between text-textLight text-sm items-center pb-[40px] lg:pb-[60px] px-4 xl:px-0">
        <p className="order-2 md:order-1 my-4 md:my-0">@ 2024 Direct Booking Luxury Lodging</p>
        <div className="order-1 md:order-2 flex flex-wrap gap-[22px] md:gap-[30px] lg:gap-[38px]">
          <p>Privacy and policy</p>
          <p>Terms and conditions</p>

          <div className="hidden md:flex gap-4 md:gap-6 text-black text-2xl ">
            <FaLinkedin />
            <a href="https://www.instagram.com/luxurylodgingstr/" target="_blank">
              <FaSquareInstagram className="cursor-pointer" />
            </a>
            <FaYoutube />
          </div>
        </div>
        <div className="flex justify-center md:hidden gap-4  order-3 text-black text-2xl ">
          <FaLinkedin />
          <a href="https://www.instagram.com/luxurylodgingstr/" target="_blank">
            <FaSquareInstagram className="cursor-pointer" />
          </a>
          <FaYoutube />
        </div>
      </div>
    </Wrapper>
  );
};

export default Footer;

const EmailSubscription = () => {

  const { isEmailSent, isEmailSubscriptionLoading } = useSelector(state => state.contact);

  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      email: ''
    }
  });


  const onSubmit = (data) => {
    dispatch(emailSubscription(data.email));
  };

  useEffect(() => {
    isEmailSent && setValue('email', '');
  }, [isEmailSent]);


  return (
    <div className="flex flex-col space-y-[14px]">
      <h1 className="text-textLight font-inter font-medium">Subscribe</h1>
      {/* <p className="text-xs">Enter your email to get notified about our updates!</p> */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-4 items-center">
        <div className="">
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            className="default-input bg-cardBackgroundLight p-2"
            placeholder="Enter your email"
          />
        </div>
        <button type="submit" className="px-5 py-2 rounded-xl text-white bg-black h-fit">
          {isEmailSubscriptionLoading ? <LoadingSpinner /> : "Send"}
        </button>
      </form>
    </div>
  );
};
