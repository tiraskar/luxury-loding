import { Link, useLocation } from "react-router-dom";
import Wrapper from "./Wrapper";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import Logo from "./Logo";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const renderNavbar = navLinks?.map(({ href, label, target }) => {
    return (
      <Link
        key={href}
        to={href}
        target={target ? `${target}` : "_parent"}
        className={`text-[#222]  text-base font-onest leading-normal ${pathname === href ? 'opacity-100 font-medium' : 'font-normal opacity-40'}`}
      >
        {label}
      </Link>
    );
  });

  return (
    <div className="py-6 space-y-6 ">
      <Wrapper>
        <div className="flex flex-row justify-between items-center  font-onest h-[38px]">
          <Logo />

          {!isMobileNavOpen &&
            <RxHamburgerMenu
              onClick={() => setIsMobileNavOpen(true)}
              className="block md:hidden text-2xl" />}

          {isMobileNavOpen &&
            <RxCross2
              onClick={() => setIsMobileNavOpen(false)}
              className="block md:hidden text-2xl" />
          }
          <ul className="hidden md:flex  space-x-8">
            {renderNavbar}
          </ul>

          <div className="hidden md:inline-flex items-center gap-[24px]">
            <select
              className="bg-white focus:border-none text-[1rem]">
              <option className="">USD</option>
            </select>

            <Link to='/listings' className="flex p-[14px_20px] justify-center items-center gap-[10px] rounded-xl bg-[#222]">
              <span className="flex items-center text-[#FFF] font-onest text-[14px] font-normal leading-normal h-[10px]">Book now</span>
            </Link>

          </div>
        </div>
        {isMobileNavOpen && (
          <MobileNavbar navLinks={navLinks} onClose={setIsMobileNavOpen} pathname={pathname} />
        )}
      </Wrapper>
      {pathname === "/" ? "" : <div className="min-w-full h-px bg-[#E0E0E0]"></div>}
    </div>
  );
};

export default Navbar;

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blogs" },
  { label: "Listing", href: "/listings" },
  { label: "Contact Us", href: "/contact" },
  { label: "Partner with Us", href: "https://luxurylodgingpm.com/", target: "_blank" }
];
