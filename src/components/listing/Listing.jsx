import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { LuBath, LuShare2, LuUsers } from "react-icons/lu";
import { TbBed } from "react-icons/tb";
import ListingTabs from "./ListingTabs";
import ListingDetails from "./ListingDetails";
import ListingDescription from "./ListingDescription";
import ListingBookingTerms from "./ListingBookingTerms";
import ListingReviews from "./ListingReviews";
import ListingAvailability from "./ListingAvailability";
import Wrapper from "../common/Wrapper";
import BookApartment from "../booking/BookApartment";
import { useSelector } from "react-redux";
import { IoImageOutline } from "react-icons/io5";
import ListingImages from "./ListingImages";
import ListingList from "./ListingList";


const tabs = [
  'Description',
  'Details',
  'Booking Terms',
  'Reviews',
  'Availability',
];

const Listing = () => {

  const { listingInfo = {}, loading, listingReviews, isSearchOnSingleListing } = useSelector(state => state.listing);
  const [activeTab, setActiveTab] = useState('');

  const [isViewAllImageOpen, setIsviewAllImageOpen] = useState(false);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  const images = listingInfo?.images || [];
  const listingAmenities = listingInfo?.amenities || [];
  const bookingTerms = listingInfo?.terms || {};
  // const listingReviews = listingInfo?.reviews || [];

  const componentMapping = {
    'Description': <ListingDescription listingInfo={listingInfo} />,
    'Details': <ListingDetails listingAmenities={listingAmenities} />,
    'Booking Terms': <ListingBookingTerms bookingTerms={bookingTerms} />,
    'Reviews': <ListingReviews listingReviews={listingReviews} />,
    'Availability': <ListingAvailability />,
  };

  return (
    <div>
      {isSearchOnSingleListing && <ListingList />}
      <div className="absolute top-0 text-black bg-buttonPrimary z-50 h-[500px]">
        {isViewAllImageOpen &&
          <ListingImages
            images={images}
            setIsviewAllImageOpen={setIsviewAllImageOpen}
          />}
      </div>
    <Wrapper>
      <div className="font-inter tracking-[-1%] space-y-[30px]">
          <div className="flex flex-wrap md:flex-nowrap gap-y-6 md:gap-y-0 md:justify-between">
          <div className="flex flex-col gap-y-6">
              <h1 className=" text-3xl lg:text-[35px] font-semibold leading-[44.62px] font-onest tracking-tight ">{listingInfo?.name}</h1>
            <p className="flex items-center text-xs text-[#A1A196] gap-1">
                {listingInfo?.address} <GoDotFill className="text-black text-[8px]" />
                <span className="text-black"> {listingReviews.length} reviews</span>
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

          <div className="relative grid md:grid-cols-2 gap-x-1 md:gap-x-3">
            <div className="min-h-full rounded-md hidden md:block sm:rounded-xl">
              {images[0] && <img src={images[0]?.url} alt="Listing Image" className="rounded-md sm:rounded-xl h-full w-full object-fill" />}
            </div>
          <div className="flex flex-col gap-y-1.5 md:gap-y-3">
              {images[1] && <img src={images[1]?.url} alt="Listing Image" className="rounded-md sm:rounded-xl" />}
            <div className="grid grid-cols-2 gap-x-1.5 md:gap-x-3">
                {images[2] && <img src={images[2]?.url} alt="Listing Image" className="rounded-md sm:rounded-xl" />}
                {images[3] && <img src={images[3]?.url} alt="Listing Image" className="rounded-md sm:rounded-xl" />}
            </div>
          </div>
            <button onClick={() => setIsviewAllImageOpen(true)} className="flex space-x-2 absolute text-xs bg-black text-white px-4 py-2 rounded-2xl bottom-2 right-2 bg-opacity-60 cursor-pointer">
              <IoImageOutline className="w-4 h-4 font-onest" /> <span>View all photos</span>
            </button>
        </div>

          <div className="flex space-x-2 text-[#333333]">

              <div className="flex gap-1 border border-[#333333] px-2 py-1 items-center rounded-2xl text-sm">
                <LuUsers size={14} />
                {listingInfo.guestsIncluded} {listingInfo?.guestsIncluded > 1 ? "guests" : "guest"}
            </div>

              <div className="flex gap-1 border border-[#333333] px-2 py-1 items-center rounded-2xl text-sm">
                <TbBed size={14} />
              {listingInfo.bedroomsNumber} {listingInfo?.bedroomsNumber > 1 ? "bedrooms" : "bedroom"}
            </div>

              <div className="flex gap-1 border border-[#333333] px-2 py-1 items-center rounded-2xl text-sm">
                <LuBath size={14} />
              {listingInfo.bathroomsNumber} {listingInfo?.bathroomsNumber > 1 ? "baths" : "bath"}
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
                    {Object.values(componentMapping)?.map((Component, index, arr) => (
                      <div key={index} className="space-y-10">
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
              {listingInfo.id && <BookApartment
                listingInfo={listingInfo}
              />}
          </div>
        </div>
      </div>
    </Wrapper>
    </div >
  );
};

export default Listing;