import Booking from "../components/booking/Booking";
import { Wrapper } from "../components";
import { useEffect, } from "react";
import LoaderScreen from "../components/ui/LoaderScreen";
import { useDispatch, useSelector } from "react-redux";
import { fetchListingAvailabilityCalender, fetchListingInfo } from "../redux/slices/listingSlice";
import { useNavigate, useParams } from "react-router-dom";
import { calculateBookingPrice } from "../redux/slices/bookingSlice";
import { formateDate, getCurrentMonthStartDate } from "../helper/date";
import BookingConfirmation from "./BookingConfirmation";

const BookingPayment = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isFetchingStripKey } = useSelector(state => state.payment);
  const { isFetchListingInfo } = useSelector(state => state.listing);
  const { loading, isBooking } = useSelector(state => state.booking);

  const guestNumber = localStorage?.getItem('guests');
  const bookingCheckIn = localStorage?.getItem('checkIn');
  const bookingCheckOut = localStorage?.getItem('checkOut');
  const listingId = localStorage?.getItem('listingId');

  // useEffect(() => {
  //   dispatch(fetchStripPromiseKey());
  // }, []);
  const startDate = getCurrentMonthStartDate()

  useEffect(() => {
    dispatch(fetchListingInfo(id || listingId));
    !isBooking && navigate(`/listings/${id}`)
    listingId !== id && navigate(`/listings/${id}`);
    if (!bookingCheckIn || !bookingCheckOut || !guestNumber) {
      navigate(`/listings/${id}`);
      return null;
    } else {
      dispatch(fetchListingAvailabilityCalender({
        id,
        startDate: formateDate(startDate)
      }));
      bookingCheckIn && bookingCheckOut && guestNumber && dispatch(calculateBookingPrice({
        listingId: Number(id),
        checkIn: formateDate(new Date(bookingCheckIn)),
        checkOut: formateDate(new Date(bookingCheckOut)),
        guests: Number(guestNumber),
      }));
      // .unwrap().then((response) => {
      //   if (response) {
      //     dispatch(createPaymentIntent({
      //       id,
      //       amount: Number(response.totalPrice),
      //       guests: Number(guestNumber),
      //       checkIn: formateDate(new Date(bookingCheckIn)),
      //       checkOut: formateDate(new Date(bookingCheckOut)),
      //     }));
      //   } else {
      //     window.location.reload();
      //   }
      // });
    }
  }, [id]);




  return (
    <div className=" relative">
      <div className="hidden lg:block absolute top-0 left-0 h-full w-1/2 bg-white"></div>
      <div className="hidden lg:block -mt-6 absolute top-0 right-0 h-full w-1/3 bg-[#F9F9F9]"></div>

      <Wrapper>
        <div className="relative md:grid lg:grid-cols-9">
          {(isFetchingStripKey || isFetchListingInfo || loading) && <LoaderScreen />}
          <div className="lg:col-span-5 font-inter tracking-[-1%] lg:pr-5">
            {/* <Outlet /> */}
            <BookingConfirmation />
          </div>
          <div className="hidden lg:block lg:col-span-4 bg-[#F9F9F9] lg:max-w-[649px] w-full mt-5 lg:-mt-6 mb-6">
            <Wrapper>
              <div className="flex flex-col lg:pl-10 xl:pl-16  pb-20 lg:pb-0  lg:py-20">
                <Booking />
              </div>
            </Wrapper>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default BookingPayment;
