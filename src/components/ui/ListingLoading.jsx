import PropTypes from "prop-types";
import { useSelector } from "react-redux";


const LoadingListingPlaceholder = () => (
  <div className="max-w-sm animate-pulse">
    <div className="bg-textLight rounded-xl w-full h-48 mb-4"></div>
    <div className="h-2 bg-textLight rounded-full max-w-[360px] mb-2.5"></div>
    <div className="h-2 bg-textLight rounded-full mb-2.5"></div>
    <div className="h-2 bg-textLight rounded-full max-w-[330px] mb-2.5"></div>
    <div className="h-2 bg-textLight rounded-full max-w-[300px] mb-2.5"></div>
    <div className="h-2 bg-textLight rounded-full max-w-[360px]"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

const ListingLoading = ({ numbers = 8 }) => {

  const { isMapViewOpen } = useSelector(state => state.listing)

  return (
    // <div className={"grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-4 gap-y-[56px]"}>
    <div className={`${isMapViewOpen ? " grid grid-cols-1 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-col lg:space-y-4 gap-y-[56px] lg:gap-y-4" : "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[56px]"} gap-x-4 `}>
        {Array.from({ length: numbers }, (_, index) => (
          <LoadingListingPlaceholder key={index} />
        ))}
    </div>
  );
};

ListingLoading.propTypes = {
  numbers: PropTypes.number,
};

export default ListingLoading;