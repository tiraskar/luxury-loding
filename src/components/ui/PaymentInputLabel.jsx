import PropTypes from "prop-types";

const PaymentInputLabel = ({ htmlFor, label }) => {
  return (
    <label htmlFor={htmlFor} className="flex h-[17px]">
      {label}
    </label>
  );
};

PaymentInputLabel.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default PaymentInputLabel;