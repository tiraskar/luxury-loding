import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';

const CustomToast = ({ message, onClose }) => {
  return (
    <div className="flex items-center max-w-md w-full border-[0.6px] border-[#D7DBE8] rounded-lg ring-1 ring-opacity-40 font-onest">
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-black">{message}</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={onClose}
          className="w-full rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-[#eb0606]"
        >
          <RxCross2 size={16} />
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
  toast.custom((t) => (
    <CustomToast
      message={message}
      onClose={() => toast.dismiss(t.id)}
    />
  ), { duration: 2000 });
};

export default CustomToast;
export { notifyToastMessage };
