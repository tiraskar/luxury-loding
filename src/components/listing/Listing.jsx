import { useState } from "react";
import { GoDotFill } from "react-icons/go";
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
import { toast } from "react-toastify";
import ListingInfoSkeleton from "../ui/ListingInfoSkeleton";
import AmenitiesPopup from "./AmenitiesPopup";
import SingleImageOnSlide from "./SingleImageOnSlide";

const tabs = [
  "Description",
  "Details",
  "House Rules",
  "Reviews",
  "Availability",
];

const Listing = () => {
  const {
    listingInfo = {},
    loading,
    listingReviews,
    isSearchOnSingleListing,
    isFetchListingInfo,
    isAllAmenitiesOpen,
    isCalenderLoading
  } = useSelector((state) => state.listing);
  const [activeTab, setActiveTab] = useState("");

  const [isViewAllImageOpen, setIsviewAllImageOpen] = useState(false);
  const [isViewSingleImageOnSlide, setIsviewSingleImageOnSlide] = useState(false);
  const [imageViewIndex, setImageViewIndex] = useState(0)
  if (loading || isCalenderLoading) {
    return <div className="text-center">Loading...</div>;
  }

  const images = listingInfo?.images || [];
  const listingAmenities = listingInfo?.amenities || [];
  // const bookingTerms = listingInfo?.terms || {};
  // const listingReviews = listingInfo?.reviews || [];

  // const componentMapping = {
  //   "Description": <ListingDescription listingInfo={listingInfo} />,
  //   "Details": <ListingDetails listingAmenities={listingAmenities} />,
  //   "House Rules": <ListingBookingTerms />,
  //   "Reviews": <ListingReviews listingReviews={listingReviews} />,
  //   "Availability": <ListingAvailability />,
  // };

  const baseUrl = `${window.location.origin}${import.meta.env?.BASE_URL}`;
  const handleCopyUrl = () => {
    toast.dismiss();
    navigator.clipboard
      .writeText(`${baseUrl}listings/${listingInfo.id}`)
      .then(() => {
        toast.success("URL copied to clipboard!");
      });
  };

  return (
    <div>
      {isSearchOnSingleListing && <ListingList />}
      <div className="absolute top-0 text-black bg-buttonPrimary z-50 h-[500px]">
        {isViewAllImageOpen && (
          <ListingImages
            images={images}
            setIsviewAllImageOpen={setIsviewAllImageOpen}
          />
        )}
      </div>
      {isViewSingleImageOnSlide && (
        <SingleImageOnSlide
          images={images}
          imageIndex={imageViewIndex}
          setIsviewSingleImageOnSlide={setIsviewSingleImageOnSlide}
          setImageViewIndex={setImageViewIndex}
        />
      )}
      {
        isFetchListingInfo ?
          <ListingInfoSkeleton />
          :
          <Wrapper>
            <div className="font-inter tracking-[-1%] space-y-[30px]">
              <div className="flex flex-wrap md:flex-nowrap gap-y-6 md:gap-y-0 xs:justify-between">
                <div className="flex flex-col gap-y-3 xs:gap-y-4 sm:gap-y-5 lg:gap-y-6">
                  <h1 className=" text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-[35px] font-semibold md:leading-[40px] lg:leading-[44.62px] font-onest tracking-tight  ">
                    {listingInfo?.name}
                  </h1>
                  <p className="flex items-center text-sm text-[#A1A196] gap-1 h-[17px]">
                    {/* {listingInfo?.address}{" "} */}
                    {listingInfo?.city}, {listingInfo?.state}{" "}

                    <div className="hidden xs:flex items-center text-xs sm:text-sm">
                      <GoDotFill className="text-black text-[8px]" />
                      <a className="text-black underline cursor-pointer "
                        href="#listing_reviews"
                      >
                        {" "}
                        {listingReviews.length} reviews
                      </a>
                    </div>
                  </p>
                  <div className=" xs:hidden flex items-center text-xs sm:text-sm">
                    <GoDotFill className="text-black text-[8px]" />
                    <a className="text-black underline cursor-pointer "
                      href="#listing_reviews"
                    >
                      {" "}
                      {listingReviews.length} reviews
                    </a>
                  </div>
                </div>
                <div className="flex flex-row h-fit">

                  <button
                    onClick={() => handleCopyUrl()}
                    className="text-black bg-white border-[0.6px] border-[#D7DBE8] rounded-xl px-4 py-4  flex items-center justify-center text-[13px] font-medium w-[95px] md:w-[105px] gap-x-2 h-[40px] md:h-[43px]"
                  >
                    <LuShare2 className=" size-4 md:size-5" /> <span>Share</span>
                  </button>
                </div>
              </div>

              <div className="relative grid md:grid-cols-2 gap-x-1 md:gap-x-3">
                <div className="min-h-full rounded-md hidden md:block sm:rounded-xl">
                  {images[0] && (
                    <img
                      onClick={() => {
                        setImageViewIndex(0);
                        setIsviewSingleImageOnSlide(true);
                      }}
                      src={images[0]?.url}
                      alt="Listing Image"
                      className="rounded-md sm:rounded-xl h-full w-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-y-1.5 md:gap-y-3">
                  {images[1] && (
                    <img
                      onClick={() => {
                        setImageViewIndex(1);
                        setIsviewSingleImageOnSlide(true);
                      }}
                      src={images[1]?.url}
                      alt="Listing Image"
                      className="rounded-md sm:rounded-xl md:max-h-[310px] object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="grid grid-cols-2 gap-x-1.5 md:gap-x-3">
                    {images[2] && (
                      <img
                        src={images[2]?.url}
                        onClick={() => {
                          setImageViewIndex(2);
                          setIsviewSingleImageOnSlide(true);
                        }}
                        alt="Listing Image"
                        className="rounded-md sm:rounded-xl w-full h-full object-cover max-h-[217px] lg:w-[321px] md:h-[170px]"
                        loading="lazy"
                      />
                    )}
                    {images[3] && (
                      <img
                        onClick={() => {
                          setImageViewIndex(3);
                          setIsviewSingleImageOnSlide(true);
                        }}
                        src={images[3]?.url}
                        alt="Listing Image"
                        className="rounded-md sm:rounded-xl w-full h-full object-cover md:h-[170px]  max-h-[217px]"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsviewAllImageOpen(true)}
                  className="flex space-x-2 absolute text-xs bg-black text-white px-4 py-2 rounded-2xl bottom-2 right-2 bg-opacity-60 cursor-pointer"
                >
                  <IoImageOutline className="w-4 h-4 font-onest" />{" "}
                  <span>View all photos</span>
                </button>
              </div>

              <div className="flex space-x-2 text-[#333333]">
                <div className="flex gap-1 border border-[#333333] px-2 py-1 items-center rounded-2xl text-sm">
                  <LuUsers size={14} />
                  {listingInfo.personCapacity}{" "}
                  {listingInfo?.personCapacity > 1 ? "guests" : "guest"}
                </div>

                <div className="flex gap-1 border border-[#333333] px-2 py-1 items-center rounded-2xl text-sm">
                  <TbBed size={14} />
                  {listingInfo.bedroomsNumber}{" "}
                  {listingInfo?.bedroomsNumber > 1 ? "bedrooms" : "bedroom"}
                </div>

                <div className="flex gap-1 border border-[#333333] px-2 py-1 items-center rounded-2xl text-sm">
                  <LuBath size={14} />
                  {listingInfo.bathroomsNumber}{" "}
                  {listingInfo?.bathroomsNumber > 1 ? "baths" : "bath"}
                </div>
              </div>
              <div className=" lg:grid lg:grid-cols-2">
                <div className="h-fit space-y-8">
                  <ListingTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                  {/* <Wrapper>
                    {activeTab === "" ? (
                      <div className="space-y-8">
                        {Object.values(componentMapping)?.map(
                          (Component, index, arr) => (
                            <div key={index} className="space-y-10">
                              {Component}
                              {index !== arr.length - 1 && (
                                <div className="relative min-w-full h-px bg-[#E0E0E0]"></div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      componentMapping[activeTab]
                    )}
                  </Wrapper> */}
                  <ListingDescription
                    listingInfo={listingInfo}
                    className={`${["Details", "House Rules", "Reviews", "Availability"].includes(activeTab) ? "hidden" : "block"}`}
                  />
                  <div
                    className={`min-w-full h-px bg-[#E0E0E0] ${["House Rules", "Reviews", "Availability"].includes(activeTab) ? "hidden" : "block"}`}
                  // className="relative min-w-full h-px bg-[#E0E0E0]"
                  ></div>
                  <ListingDetails
                    listingAmenities={listingAmenities}
                    className={`${["House Rules", "Reviews", "Availability"].includes(activeTab) ? "hidden" : "block"}`}
                  />
                  <div className={` min-w-full h-px bg-[#E0E0E0] ${["Reviews", "Availability"].includes(activeTab) ? "hidden" : "block"}`}
                  // className="relative min-w-full h-px bg-[#E0E0E0]"
                  ></div>
                  <ListingBookingTerms
                    listingHouseRule={listingInfo.houseRules}
                    className={`${["Reviews", "Availability"].includes(activeTab) ? "hidden" : "block"}`}
                  />
                  <div
                    className={`min-w-full h-px bg-[#E0E0E0] ${activeTab == "Availability" ? "hidden" : "block"}`}
                  // className="relative min-w-full h-px bg-[#E0E0E0]"
                  ></div>
                  <ListingReviews
                    className={`${activeTab == "Availability" ? "hidden" : "block"}`}
                  />
              <div className="relative min-w-full h-px bg-[#E0E0E0]"></div>
                  <ListingAvailability
                  />
                </div>
                <div className="sm:flex sm:justify-center lg:justify-end h-fit pt-10 lg:pt-5 sticky top-0 z-10">
                  {listingInfo?.id && <BookApartment listingInfo={listingInfo} />}
                </div>

              </div>
            </div>
            {isAllAmenitiesOpen && <AmenitiesPopup listingAmenities={listingAmenities} />}
          </Wrapper>
      }
    </div>
  );
};

export default Listing;
