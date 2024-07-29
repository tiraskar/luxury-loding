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
    <Wrapper>
      <div className="flex flex-row justify-between items-center py-3 md:my-6 font-onest px-4 xl:px-0">

        <Logo />

        {!isMobileNavOpen &&
          <RxHamburgerMenu
            onClick={() => setIsMobileNavOpen(true)}
            className="block md:hidden text-xl sm:text-2xl" />}

        {isMobileNavOpen &&
          <RxCross2
            onClick={() => setIsMobileNavOpen(false)}
            className="block md:hidden text-xl sm:text-2xl" />
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
  );
};

export default Navbar;

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "Listing", href: "/listing" },
];
