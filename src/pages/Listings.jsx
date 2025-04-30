import { useDispatch, useSelector } from "react-redux";
import { FilterableSearchListing, ListingLoading, Wrapper } from "../components";
import { lazy, Suspense, useEffect } from "react";
import { fetchAmenitiesList, fetchListingList, fetchListingTotalCount, setSearchListingParamsToInitialState } from "../redux/slices/listingSlice";
import { wait } from "../utils/helper";

const ListingList = lazy(() => wait(1000).then(() => import("../components/listing/ListingList")));

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
      <Suspense fallback={<Wrapper>
        <ListingLoading numbers={8} />
      </Wrapper>}>
        <div className="relative">
          <ListingList />
        </div>
      </Suspense>
      {/* <ListingList /> */}
    </div>
  );
};

export default Listings;