import PropTypes from "prop-types";
import { useState } from "react";
import { RxCross2, RxChevronLeft, RxChevronRight } from "react-icons/rx";

const SingleImageOnSlide = ({ images, setIsviewSingleImageOnSlide, imageIndex, setImageViewIndex }) => {

  const [currentIndex, setCurrentIndex] = useState(imageIndex);


  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <button
        onClick={() => {
          setIsviewSingleImageOnSlide(false);
          setImageViewIndex(0);
        }}
        className="absolute top-4 right-4 text-white text-2xl z-10"
      >
        <RxCross2 />
      </button>
      <div className="relative w-full h-full p-4">
        <img
          src={images[currentIndex]?.url}
          alt="Full-screen image"
          className="w-full h-full object-cover rounded-md" // object-cover will cover the screen, no distortion
          loading="lazy"
        />
        {/* Previous button */}
        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
        >
          <RxChevronLeft />
        </button>
        {/* Next button */}
        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
        >
          <RxChevronRight />
        </button>
      </div>
    </div>
  );
};

SingleImageOnSlide.propTypes = {
  images: PropTypes.array.isRequired,
  setIsviewSingleImageOnSlide: PropTypes.func.isRequired,
  imageIndex: PropTypes.number.isRequired,
  setImageViewIndex: PropTypes.func.isRequired,
};

export default SingleImageOnSlide;
