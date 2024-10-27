import PropTypes from "prop-types";

const CustomImage = ({ src, width, height, alt, title, className, style }) => {
  return (
    <img
      width={width}
      height={height}
      src={`${import.meta.env?.BASE_URL}${src}`}
      alt={alt || 'image'}
      title={title || ''}
      className={` ${className}`}
      style={{ style }}
      loading="lazy"
    />
  );
};

CustomImage.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.string
};

export default CustomImage;