import { useParams } from "react-router-dom";
import { FilterableSearchListing, OtherListing, Wrapper } from "../components";
import { useDispatch } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
import { fetchHolidayFutureCalender, fetchListingAvailabilityCalender, fetchListingInfo, fetchListingReviews, fetchOtherListings, setSearchListingParamsToInitialState, toggleMapView } from "../redux/slices/listingSlice";
import { setCheckBookingParamsToInitialState, setIsBooking, toggleTokenState } from "../redux/slices/bookingSlice";
import { formateDate, getCurrentMonthStartDate } from "../helper/date";
import ReviewLoading from "../components/ui/ReviewLoading";
import AmenitiesSkeleton from "../components/ui/AmenitiesSkeleton";
import ListingInfoSkeleton from "../components/ui/ListingInfoSkeleton";
import { wait } from "../utils/helper";

const Listing = lazy(() => wait(1000).then(() => import("../components/listing/Listing")))

const SingleListing = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  const startDate = getCurrentMonthStartDate()

  useEffect(() => {
    dispatch(fetchListingInfo(id));
    dispatch(fetchListingReviews(id));
    dispatch(fetchListingAvailabilityCalender({
      id,
      startDate: formateDate(startDate)
    }));
    dispatch(fetchHolidayFutureCalender({
      id,
      startDate: formateDate(startDate)
    }))
    dispatch(fetchOtherListings({ limit: 4 }));
    dispatch(setCheckBookingParamsToInitialState());
    dispatch(setSearchListingParamsToInitialState());
    dispatch(toggleTokenState())
    dispatch(toggleMapView(false))
    dispatch(setIsBooking(false));
  }, [id])

  return (
    <div className="space-y-[56px]">
      <div className="space-y-8">
        <FilterableSearchListing />
        <div className="h-px w-full bg-[#D3D3D3]"></div>
      </div>
      <Suspense fallback={<Wrapper>
        <ListingInfoSkeleton />
        <div>
          <div className="py-10">
            {Array.from({ length: 8 }, (_, index) => (
              <AmenitiesSkeleton key={index} />
            ))}
          </div>
          {Array.from({ length: 4 }, (_, index) => (
            <ReviewLoading key={index} />
          ))}
        </div>
      </Wrapper>}>
        <Listing />
      </Suspense>
      {/* <Listing /> */}
      <OtherListing />
    </div>
  );
};

export default SingleListing;