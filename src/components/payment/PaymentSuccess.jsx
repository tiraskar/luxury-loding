import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../common/Wrapper";
import { useEffect } from "react";
import { fetchListingInfo } from "../../redux/slices/listingSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SiTicktick } from "react-icons/si";
import { CiLocationOn, CiCalendarDate, CiDollar } from "react-icons/ci";
import { MdGroups3 } from "react-icons/md";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { listingInfo } = useSelector((state) => state.listing);
  const images = listingInfo?.images || [];
  const navigate = useNavigate();

  const location = useLocation();

  const { payerEmail, amount, guests, checkIn, checkOut } = location.state || {};
  const email = localStorage.getItem('payerEmail');

  useEffect(() => {
    if (id) {
      dispatch(fetchListingInfo(id));
    }
  }, [id]);

  useEffect(() => {
    if (!location.state) {
      navigate("/", { replace: true }); // Redirect to home if no state
    }
  }, [location, navigate]);

  return (
    <Wrapper>
      <div className="flex justify-center items-center">
        <div className="">
          <div className="space-y-10 max-w-6xl">
            {/* Confirmation message */}
            <div className="text-center font-onest space-y-2 lg:space-y-4">
              <div className="flex justify-center">
                <SiTicktick className="size-16 text-buttonPrimary" />
              </div>
              <h1 className="text-[24px] sm:text-[26px] md:text-3xl lg:text-[2rem] xl:text-[35px] font-semibold">
                Your reservation has been confirmed!
              </h1>
              <p className="text-xs md:text-lg text-gray-600">
                Reservation details will be sent to <span className="font-medium">{payerEmail || email}</span>.
              </p>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              {/* House Rules */}
              <div className="md:col-span-7 space-y-4">
                <h3 className="text-xl lg:text-2xl font-inter font-semibold">House Rules</h3>
                <div className="text-sm leading-6 font-onest text-gray-700 ml-4">
                  {listingInfo?.houseRules?.split("✔️").map((rule, index) => (
                    <div key={index}>
                      {index !== 0 && (
                        <span className="flex items-start gap-2">✔️ <span>{rule.trim()}</span></span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Summary Card */}
              <div className="md:col-span-5 h-fit bg-white shadow-md rounded-xl overflow-hidden sticky top-24">
                {/* Image */}
                <div className="h-[30vh] overflow-hidden">
                  <img
                    src={images[0]?.url}
                    alt="Listing"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Info */}
                <div className="p-4 space-y-3 text-start font-inter text-gray-700">
                  <h2 className="text-lg font-semibold">{listingInfo.name}</h2>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CiDollar className="text-lg" />
                    <span>
                      {amount}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CiCalendarDate className="text-lg" />
                    <span>
                      {checkIn} to {checkOut}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MdGroups3 className="text-lg" />
                    {guests} Guests
                    {/* , {bookingInfo.infants} Infants, {bookingInfo.pets} Pets */}
                  </div>

                  {listingInfo.address && (
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <CiLocationOn className="text-base" />
                      <span>{listingInfo.address}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-center items-center">
                  <button onClick={() => navigate('/', { replace: true })} className="bg-buttonPrimary text-white w-full py-3 mb-4 text-lg font-medium font-onest rounded-full mx-4">Back to home</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PaymentSuccess;
