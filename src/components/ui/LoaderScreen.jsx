

const LoaderScreen = () => {
  return (
    <div className="fixed  bg-black inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="loading-wave">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    </div>
  );
};

export default LoaderScreen;


