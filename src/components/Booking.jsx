import { LuBath, LuUser2, LuUsers } from "react-icons/lu";
import { TbBed } from "react-icons/tb";
import { GrLocation } from "react-icons/gr";
import { CiCalendar } from "react-icons/ci";

const Booking = () => {

  const bookingData = {
    image: '/images/listing-one.png',
    location: "Arizona, United States of America",
    title: "Cozy Cabin Retreat in Sedona's Red Rocks",
    description: "Enjoy a tranquil escape in Sedona's red rock country, offering breathtaking views and serene hiking trails.",
    guest: 3,
    bedroom: 2,
    bath: 2,
    rate: 200,
    duration: "per night",
    featured: false
  };

  return (
    <div className="bg-[#F9F9F9] pl-12 lg:pr-20 lg:min-w-[669px] min-h-screen tracking-[-1%] pt-[97px] pb-40">
      <div className="flex gap-4">
        <div>
          <img src={bookingData.image} alt="" className="w-full lg:max-w-[207px] rounded-xl" />
        </div>
        <div className="flex flex-col space-y-5">
          <p className="flex flex-row items-center text-[#0094FF] space-x-1.5"><GrLocation />{bookingData.location}</p>
          <h1>{bookingData.title}</h1>
          <div className="flex gap-x-3 text-[#8E8E80] items-center font-inter ">
            <div className="flex gap-1 items-center rounded-2xl text-[13px]">
              <LuUsers size={14} /> {bookingData.guest} {bookingData.guest > 1 ? 'guests' : 'guest'}
            </div>
            <div className="flex gap-1 items-center rounded-2xl text-[13px]">
              <TbBed size={14} /> {bookingData.bedroom} {bookingData.bedroom > 1 ? 'bedrooms' : 'bedroom'}

            </div>
            <div className="flex gap-1 items-center rounded-2xl text-[13px]">
              <LuBath size={14} /> {bookingData.bath} {bookingData.bath > 1 ? 'baths' : 'bath'}
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-[#333333] font-bold text-xl">${bookingData.rate}</p>
            <p className="text-[#8E8E80] text-sm tracking-tight">&nbsp;/ {bookingData.duration}</p>
          </div>
        </div>
      </div>
      <div className="min-w-full h-px bg-[#E0E0E0] my-8 px-4 "></div>

      <div className="max-w-[396px]">
        <h1 className="font-onest tracking-normal font-medium text-xl pb-6">Book apartment</h1>
        <div className="space-y-2 ">
          <div className="grid grid-cols-2 gap-[10px]">
            <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px] ">
              <p className="flex text-[#8A8A8A] space-x-2 items-center">
                <CiCalendar size={18} /> <p>Check in</p>
              </p>
              <p className="font-semibold pl-6">14.08.2024</p>
            </div>
            <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px]">
              <p className="flex text-[#8A8A8A] space-x-2 items-center">
                <CiCalendar size={18} /> <p>Check out</p>
              </p>
              <p className="font-semibold pl-6">14.08.2024</p>
            </div>
          </div>

          <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px] ">
            <p className="flex text-[#8A8A8A] space-x-2 items-center">
              <LuUser2 size={18} /> <p>Guests</p>
            </p>
            <p className="font-semibold pl-6">3 Guests</p>
          </div>

        </div>
        <div className="flex flex-col space-y-6 my-10">
          {extraCharge.map(({ title, charge }, index) => {
            return (
              <div key={index} className="flex items-center">
                <p className="pr-4">{title}</p>
                <div className="flex-grow flex space-x-2 items-center">
                  <div className="border-t border-dashed border-[#D3D3D3] flex-grow opacity-60" />
                </div>
                <p className="pl-4">${charge}</p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between">
          <p className="text sm font-[#8E8E80]">Total</p>
          <p className="text-2xl font-bold text-[#333333]">$220.00</p>
        </div>
        <p className="text-[#666666] mt-10">Any question? Call us <span className="text-black">(877) 640-8777</span></p>
      </div>
    </div>
  );
};

export default Booking;

const extraCharge = [
  {
    title: "Rent",
    charge: 20,
  },
  {
    title: "Cleaning fee",
    charge: 35,
  },
  {
    title: "Taxes",
    charge: 25,
  }
];