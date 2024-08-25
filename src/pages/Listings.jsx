import { useDispatch, useSelector } from "react-redux";
import { FilterableSearchListing, ListingList } from "../components";
import { useEffect } from "react";
import { fetchAmenitiesList, fetchListingList, fetchListingTotalCount, setSearchListingParamsToInitialState } from "../redux/slices/listingSlice";

const Listings = () => {

  const dispatch = useDispatch();
  const { listingList, listingTotalCount } = useSelector(state => state.listing);

  useEffect(() => {
    // dispatch(syncListing());
    listingTotalCount == 0 && dispatch(fetchListingTotalCount());
    listingList.length == 0 && dispatch(fetchListingList());
    dispatch(setSearchListingParamsToInitialState());
    dispatch(fetchAmenitiesList());
    localStorage.clear();
  }, []);

  return (

    <div className="space-y-[47px]">
      <div className="space-y-8">
        <FilterableSearchListing />
        <div className="min-w-full h-px bg-[#E0E0E0]"></div>
      </div>
      <ListingList />
    </div>
  );
};

export default Listings;