import { useParams } from "react-router-dom";
import { FilterableSearchListing, Listing, OtherListing } from "../components";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchListingInfo } from "../redux/slices/listingSlice";


const SingleListing = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListingInfo(id));
  }, [id])

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