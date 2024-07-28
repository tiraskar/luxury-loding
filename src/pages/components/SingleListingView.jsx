import Listing from "./Listing";
import OtherListing from "./OtherListing";
import SearchListing from "./forms/SearchListing";

const SingleListingView = () => {
  return (
    <div className="space-y-[56px]">
      <div className="space-y-8">
        <SearchListing />
        <div className="h-px w-full bg-[#D3D3D3]"></div>
      </div>
      <Listing />
      <OtherListing />
    </div>
  );
};

export default SingleListingView;