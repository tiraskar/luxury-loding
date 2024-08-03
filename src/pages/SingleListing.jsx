import { FilterableSearchListing, Listing, OtherListing } from "../components";



const SingleListing = () => {
  return (
    <div className="space-y-[56px]">
      <div className="space-y-8">
        <FilterableSearchListing />
        <div className="h-px w-full bg-[#D3D3D3]"></div>
      </div>
      <Listing />
      <OtherListing />
    </div>
  );
};

export default SingleListing;