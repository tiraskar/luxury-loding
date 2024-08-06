

const LoaderScreen = () => {
  return (
    <div className="fixed  bg-black inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="w-24 h-24 relative">
        <span className="absolute inset-0 w-full h-full border-8 border-dotted  border-white border-opacity-100 rounded-full animate-spin "
        ></span>
      </div>
    </div>
  );
};

export default LoaderScreen;