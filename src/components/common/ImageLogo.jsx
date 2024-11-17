import PropTypes from "prop-types";

const ImageLogo = ({ onClose }) => {
  return (
    <div onClick={() => onClose(false)}>
      <img src={`${import.meta.env?.BASE_URL}${'images/logo.jpg'}`}
        alt="" className="h-7 sm:h-8 lg:h-10 opacity-100 " />
    </div>
  );
};

ImageLogo.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ImageLogo;

