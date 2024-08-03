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

  const renderNavbar = navLinks?.map(({ href, label }) => {
    return (
      <Link
        key={href}
        to={href}
        className={`text-[1rem] text-textDark ${pathname === href ? 'opacity-100' : 'opacity-40'}`}
      >
        {label}
      </Link>
    );
  });

  return (
    <div className="pb-10">
      <Wrapper>
        <div className="flex flex-row justify-between items-center py-6 font-onest">

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

          <div className="hidden md:flex space-x-6 items-center">
            <select
              className="bg-white focus:border-none text-[1rem]">
              <option className="">USD</option>
            </select>

            <button className="px-5 py-3 rounded-xl text-white bg-black ">Book now</button>

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
];
