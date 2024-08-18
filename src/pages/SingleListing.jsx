import { useParams } from "react-router-dom";
import { FilterableSearchListing, Listing, OtherListing } from "../components";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchListingAvailabilityCalender, fetchListingInfo, fetchListingReviews, fetchOtherListings, setSearchListingParamsToInitialState } from "../redux/slices/listingSlice";
import { setCheckBookingParamsToInitialState } from "../redux/slices/bookingSlice";
import { formateDate, getCurrentMonthStartDate } from "../helper/date";


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
    dispatch(fetchOtherListings({ limit: 4 }));
    dispatch(setCheckBookingParamsToInitialState());
    dispatch(setSearchListingParamsToInitialState());
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