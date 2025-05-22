import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { IoArrowBack } from 'react-icons/io5';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 font-onest">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden justify-center item-center pointer-events-none">
        <div className="absolute top-1/4 right-[40%] w-64 h-64 bg-buttonPrimary/60 rounded-full opacity-20 animate-pulse"></div>
        {/* <div className="absolute top-28 left-20 w-32 h-32 bg-buttonPrimary rounded-full opacity-20 animate-pulse delay-500"></div> */}
      </div>

      <div className="relative text-center max-w-2xl z-10">
        {/* Animated 404 with improved styling */}
        <div className="relative mb-8 text-buttonPrimary">
          <h1 className="text-8xl sm:text-9xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text mb-4 animate-bounce">
            404
          </h1>
          {/* Subtle shadow effect */}
          <div className="absolute inset-0 text-8xl sm:text-9xl font-bold text-gray-200 opacity-50 blur-sm -z-10 translate-y-2">
            404
          </div>
        </div>

        {/* Main heading with better typography */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 font-onest leading-tight">
          Oops! Page Not Found
        </h2>

        {/* Enhanced description */}
        <p className="text-lg text-gray-600 mb-8 font-onest leading-relaxed max-w-md mx-auto">
          {`The page you’re looking for can’t be found or has been moved. Don’t worry, we’ll help you get back on track!`}
        </p>

        {/* Action buttons with improved design */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center bg-buttonPrimary text-white gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold font-onest rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out"
          >
            <Home size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="group flex items-center text-buttonPrimary gap-2 px-8 py-3 bg-white text-gray-700 font-semibold font-onest rounded-xl border-2 border-buttonPrimary hover:border-gray-300 hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-out"
          >
            <IoArrowBack size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;