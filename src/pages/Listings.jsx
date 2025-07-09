import { useDispatch, useSelector } from "react-redux";
import { FilterableSearchListing, ListingLoading, Wrapper } from "../components";
import { lazy, Suspense, useEffect } from "react";
import { fetchListingList, fetchListingTotalCount, setSearchListingParamsToInitialState } from "../redux/slices/listingSlice";
import { wait } from "../utils/helper";
import { clearBookingDateSelection } from "../redux/slices/bookingSlice";

const ListingList = lazy(() => wait(10).then(() => import("../components/listing/ListingList")));

const Listings = () => {

  const dispatch = useDispatch();
  const { listingList, listingTotalCount } = useSelector(state => state.listing);

  useEffect(() => {
    localStorage.clear();
    dispatch(setSearchListingParamsToInitialState());
    dispatch(clearBookingDateSelection())
    const shouldFetchCount = listingTotalCount === 0;
    const shouldFetchList = listingList.length === 0;
    const promises = [];
    if (shouldFetchCount) promises.push(dispatch(fetchListingTotalCount()));
    if (shouldFetchList) promises.push(dispatch(fetchListingList()));
    Promise.all(promises);

  }, [dispatch]);


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
    </div>
  );
};

export default Listings;