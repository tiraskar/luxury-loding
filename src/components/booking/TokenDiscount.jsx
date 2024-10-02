import { useForm } from "react-hook-form";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getDiscountedPrice, handleTokenStateChange } from "../../redux/slices/bookingSlice";


const TokenDiscount = ({ listingId, checkInDate, checkOutDate, totalPrice }) => {

  const { tokenError, tokenLoading } = useSelector(state => state.booking);
  console.log('tokenError', tokenError);


  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      couponCode: ''
    }
  });

  const onSubmit = (value) => {
    // setIsLoading(true);
    localStorage.setItem('coupon', value.couponCode);
    dispatch(getDiscountedPrice({
      couponCode: value.couponCode,
      listingId,
      checkInDate,
      checkOutDate,
      totalPrice
    }));
    // if (data?.meta.requestStatus == 'fulfilled') {
    //   setValue('couponCode', '');
    // }
  };

  const isTokenValid = localStorage.getItem('isTokenValid');
  const coupon = localStorage.getItem('coupon');

  useEffect(() => {
    if (coupon) {
      setValue('couponCode', coupon);
    }
  }, [coupon]);
  return (
    <div className="flex flex-col space-y-1">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 mt-8">
        <input
          {...register('couponCode', { required: 'Coupon Code is required' })}
          type="text"
          disabled={tokenLoading || isTokenValid == 'true'}
          className="default-input w-full"
          onChange={() => dispatch(handleTokenStateChange())}
        />
        <button
          disabled={tokenLoading || isTokenValid == "true"}
          type="submit" className="px-5 py-2 rounded-xl text-white bg-black h-fit">
          {tokenLoading ? <LoadingSpinner /> : "Send"}
        </button>
      </form>
      <span className="text-xs font-onest" style={{
        color: "red"
      }}>{tokenError}</span>
    </div>
  );
};

TokenDiscount.propTypes = {
  listingId: PropTypes.number.isRequired,
  checkInDate: PropTypes.string.isRequired,
  checkOutDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired
};

export default TokenDiscount;