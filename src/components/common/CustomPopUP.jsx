import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const CustomPopup = ({ children, onClose }) => {
  const modalRef = useRef();

  // Close when clicking outside
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 bg-cardBackgroundLight bg-opacity-40 flex items-center justify-center z-50">
      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-[90%] max-w-3xl max-h-[75vh] overflow-hidden"
      >
        {/* Fixed Close Button */}
        <button
          onClick={() => onClose()}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 z-10"
        >
          ✕
        </button>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

CustomPopup.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CustomPopup;
