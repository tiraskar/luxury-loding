import { LuBath, LuUser2, LuUsers } from "react-icons/lu";
import { TbBed } from "react-icons/tb";
import { GrLocation } from "react-icons/gr";
import { CiCalendar } from "react-icons/ci";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";

const Booking = () => {

  const { listingInfo } = useSelector(state => state.listing);
  const { bookingPrice } = useSelector(state => state.booking);

  const images = listingInfo?.images || [];

  const guestNumber = localStorage?.getItem('guests');
  const bookingCheckIn = localStorage?.getItem('checkIn');
  const bookingCheckOut = localStorage?.getItem('checkOut');

  return (
    <div className="space-y-8 px-1 xs:px-2 sm:px-0 pt-5">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="lg:max-h-[145px] sm:max-w-[350px] lg:max-w-[207px]">
          <img src={images[0]?.url} alt="" className="w-full h-full object-cover rounded-xl" />
        </div>
        <div className="flex flex-col space-y-5">
          <div className="flex flex-row items-center text-[#0094FF] space-x-1 text-xs"><GrLocation />
            <p className="h-[15px]">{listingInfo.address}</p>
          </div>

          <h1 className="text-[1rem] font-inter tracking-[-1%] font-semibold leading-[22px]">
            {listingInfo.name}
          </h1>

          <div className="flex flex-col space-y-3">
            <div className="flex gap-x-3 text-[#8E8E80] items-center font-inter ">
              <div className="flex gap-1 items-center rounded-2xl text-[13px]">
                <LuUsers size={14} /> {listingInfo.guestsIncluded} {listingInfo.guestsIncluded > 1 ? 'guests' : 'guest'}
              </div>

              <div className="flex gap-1 items-center rounded-2xl text-[13px]">
                <TbBed size={14} /> {listingInfo.bedroomsNumber} {listingInfo.bedroomsNumber > 1 ? 'bedrooms' : 'bedroom'}

              </div>
              <div className="flex gap-1 items-center rounded-2xl text-[13px]">
                <LuBath size={14} /> {listingInfo.bathroomsNumber} {listingInfo.bathroomsNumber > 1 ? 'baths' : 'bath'}
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-[#333333] font-bold text-xl">${listingInfo.price}</p>
              <p className="text-[#8E8E80] text-sm tracking-tight">&nbsp;/ per night</p>
            </div>
          </div>
        </div>
      </div>
      <div className="min-w-full h-px bg-[#E0E0E0] my-8 px-4 "></div>
      <div className="max-w-[396px]">
        <h1 className="font-onest tracking-normal font-medium text-xl pb-6">Book {listingInfo.propertyType}</h1>
        <div className="space-y-2 ">

          <div className="grid grid-cols-2 gap-[10px]">
            <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px] ">
              <p className="flex text-[#8A8A8A] space-x-2 items-center">
                <CiCalendar size={18} /> <p>Check in</p>
              </p>
              <p className="font-semibold pl-6">
                <DatePicker
                  selected={bookingCheckIn}
                  readOnly
                  dateFormat="dd.MM.YYYY"
                  placeholderText="DD.MM.YYYY"
                  className="outline-none max-w-[117px] bg-white"
                />
                {/* {checkBookingParams?.checkIn} */}
              </p>
            </div>
            <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px]">
              <p className="flex text-[#8A8A8A] space-x-2 items-center">
                <CiCalendar size={18} /> <p>Check out</p>
              </p>
              <p className="font-semibold pl-6">
                <DatePicker
                  selected={bookingCheckOut}
                  readOnly
                  dateFormat="dd.MM.YYYY"
                  placeholderText="DD.MM.YYYY"
                  className="outline-none max-w-[117px] bg-white"
                />
              </p>
            </div>
          </div>

          <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px] ">
            <p className="flex text-[#8A8A8A] space-x-2 items-center">
              <LuUser2 size={18} /> <p>Guests</p>
            </p>
            <p className="font-semibold pl-6">{guestNumber}&nbsp;{guestNumber > 1 ? "Guests" : "Guest"}</p>
          </div>

        </div>
        <div className="flex flex-col space-y-6 my-10">
          {bookingPrice?.components?.price?.map(({ title, total }, index) => {
            return (
              <div key={index} className="flex items-center">
                <p className="pr-4">{title}</p>
                <div className="flex-grow flex space-x-2 items-center">
                  <div className="border-t border-dashed border-[#D3D3D3] flex-grow opacity-60" />
                </div>
                <p className="pl-4">${total}</p>
              </div>
            );
          })}
          {bookingPrice?.components?.fee?.map(({ title, total }, index) => {
            return (
              <div key={index} className="flex items-center">
                <p className="pr-4">{title}</p>
                <div className="flex-grow flex space-x-2 items-center">
                  <div className="border-t border-dashed border-[#D3D3D3] flex-grow opacity-60" />
                </div>
                <p className="pl-4">${total}</p>
              </div>
            );
          })
          }
          {bookingPrice?.components?.tax?.map(({ title, total }, index) => {
            return (
              <div key={index} className="flex items-center">
                <p className="pr-4">{title}</p>
                <div className="flex-grow flex space-x-2 items-center">
                  <div className="border-t border-dashed border-[#D3D3D3] flex-grow opacity-60" />
                </div>
                <p className="pl-4">${total}</p>
              </div>
            );
          })
          }
          {bookingPrice?.components?.discount?.map(({ title, total }, index) => {
            return (
              <div key={index} className="flex items-center">
                <p className="pr-4">{title}</p>
                <div className="flex-grow flex space-x-2 items-center">
                  <div className="border-t border-dashed border-[#D3D3D3] flex-grow opacity-60" />
                </div>
                <p className="pl-4">${total}</p>
              </div>
            );
          })
          }
        </div>

        <div className="flex justify-between">
          <p className="text sm font-[#8E8E80]">Total</p>
          <p className="text-2xl font-bold text-[#333333]">${bookingPrice.totalPrice}</p>
        </div>
        <p className="text-[#666666] mt-10">Any question? Call us
          <a href="tel:+8776408777" className="text-black cursor-pointer">(877) 640-8777</a></p>
      </div>
    </div>
  );
};

export default Booking;
