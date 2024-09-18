import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ImageLogo = ({ onClose }) => {
  return (
    <Link className="" to='/' onClickCapture={() => onClose(false)}>
      <img src="images/logo.jpg" alt="" className="h-7 sm:h-8 lg:h-10 opacity-100 " />
    </Link>
  );
};

ImageLogo.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ImageLogo;

