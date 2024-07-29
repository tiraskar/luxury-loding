import { Link } from "react-router-dom";
import PropTypes from "prop-types"

const Logo = ({ onClose }) => {
  return (
    <Link to='/' className="font-onest text-lg sm:text-xl md:text-[24px] tracking-tight font-medium"
      onClickCapture={() => onClose(false)}
    >
      Luxury Lodging
    </Link>
  );
};

Logo.propTypes = {
  onClose: PropTypes.func,
};

export default Logo;