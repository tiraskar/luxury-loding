import { useEffect, useState } from "react";
import BillingAddress from "./BillingAddress";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, savePaymentInfo } from "../../redux/slices/paymentSlice";
import PersonalInfoForm from "./PersonalInfoForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoaderScreen from "../ui/LoaderScreen";
import { formateDate } from "../../helper/date";
import { Link, useNavigate } from "react-router-dom";
import { FaHouseChimneyWindow } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { toast } from "react-toastify";
import CustomPopup from "../common/CustomPopUP";
import TermsAndCondition from "../../pages/TermsAndCondition";
import RefundPolicy from "../../pages/RefundPolicy";

const schema = yup.object({
  personalInfo: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.number().required(),
    countryCode: yup.string().required().default('us'),
    countryDialCode: yup.string().required()
  }),
  billingInfo: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    line1: yup.string().required(),
    postalCode: yup.string().required(),
    country: yup.string().required().default('US')
  })
});

const PaymentMethod = () => {
  const [isAgreeTerms, setIsAgreeTerms] = useState(false);
  const [isShowHouseRule, setIsShowHouseRule] = useState(true);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [isTermsAndConditionOpen, setIsTermsConditionOpen] = useState(false);
  const [isCancellationPolicyOpen, setIsCancellationPolicyOpen] = useState(false)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      personalInfo: {
        countryCode: 'US',
        countryDialCode: '+1'
      },
      billingInfo: {
        country: 'US'
      }
    },
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { personalInfo, loading } = useSelector(state => state.payment);
  const { bookingPrice, totalDiscountPrice } = useSelector(state => state.booking);
  const guestNumber = localStorage?.getItem('guests');
  const bookingCheckIn = localStorage?.getItem('checkIn');
  const bookingCheckOut = localStorage?.getItem('checkOut');
  const { listingInfo } = useSelector(state => state.listing);
  const [paymentUrl, setPaymentUrl] = useState('');
  const onSubmit = async () => {
    if (!isAgreeTerms) {
      document.getElementById("agreeTerms").focus();
      return;
    }

    dispatch(createOrder({
      guests: Number(guestNumber),
      checkIn: formateDate(new Date(bookingCheckIn)),
      checkOut: formateDate(new Date(bookingCheckOut)),
    }))
      .unwrap()
      .then((response) => {
        if (response.orderId && response.userAccountId && response.hash) {
          const totalPrice = totalDiscountPrice
            ? (
              Number(bookingPrice.totalPrice) -
              Number(totalDiscountPrice !== 0 ? totalDiscountPrice : 0)
            ).toFixed(2)
            : Number(bookingPrice.totalPrice).toFixed(2);
          localStorage.setItem('orderId', response.orderId);
          const queryParams = new URLSearchParams({
            userAccountId: response.userAccountId,
            orderId: response.orderId,
            amount: totalPrice,
            hash: response.hash,
            payerEmail: personalInfo.email,
            url: response.url
          });

          const url = `/charge-popup.html?${queryParams.toString()}`;
          setPaymentUrl(url);
          setShowPaymentPopup(true);
        }
      });
  };

  useEffect(() => {
    const handleMessage = (e) => {
      if (e?.data?.status !== undefined && e.data.message === "paymentSuccess") {
        const orderId = localStorage.getItem("orderId");

        const paymentData = {
          orderId,
          paymentStatus: e.data.message,
          chargeId: e.data.transaction_ref_no,
        };

        dispatch(savePaymentInfo(paymentData))
          .unwrap()
          .then(() => {
            setShowPaymentPopup(false);
            window.location.href = '/listings';
          })
          .catch(() => {
            setShowPaymentPopup(false);
            toast.error("Something went wrong, please try again!");
            window.location.href = '/listings';
          });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);



  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-[35px]">
        <PersonalInfoForm register={register} setValue={setValue} errors={errors} />
        <div className="min-w-full h-px bg-[#E0E0E0] px-4"></div>
        <BillingAddress register={register} errors={errors} />

        {loading && <LoaderScreen />}

        <div className="min-w-full h-px bg-[#E0E0E0] px-4"></div>

        {listingInfo?.houseRules && (
          <div className="flex gap-3">
            <div className="lg:max-w-[318px] flex rounded-2xl space-x-3 ">
              <div className="flex flex-row items-center justify-center h-[42px] w-[42px] rounded-xl bg-[#F5F5EF]">
                <FaHouseChimneyWindow
                  onClick={() => setIsShowHouseRule(!isShowHouseRule)}
                  size={22}
                  color="black"
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="w-full space-y-[6px]">
              <div
                onClick={() => setIsShowHouseRule(!isShowHouseRule)}
                className="flex justify-between items-center text-sm font-semibold tracking-[-1%] mt-3 cursor-pointer w-full"
              >
                <p className="flex-grow">House rules</p>
                {isShowHouseRule ? (
                  <IoIosArrowUp size={18} className="text-gray-600" />
                ) : (
                  <IoIosArrowDown size={18} className="text-gray-600" />
                )}
              </div>
              {isShowHouseRule && (
                <p className="text-xs leading-5 -ml-10">
                  {listingInfo?.houseRules?.split("✔️").map((rule, index) => (
                    <span key={index} className="py-4">
                      {index !== 0 && "✔️"} {rule}
                      <br />
                    </span>
                  ))}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex items-start space-x-2">
          <input
            id="agreeTerms"
            required
            type="checkbox"
            value={isAgreeTerms}
            onClick={() => setIsAgreeTerms(!isAgreeTerms)}
            className="mt-1.5"
          />
          <p className="lg:relative text-xs leading-6">
            By clicking the button below, I agree to Luxury Lodging's {" "}
            <span onClick={() => setIsTermsConditionOpen(true)} className="underline cursor-pointer">terms & conditions</span>, guest agreement and {" "}
            <span onClick={() => setIsCancellationPolicyOpen(true)} className="underline cursor-pointer">cancellation policy</span>
            . I am aware that I must be at least 21 to book this stay. I agree to pay the total amount shown, which includes service fees.{" "}
            <Link to="/contact" className="underline">Contact us&nbsp;</Link>
            if you have any questions!
          </p>
        </div>

        <div className="relative pt-10 pb-10">
          <button
            type="submit"
            className="flex cursor-pointer items-center py-3 px-7 bg-[#333333] text-white rounded-[14px] w-[161px] h-[40px] text-[13px] font-semibold"
          >
            Confirm and pay
          </button>
        </div>
      </form>
      {showPaymentPopup && (
        <Modal onClose={() => setShowPaymentPopup(false)}>
          <div className="w-full h-[75vh] sm:h-[60vh]">
            <iframe
              src={paymentUrl}
              title="Payment"
              allow="payment"
              className="w-full h-full rounded-b-xl border-none"
            />
          </div>
        </Modal>
      )}
      {isTermsAndConditionOpen &&
        <CustomPopup onClose={setIsTermsConditionOpen}>
          <TermsAndCondition />
        </CustomPopup>
      }
      {isCancellationPolicyOpen &&
        <CustomPopup onClose={setIsCancellationPolicyOpen}>
          <RefundPolicy />
        </CustomPopup>
      }
    </>
  );
};

export default PaymentMethod;

// eslint-disable-next-line
const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
      <div className="relative w-full max-w-2xl bg-[#D9E2EC] rounded-xl overflow-hidden shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-3 text-2xl text-gray-500 hover:text-gray-800 z-10"
        >
          &times;
        </button>

        {/* Content */}
        <div className="w-full h-full ">{children}</div>
      </div>
    </div>
  );
};