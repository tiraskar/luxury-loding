import PropTypes from "prop-types";

const Wrapper = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};


Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
