
const LoadingSpinner = () => {
  return (
    <div className="w-6 h-6 relative">
      <span className="absolute inset-0 w-full h-full border-4 border-dotted  border-white border-opacity-100 rounded-full animate-spin"></span>
    </div>
  );
};

export default LoadingSpinner;