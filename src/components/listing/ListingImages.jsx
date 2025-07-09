import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ListingImages = ({ images, setIsviewAllImageOpen }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col z-20">
      <button
        onClick={() => setIsviewAllImageOpen(false)}
        className="absolute top-4 right-4 text-white text-2xl z-10"
      >
        <RxCross2 />
      </button>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {images?.map((image, index) => (
            <LazyLoadImage
              key={index}
              className="w-full h-fit max-h-[80vh] rounded-md sm:rounded-xl object-cover"
              src={image.url}
              alt={'listing-image'}
              effect="blur"
              width="100%"
              height="100%"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

ListingImages.propTypes = {
  images: PropTypes.array.isRequired,
  setIsviewAllImageOpen: PropTypes.func.isRequired,
};

export default ListingImages;
