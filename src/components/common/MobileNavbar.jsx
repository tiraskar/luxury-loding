import { Link } from "react-router-dom";
import Logo from "./Logo";
import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";

const MobileNavbar = ({ navLinks, onClose, pathname }) => {
  return (
    <div className="fixed transition-all delay-1000 md:hidden inset-0 bg-white z-50 flex flex-col items-center py-6 my-3 w-1/2">
      <div className="flex justify-between w-full px-2 mb-10">
        <Logo onClose={onClose} />
        <RxCross2
          onClick={() => onClose(false)}
          className="text-xl sm:text-2xl"
        />
      </div>

      <ul className="flex flex-col justify-start text-start  items-center space-y-4 transition-all delay-100">
        {navLinks?.map(({ href, label }) => (
          <Link
            key={href}
            to={href}
            className={`text-[1rem] text-textDark  ${pathname === href ? 'opacity-100' : 'opacity-40'}`}
            onClick={() => onClose(false)}>
            {label}
          </Link>
        ))}
      </ul>


      <div className="min-w-full h-px bg-[#E0E0E0] mt-[30px] px-4"></div>

      <div className="flex flex-row items-center space-x-4 mt-8">
        <select className="bg-white  rounded-md p-2 text-[1rem]">
          <option>USD</option>
        </select>
        <button className="px-5 py-3 rounded-xl text-white bg-black">
          Book now
        </button>
      </div>
    </div>
  );
};

MobileNavbar.propTypes = {
  navLinks: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  onClose: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default MobileNavbar;
