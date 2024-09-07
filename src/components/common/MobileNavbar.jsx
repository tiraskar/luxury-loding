import { Link } from "react-router-dom";
import Logo from "./Logo";
import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";

const MobileNavbar = ({ navLinks, onClose, pathname }) => {
  return (
    <div className="fixed transition-all delay-1000 md:hidden inset-0 bg-cardBackgroundLight z-50 flex flex-col  py-6 my-1 h-full">
      <div className="flex justify-between items-center w-full px-2 mb-10">
        <Logo onClose={onClose} />
        <RxCross2
          onClick={() => onClose(false)}
          className="text-xl sm:text-2xl"
        />
      </div>

      <ul className="flex flex-col   space-y-4 transition-all delay-100">
        {navLinks?.map(({ href, label, target }) => (
          <Link
            key={href}
            to={href}
            target={target ? `${target}` : "_parent"}
            className={`px-2 text-[1rem] text-textDark  ${pathname === href ? 'opacity-100 font-medium bg-cardBackgroundDark py-2 rounded-sm' : 'opacity-40'}`}
            onClick={() => onClose(false)}>
            {label}
          </Link>
        ))}
      </ul>


      <div className="min-w-full h-px bg-[#E0E0E0] mt-[30px] px-4"></div>

      <div className="flex flex-row items-center space-x-4 mt-8">
        <select className="bg-cardBackgroundLight  rounded-md p-2 text-[1rem]">
          <option>USD</option>
        </select>
        <Link to='/listings' onClick={() => onClose(false)} className="flex p-[14px_20px] justify-center items-center gap-[10px] rounded-xl bg-[#222]">
          <span className="flex items-center text-[#FFF] font-onest text-[14px] font-normal leading-normal h-[10px]">Book now</span>
        </Link>
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
