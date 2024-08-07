import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';

const CustomToast = ({ message, onClose }) => {
  return (
    <div
      className={` ease-out max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 font-onest tracking-tight`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <p className="mt-1 text-sm text-black">
            {message}
          </p>
        </div>
      </div>
      <div onClick={onClose} className="flex border-gray-200">
        <button

          className="w-full rounded-none p-4 flex items-center justify-center text-sm font-medium text-[#e33d01cd]"
        >
          Close
        </button>
      </div>
    </div>
  );
};

CustomToast.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

// Usage example
const notifyToastMessage = (message) => {
  toast.dismiss(); // Dismiss any existing toasts to avoid stacking them up
  toast.custom(() => (
    <CustomToast
      message={message}
      onClose={() => toast.dismiss()}
    />
  ), { duration: 1000, position: 'top-center' });
};

export default CustomToast;
export { notifyToastMessage };
