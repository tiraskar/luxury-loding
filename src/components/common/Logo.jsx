import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Logo = ({ onClose, logoText = "Luxury Lodging" }) => {
  return (
    <Link to='/' className="font-onest text-lg sm:text-xl md:text-[24px] tracking-tight font-medium"
      onClickCapture={() => onClose(false)}
    >
      {logoText}
    </Link>
  );
};

Logo.propTypes = {
  onClose: PropTypes.func,
  logoText: PropTypes.string,
};

export default Logo;