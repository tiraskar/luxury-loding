

const LoaderScreen = () => {
  return (
    // <div className="fixed  bg-black inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    //   <div className="w-24 h-24 relative">
    //     <span className="absolute inset-0 w-full h-full border-8 border-dotted  border-white border-opacity-100 rounded-full animate-spin "
    //     ></span>
    //   </div>
    // </div>
    // <div className="loading-wave">
    //   <div className="loading-bar"></div>
    //   <div className="loading-bar"></div>
    //   <div className="loading-bar"></div>
    //   <div className="loading-bar"></div>
    // </div>
    <div className="fixed  bg-black inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      {/* <div className="w-[300px] h-[100px] flex justify-center items-end">
        <div className="w-[20px] h-[10px] mx-[5px] bg-buttonPrimary rounded-[5px] animate-loading-wave"></div>
        <div className="w-[20px] h-[10px] mx-[5px] bg-buttonPrimary rounded-[5px] animate-loading-wave delay-[0.1s]"></div>
        <div className="w-[20px] h-[10px] mx-[5px] bg-buttonPrimary rounded-[5px] animate-loading-wave delay-[0.2s]"></div>
        <div className="w-[20px] h-[10px] mx-[5px] bg-buttonPrimary rounded-[5px] animate-loading-wave delay-[0.3s]"></div>
      </div> */}
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


