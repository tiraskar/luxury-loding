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

const Footer = () => {
  const { pathname } = useLocation();

  // const footerContent = {
  //   logo: pathname == "/" ? "Luxury Lodging" : "Direct Booking",
  //   email: pathname == "/" ? "receipts@luxurylodgingstr.co" : "brindy@bybrindy.com",
  //   contact: pathname == "/" ? "+1 (813) 295-7602" : "+15204013299"
  // }
  const footerContentMapping = {
    '/': {
      logo: "Luxury Lodging",
      email: "receipts@luxurylodgingstr.com",
      contact: "+1 (813) 295-7602"
    },
    '/default': {
      logo: "Direct Booking",
      email: "brindy@bybrindy.com",
      contact: "+15204013299"
    }
  };

  const footerContent = footerContentMapping[pathname] || footerContentMapping['/default'];

  return (
    <Wrapper>
      <div className="  flex flex-wrap gap-20 lg:gap-0 lg:justify-between font-onest mt-[9.375rem] ">
        <div className="space-y-16">
          <div>
            <Logo logoText={`${footerContent.logo}`} />
            <p className="text-sm font-inter tracking-tight text-[#939387] py-2">Discover the soul of the southestwest</p>
          </div>
          <div className="flex flex-col font-inter text-sm space-y-4">
            <a href={`tel:${footerContent.contact}`} className="flex items-center gap-4"><LuPhone size={20} />
              {footerContent.contact}</a>
            <a href={`mailto:${footerContent.email}`} className="flex  items-center gap-4"><FiMail size={20} /> {
              footerContent.email
            }</a>
          </div>
        </div>
        <div className="flex flex-col space-y-[17px]">
          <h1 className="text-textLight font-inter font-medium">Main</h1>
          <ul className="flex flex-col space-y-[14px] text-sm">
            <Link to='#'>About Us</Link>
            <Link to='/'>Home</Link>
            <Link to='/listings'>Listing</Link>
          </ul>
        </div>
        <div className="flex flex-col space-y-[17px]">
          <h1 className="text-textLight font-inter font-medium">Manual</h1>
          <ul className="space-y-[14px] text-sm">
            <Link to={`/blog/guidebook/`}>Guidebook</Link>
            <li>Management</li>
          </ul>
        </div>
        <EmailSubscription />
      </div>

      <div className="min-w-full h-px bg-[#E0E0E0] my-[22px] px-4"></div>

      <div className="flex flex-col md:flex-row gap-10 md:gap-0 md:justify-between text-textLight text-sm items-center pb-[60px] px-4 xl:px-0">
        <p className="order-2 md:order-1">@ 2024 Direct Booking</p>
        <div className="order-1 md:order-2 flex flex-wrap gap-[38px]">
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

const EmailSubscription = () => {

  const { isEmailSent } = useSelector(state => state.contact);

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
      <p className="text-xs">Enter your email to get notified about our updates!</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-4 items-center">
        <div className="">
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            className="default-input bg-cardBackgroundLight p-2"
          />
        </div>
        <button type="submit" className="px-5 py-2 rounded-xl text-white bg-black h-fit">Send</button>
      </form>
    </div>
  );
};
