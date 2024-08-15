import Booking from "../components/booking/Booking";
import { Wrapper } from "../components";
import { useEffect } from "react";
import LoaderScreen from "../components/ui/LoaderScreen";
import { useDispatch, useSelector } from "react-redux";
import { fetchListingInfo } from "../redux/slices/listingSlice";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { createPaymentIntent, fetchStripPromiseKey } from "../redux/slices/paymentSlice";
import { calculateBookingPrice } from "../redux/slices/bookingSlice";

const BookingPayment = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isFetchingStripKey } = useSelector(state => state.payment);
  const { isFetchListingInfo } = useSelector(state => state.listing);
  const { loading, bookingPrice } = useSelector(state => state.booking);

  const guestNumber = localStorage?.getItem('guests');
  const bookingCheckIn = localStorage?.getItem('checkIn');
  const bookingCheckOut = localStorage?.getItem('checkOut');


  useEffect(() => {
    dispatch(fetchStripPromiseKey());
  }, [dispatch]);

  useEffect(() => {
    if (id && bookingPrice?.totalPrice) {
      dispatch(createPaymentIntent({
        id,
        amount: bookingPrice.totalPrice,
      }));
    }
    if (id) {
      dispatch(fetchListingInfo(id));

      if (bookingCheckIn && bookingCheckOut && guestNumber) {
        dispatch(calculateBookingPrice({
          listingId: Number(id),
        }));
      }
    }
  }, [id, dispatch, bookingPrice.totalPrice]);


  if (!bookingCheckIn || !bookingCheckOut || !guestNumber) {
    navigate(`/listings/${id}`);
    return null;
  }

  return (

    <div className="relative lg:grid lg:grid-cols-9">
      {(isFetchingStripKey || isFetchListingInfo || loading) && <LoaderScreen />}
      <div className="lg:col-span-5 font-inter tracking-[-1%]">
        <Outlet />
      </div>
      <div className="lg:col-span-4 bg-[#F9F9F9] w-full lg:-mt-6">
        <Wrapper>
          <div className="flex flex-col lg:mx-auto lg:max-w-[541px] py-20">
            <Booking />
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default BookingPayment;
