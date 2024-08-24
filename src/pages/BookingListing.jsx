import { GoDotFill } from "react-icons/go";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { PiDog } from "react-icons/pi";
import { TbSmoking } from "react-icons/tb";
import { LuMusic4 } from "react-icons/lu";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkListingBookingAvailability } from "../redux/slices/bookingSlice";
import AlertDialog from "../components/ui/AlertDialog";

const BookingListing = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAgreeAndContinue = () => {
    const bookingAvailable = dispatch(
      checkListingBookingAvailability({
        listingId: Number(id),
      })
    );

    if (bookingAvailable) {
      navigate(`/listing/${id}/booking/payment`);
    } else {
      return (
        <AlertDialog
          warningMessage="Sorry, this listing is not available for booking now."
          message="This listing has been booked now. Please check for other date or try fro other listings."
          isCancel={false}
          submitText="Close"
          onCancel={() => navigate(`/listings/${id}`)}
        />
      );
    }
  };

  return (
    <div className="lg:col-span-5 font-inter tracking-[-1%] bg-white">
      <>
        <div className=" flex flex-col lg:max-w-[652px] ">
          <div className="flex flex-col justify-start ">
            <div className="space-y-16">
              <p className="flex items-center text-sm font-medium text-[#A1A196] gap-1">
                Home <GoDotFill className="h-2" /> Listings{" "}
                <GoDotFill className="h-2 text-black" />
                <span className="text-black">Booking</span>
              </p>

              <div className="flex flex-col sm:flex-row justify-between  xl:min-w-[652px] gap-4 lg:h-[16px] text-[13px]">
                <div className="flex items-center gap-2 ">
                  <MdKeyboardArrowLeft
                    size={24}
                    onClick={() => navigate(-1)}
                    className="cursor-pointer"
                  />
                  <h1 className="text-xl font-onest tracking-tight font-semibold">
                    Things to remember
                  </h1>
                </div>
                <div className="flex  items-center gap-4 ">
                  <div className="flex items-center space-x-2">
                    <p className="flex justify-center items-center w-6 h-6 text-xs bg-black text-white rounded-full">
                      1
                    </p>
                    <h1>Remember</h1>
                  </div>
                  <div className="w-full h-px bg-[#E0E0E0] px-8 "></div>
                  <div className="flex items-center space-x-2 opacity-30">
                    <p className="flex justify-center items-center w-6 h-6 text-xs bg-black text-white rounded-full">
                      2
                    </p>
                    <h1>Payment</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-full h-px bg-[#E0E0E0] my-[28px] px-4"></div>
            <div className="flex flex-col space-y-10">

              <div className="flex gap-3">
                <div className="lg:max-w-[318px] flex  rounded-2xl space-x-3 ">
                  <div className="flex flex-row items-center justify-center h-[42px] w-[42px] rounded-xl bg-[#F5F5EF]">
                    <LuMusic4 size={22} color="black" />
                  </div>
                </div>
                <div className=" space-y-[6px]">
                  <h1 className="text-sm font-semibold tracking-[-1%]">
                    Music
                  </h1>
                  <p className="text-xs leading-5 ">
                    Please be considerate of your neighbors and mindful of noise
                    levels. Noise violations may result in fines. Please also
                    note we do not provide speakers or sound systems.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="lg:max-w-[318px] flex  rounded-2xl space-x-3 ">
                  <div className="flex flex-row items-center justify-center h-[42px] w-[42px] rounded-xl bg-[#F5F5EF]">
                    <TbSmoking size={22} color="black" />
                  </div>
                </div>
                <div className=" space-y-[6px]">
                  <h1 className="text-sm font-semibold tracking-[-1%]">
                    Smoking
                  </h1>
                  <p className="text-xs leading-5 ">
                    This is a smoke-free home. Violation of the no-smoking
                    policy will result in a $500 fee for additional cleaning and
                    other related costs, in addition to the Guest being
                    responsible for any damages attributable to smoking beyond
                    said fee.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="lg:max-w-[318px] flex  rounded-2xl space-x-3 ">
                  <div className="flex flex-row items-center justify-center h-[42px] w-[42px] rounded-xl bg-[#F5F5EF]">
                    <PiDog size={22} color="black" />
                  </div>
                </div>
                <div className=" space-y-[6px]">
                  <h1 className="text-sm font-semibold tracking-[-1%]">Pets</h1>
                  <p className="text-xs leading-5 ">
                    Please be considerate of your neighbors and mindful of noise
                    levels. Noise violations may result in fines. Please also
                    note we do not provide speakers or sound systems.
                  </p>
                </div>
              </div>
              <div className="min-w-full h-px bg-[#E0E0E0] my-[22px] px-4"></div>

              <p className="text-xs leading-6 ">
                By clicking the button below, I agree to Luxury {`Lodging's`}{" "}
                terms & conditions, guest agreement and cancellation policy, I
                am aware that I must be at least 21 to book this stay. I agree
                to pay the total amount shown, which includes service fees.{" "}
                <Link to="/contact" className="underline">
                  Contact us &nbsp;
                </Link>
                if you have any questions!
              </p>
              <div className="absolute  lg:relative bottom-0  md:pt-56">
                <button
                  onClick={() => handleAgreeAndContinue()}
                  className="py-3 px-7 bg-[#333333] text-white rounded-[14px] flex items-center justify-center font-inter font-semibold text-[13px] h-[40px] w-[179px]"
                >
                  Agree and continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>

    // </div>
  );
};

export default BookingListing;
