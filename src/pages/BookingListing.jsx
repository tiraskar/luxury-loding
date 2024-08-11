import { GoDotFill } from "react-icons/go";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { PiDog } from "react-icons/pi";
import { TbSmoking } from "react-icons/tb";
import { LuMusic4 } from "react-icons/lu";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Booking, Wrapper } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { checkListingBookingAvailability } from "../redux/slices/bookingSlice";
import LoaderScreen from "../components/ui/LoaderScreen";
import AlertDialog from "../components/ui/AlertDialog";


const BookingListing = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector(state => state.booking)

  const checkListingAvailableBeforeBooking = () => {
    const bookingAvailable = dispatch(checkListingBookingAvailability({
      listingId: Number(id),
    }));

    if (bookingAvailable) {
      navigate(`/listing/${id}/booking-confirm`);
    } else {
      return <AlertDialog
        warningMessage="Sorry, this listing is not available for booking now."
        message="This listing has been booked now. Please check for other date or try fro other listings."
        isCancel={false}
        submitText="Close"
        onCancel={() => navigate(`/listings/${id}`)}
      />
    }
  }


  return (
    <div className="flex flex-wrap md:grid md:grid-cols-9 min-h-screen">
      {loading && <LoaderScreen />}
      <div className="col-span-5 font-inter tracking-[-1%]">
        <Wrapper>
          <div className=" flex flex-col mx-auto  max-w-[652px]">
            <div className="flex flex-col justify-start lg:-ml-4">

              <div className="space-y-16">
                <p className="flex items-center text-xs text-[#A1A196] gap-1">
                  Home <GoDotFill /> Listing <GoDotFill className="text-black" />
                  <span className="text-black">Booking</span>
                </p>

                <div className="flex flex-col sm:flex-row justify-between  xl:min-w-[652px] gap-4">
                  <div className="flex items-center ">
                    <MdKeyboardArrowLeft size={24} />
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
                    <div className="w-full h-px bg-[#E0E0E0] px-4 "></div>
                    <div className="flex items-center space-x-2 opacity-30">
                      <p className="flex justify-center items-center w-6 h-6 text-xs bg-black text-white rounded-full">
                        2
                      </p>
                      <h1>Payment</h1>
                    </div>
                  </div>
                </div>
              </div>


              <div className="flex flex-col gap-y-10">

                <div className="min-w-full h-px bg-[#E0E0E0] my-[22px] px-4"></div>

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
                      Please be considerate of your neighbors and mindful of
                      noise levels. Noise violations may result in fines. Please
                      also note we do not provide speakers or sound systems.
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
                      policy will result in a $500 fee for additional cleaning
                      and other related costs, in addition to the Guest being
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
                    <h1 className="text-sm font-semibold tracking-[-1%]">
                      Pets
                    </h1>
                    <p className="text-xs leading-5 ">
                      Please be considerate of your neighbors and mindful of
                      noise levels. Noise violations may result in fines. Please
                      also note we do not provide speakers or sound systems.
                    </p>
                  </div>
                </div>
                <div className="min-w-full h-px bg-[#E0E0E0] my-[22px] px-4"></div>

                <p className="text-xs leading-6 ">
                  By clicking the button below, I agree to Luxury {`Lodging's`} terms
                  & conditions, guest agreement and cancellation policy, I am
                  aware that I must be at least 21 to book this stay. I agree to
                  pay the total amount shown, which includes service fees.{" "}
                  <Link to="/contact" className="underline">
                    Contact us
                  </Link>
                  if you have any questions!
                </p>
                <div className="hidden md:block md:pt-64">
                  <button
                    onClick={() => checkListingAvailableBeforeBooking()}
                    className="py-3 px-7 bg-[#333333] text-white rounded-[14px] ">
                    Agree and continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      <div className="col-span-4 bg-[#F9F9F9] w-full ">
        <Wrapper>
          <div className="flex mx-auto max-w-[541px] py-20">
            <Booking />
          </div>
          <div className="block md:hidden pt-10 pb-10 md:pt-64">
            <Link to={`/listing/${id}/booking-confirm`} className="py-3 px-7 bg-[#333333] text-white rounded-[14px] ">
              Agree and continue
            </Link>
          </div>
        </Wrapper>
      </div>

    </div>
  );
};

export default BookingListing;