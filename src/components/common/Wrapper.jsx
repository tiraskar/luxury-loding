import PropTypes from "prop-types";

const Wrapper = ({ children }) => {
  return (
    <div className=" items-center max-w-[1320px] 2xl:max-w-[1440px] mx-auto px-2 sm:px-3 md:px-4 xl:px-0">
      {children}
    </div>
  );
};


Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;