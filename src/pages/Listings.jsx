import { useDispatch, useSelector } from "react-redux";
import { FilterableSearchListing, ListingList } from "../components";
import { useEffect } from "react";
import { fetchListingList, fetchListingTotalCount } from "../redux/slices/listingSlice";

const Listings = () => {

  const dispatch = useDispatch();
  const { listingList, listingTotalCount } = useSelector(state => state.listing);

  useEffect(() => {
    listingTotalCount == 0 && dispatch(fetchListingTotalCount());
    listingList.length == 0 && dispatch(fetchListingList());
  }, [dispatch, listingList, listingTotalCount]);

  return (

    <div className="space-y-[79px]">
      <FilterableSearchListing />
      <ListingList />
    </div>
  );
};

export default Listings;