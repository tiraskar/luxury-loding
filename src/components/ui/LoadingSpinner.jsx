
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-6 h-6 ">
      <span className=" inset-0 w-full h-full border-4 border-dotted  border-white border-opacity-100 rounded-full animate-spin"></span>
    </div>
  );
};

export default LoadingSpinner;