import PropTypes from "prop-types";

const CustomImage = ({ src, width, height, alt, title, className }) => {
  return (
    <img
      width={width || 200}
      height={height || 200}
      src={src}
      alt={alt || 'image'}
      title={title || ''}
      className={` ${className}`}
    />
  );
};

CustomImage.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string
};

export default CustomImage;