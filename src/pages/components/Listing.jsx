import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { BookApartment, Wrapper } from "../../components";
import { FaRegHeart } from "react-icons/fa";
import { LuBath, LuShare2, LuUsers } from "react-icons/lu";
import { TbBed } from "react-icons/tb";
import ListingTabs from "../../components/ListingTabs";
import ListingDetails from "../../components/ListingDetails";
import ListingDescription from "../../components/ListingDescription";
import ListingBookingTerms from "../../components/ListingBookingTerms";
import ListingReviews from "../../components/ListingReviews";
import ListingAvailability from "../../components/ListingAvailability";

const tabs = [
  'Description',
  'Details',
  'Booking Terms',
  'Reviews',
  'Availability',
];

const componentMapping = {
  'Description': <ListingDescription />,
  'Details': <ListingDetails />,
  'Booking Terms': <ListingBookingTerms />,
  'Reviews': <ListingReviews />,
  'Availability': <ListingAvailability />,
};

const Listing = () => {

  const [activeTab, setActiveTab] = useState('');

  return (
    <Wrapper>
      <div className="font-inter tracking-[-1%] space-y-[30px]">
        <div className="flex flex-wrap gap-y-6 md:gap-y-0 md:justify-between">
          <div className="flex flex-col gap-y-6">
            <h1 className="text-[35px] font-semibold leading-[44.62px] font-onest tracking-tight">Pool, Hot tub, Game Room! Mesa Family Retreat</h1>
            <p className="flex items-center text-xs text-[#A1A196] gap-1">
              3891 Ranchview Dr. Richardson, California 62639 <GoDotFill className="text-black text-[8px]" />
              <span className="text-black">25 reviews</span>
            </p>
          </div>
          <div className="flex flex-row gap-x-3">
            <button className="text-black bg-white border-[0.6px] border-[#D7DBE8] rounded-xl px-4 py-4 h-fit flex items-center justify-center text-[13px] font-medium w-[100px] gap-x-2">
              <FaRegHeart size={20} /> Save
            </button>
            <button className="text-black bg-white border-[0.6px] border-[#D7DBE8] rounded-xl px-4 py-4 h-fit flex items-center justify-center text-[13px] font-medium w-[100px] gap-x-2">
              <LuShare2 size={20} /> Share
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-1 md:gap-x-3">
          <img src="/images/single-listing-one.png" alt="" className="rounded-md sm:rounded-xl" />
          <div className="flex flex-col gap-y-1.5 md:gap-y-3">
            <img src="/images/single-listing-two.png" alt="" className="rounded-md sm:rounded-xl" />
            <div className="grid grid-cols-2 gap-x-1.5 md:gap-x-3">
              <img src="/images/single-listing-three.png" alt="" className="rounded-md sm:rounded-xl" />
              <img src="/images/single-listing-four.png" alt="" className="rounded-md sm:rounded-xl" />
            </div>
          </div>
        </div>

        <div className="flex space-x-2 text-[#333333]">
          <div className="flex gap-1 border border-[#333333] px-2 py-1 items-center rounded-2xl text-sm">
            <LuUsers size={14} />
            {/* {guests} {guests > 1 ? "guests" : "guest"} */}
            6 guests
          </div>
          <div className="flex gap-1 border border-[#333333] px-2 py-1 items-center rounded-2xl text-sm">
            <TbBed size={14} />
            {/* {bedrooms} {bedrooms > 1 ? "bedrooms" : "bedroom"} */}
            3 bedrooms
          </div>
          <div className="flex gap-1 border border-[#333333] px-2 py-1 items-center rounded-2xl text-sm">
            <LuBath size={14} />
            {/* {baths} {baths > 1 ? "baths" : "bath"} */}
            2 baths
          </div>
        </div>


        <div className="grid lg:grid-cols-2">
          <div className="h-fit space-y-8">
            <ListingTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <Wrapper>
              {activeTab === '' ? (
                <div className="space-y-8">
                  {Object.values(componentMapping).map((Component, index, arr) => (<div key={index} className="space-y-10">
                    {Component}
                    {index !== arr.length - 1 && (
                      <div className="relative min-w-full h-px bg-[#E0E0E0]"></div>
                    )}
                  </div>
                  ))}
                </div>
              ) : (
                componentMapping[activeTab]
              )}
            </Wrapper>
            {/* <ListingDescription />
            <div className="relative min-w-full h-px bg-[#E0E0E0]"></div>
            <ListingDetails />
            <div className="relative min-w-full h-px bg-[#E0E0E0]"></div>
            <ListingBookingTerms />
            <div className="relative min-w-full h-px bg-[#E0E0E0]"></div>
            <ListingReviews />
            <div className="relative min-w-full h-px bg-[#E0E0E0]"></div>
            <ListingAvailability /> */}
          </div>
          <div className="flex justify-center lg:justify-end h-fit">
            <BookApartment />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Listing;