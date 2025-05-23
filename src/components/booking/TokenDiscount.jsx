import { useForm } from "react-hook-form";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { calculateBookingPrice, setCouponCode, toggleTokenState } from "../../redux/slices/bookingSlice";
import { useEffect } from "react";
import { MdError } from "react-icons/md";
import { formateDate } from "../../helper/date";

//eslint-disable-next-line
const TokenDiscount = ({ listingId, checkInDate, checkOutDate, totalPrice, guestNumber }) => {
  const { tokenError, bookingGuests, checkBookingParams, tokenLoading, isValidToken, totalDiscountPrice, couponCode } = useSelector(state => state.booking);


  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      couponCode: ''
    }
  });

  const onSubmit = (value) => {
    if (isValidToken) {
      // localStorage.setItem('isTokenValid', 'false');
      setValue('couponCode', '');
      dispatch(setCouponCode(''));
      dispatch(toggleTokenState());
      dispatch(calculateBookingPrice({
        listingId: Number(listingId),
        guests: Number(Number(bookingGuests.adults) + Number(bookingGuests.children)),
        pet: bookingGuests?.pets || null,
        checkIn: formateDate(new Date(checkBookingParams.checkIn)),
        checkOut: formateDate(new Date(checkBookingParams.checkOut)),
      }));


    } else {
      dispatch(setCouponCode(value));
      dispatch(calculateBookingPrice({
        listingId: Number(listingId),
        guests: Number(Number(bookingGuests.adults) + Number(bookingGuests.children)),
        pet: bookingGuests?.pets || null,
        checkIn: formateDate(new Date(checkBookingParams.checkIn)),
        checkOut: formateDate(new Date(checkBookingParams.checkOut)),
      }));
    }

  };



  useEffect(() => {
    if (couponCode) {
      setValue('couponCode', couponCode);
    }
  }, [couponCode, setValue]);

  return (
    <div className="flex flex-col space-y-1 mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-10 items-end gap-4">
        <div className="flex flex-col col-span-7 space-y-2">
          <label className="text-sm ">Promo Code/ Coupon</label>
          <input
            {...register('couponCode', { required: 'Coupon Code is required' })}
            type="text"
            // disabled={tokenLoading || isTokenValid == 'true'}
            className={`default-input w-full font-onest`}
            onChange={() => dispatch(toggleTokenState())}
            placeholder="Enter coupon code"
          />
        </div>
        <button
          // disabled={tokenLoading || isTokenValid == "true"}
          type="submit" className="flex justify-center col-span-3 px-5 py-2 rounded-xl text-white bg-black h-fit">
          {tokenLoading ? <LoadingSpinner /> : isValidToken ? "Remove" : "Apply"}
        </button>
      </form>
      <span className="flex items-center text-xs font-onest" style={{
        color: "red"
      }}> {tokenError !== '' && <MdError color="red" className="mr-1" />} {tokenError}</span>

      {isValidToken && <span className="flex items-center text-xs font-onest" style={{
        color: "green"
      }}> {(totalDiscountPrice !== '' || totalDiscountPrice !== 0) && <MdError color="green" className="mr-1" />} Promo code added.</span>
      }
    </div>
  );
};

TokenDiscount.propTypes = {
  listingId: PropTypes.number.isRequired,
  checkInDate: PropTypes.string.isRequired,
  checkOutDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
  guestNumber: PropTypes.number.isRequired,
};

export default TokenDiscount;