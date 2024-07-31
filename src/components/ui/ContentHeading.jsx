
// import PropTypes from "prop-types";

// const ContentHeading = ({ text, className }) => {
//   return (
//     <div className={`text-[#333333] text-[26px] sm:text-3xl md:text-[35px] font-semibold ${className}`}>
//       {text}
//     </div>
//   );
// };

// ContentHeading.propTypes = {
//   text: PropTypes.string.isRequired,
//   className: PropTypes.string
// };

// export default ContentHeading;

import PropTypes from "prop-types";

const ContentHeading = ({ text, className }) => {
  return (
    <div className={`text-[#333333] sm:text-3xl md:text-[35px] font-semibold ${className}`}>
      {text}
    </div>
  );
};

ContentHeading.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default ContentHeading;
