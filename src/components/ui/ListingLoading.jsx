import Wrapper from "../common/Wrapper";
import PropTypes from "prop-types";


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
  return (
    <Wrapper>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-4 gap-y-[56px]">
        {/* Render 8 Placeholder components */}
        {Array.from({ length: numbers }, (_, index) => (
          <LoadingListingPlaceholder key={index} />
        ))}
      </div>
    </Wrapper>
  );
};

ListingLoading.propTypes = {
  numbers: PropTypes.number,
};

export default ListingLoading;