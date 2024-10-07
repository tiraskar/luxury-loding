import { useForm } from "react-hook-form";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getDiscountedPrice, setCouponCode, toggleTokenState } from "../../redux/slices/bookingSlice";
import { useEffect } from "react";
import { MdError } from "react-icons/md";


const TokenDiscount = ({ listingId, checkInDate, checkOutDate, totalPrice }) => {
  // const isTokenValid = localStorage.getItem('isTokenValid');
  // const coupon = localStorage.getItem('coupon');
  const { tokenError, tokenLoading, isValidToken, totalDiscountPrice, couponCode } = useSelector(state => state.booking);
  // const [validToken, setValidToken] = useState(false)

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
    } else {
      dispatch(setCouponCode(value));
      // localStorage.setItem('coupon', value.couponCode);
      dispatch(getDiscountedPrice({
        couponCode: value.couponCode,
        listingId,
        checkInDate,
        checkOutDate,
        totalPrice
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
        <div className="flex flex-col col-span-7">
          <label className="text-sm ">Promo Code/Coupon</label>
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
      <span className="text-xs font-onest" style={{
        color: "red"
      }}> {tokenError !== '' ?? <MdError color="red" className="mr-1" />} {tokenError}</span>

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
  totalPrice: PropTypes.number.isRequired
};

export default TokenDiscount;