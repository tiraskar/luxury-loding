import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { LuBath, LuUsers } from "react-icons/lu";
import { TbBed } from "react-icons/tb";
import { toggleIsSearchedOnSingleListing } from "../../redux/slices/listingSlice";
import { useDispatch, useSelector } from "react-redux";


const RenderListings = ({ listingList }) => {

  const { isMapViewOpen } = useSelector(state => state.listing)

  const dispatch = useDispatch()
  const [currentIndex, setCurrentIndex] = useState(
    Array(listingList?.length).fill(0)
  );

  const handleSlide = (listingIndex, direction) => {
    const imagesCount = listingList[listingIndex].images.length;
    setCurrentIndex((prev) => {
      const newIndex = [...prev];
      newIndex[listingIndex] =
        (newIndex[listingIndex] + direction + imagesCount) % imagesCount;
      return newIndex;
    });
  };

  const setSlide = (listingIndex, index) => {
    setCurrentIndex((prev) => {
      const newIndex = [...prev];
      newIndex[listingIndex] = index;
      return newIndex;
    });
  };

  useEffect(() => {
    if (listingList.length > 0) {
      setCurrentIndex(Array(listingList?.length).fill(0));
    }
  }, [listingList]);

  return (
    <div className={`${isMapViewOpen ? " grid grid-cols-1 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-col lg:space-y-4 gap-y-[56px] lg:gap-y-4" : "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[56px]"} gap-x-4 `}>
      {listingList?.map((listing, listingIndex) => {
        return (
          <div
            key={listingIndex}
            className={`relative ${isMapViewOpen ? " lg:grid lg:grid-cols-5 gap-4 lg:space-y-0 space-y-4" : "flex flex-col xl:max-w-[318px] gap-y-4"}`}
          >
            <div className="relative flex overflow-hidden md:col-span-2">
              {listing?.images?.map((data, index) => {
                return (
                  <div
                    key={index}
                    className={`snap-start flex-shrink-0 w-full transition-transform duration-300
                 ${index === currentIndex[listingIndex] ? "block" : "hidden"
                      }`}
                  >
                    <img
                      className={` object-cover w-full rounded-xl ${isMapViewOpen ? "  lg:h-[150px] " : "md:h-[241px] md:max-h-[241px]"}`}
                      src={data.url}
                      alt=""
                      loading="lazy"
                      
                    />
                  </div>
                );
              })}

              {listing?.images?.length > 1 && (
                <div className="absolute inset-0 flex justify-between items-center">
                  <div
                    className="absolute left-3 top-[50%] transform -translate-y-1/2 text-black h-6 w-6 bg-white bg-opacity-60 items-center flex justify-center rounded-full cursor-pointer"
                    onClick={() => handleSlide(listingIndex, -1)}
                  >
                    <IoIosArrowBack size={14} />
                  </div>
                  <div
                    className="absolute right-3 top-[50%] transform -translate-y-1/2 text-black h-6 w-6 bg-white bg-opacity-60 items-center flex justify-center rounded-full cursor-pointer"
                    onClick={() => handleSlide(listingIndex, 1)}
                  >
                    <IoIosArrowForward size={14} />
                  </div>
                  <div className="absolute bottom-2 flex justify-center w-full">
                    {listing?.images?.map((_, index) => (
                      <GoDotFill
                        key={index}
                        size={14}
                        onClick={() => setSlide(listingIndex, index)}
                        className={`cursor-pointer text-white mx-px ${index === currentIndex[listingIndex]
                          ? "opacity-100"
                          : "opacity-60"
                          }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* {listing.featured && (
              <p className="absolute tracking-[-1%] bg-white px-3 py-1.5 rounded-lg top-5 left-5 md:top-2 mg:left-2">
                Featured
              </p>
            )} */}

            {/* <p className="flex items-baseline space-x-1 text-xs text-[#0094FF] h-[15px]">
              <GrLocation /> <span>{listing.address}</span>
            </p> */}
            <div className="flex flex-col  md:col-span-3 space-y-2">
              <div className="flex flex-col gap-4 text-[#333333] font-inter text-lg font-semibold">
                <Link
                  to={`/listings/${listing.id}`}
                  onClick={() => dispatch(toggleIsSearchedOnSingleListing(false))}
                  className="text-[18px] font-inter tracking-[-1%] leading-6 line-clamp-2"
                >
                  {listing.name}
                </Link>
                <p className="line-clamp-2 text-[#8E8E80] leading-[20px] font-normal text-[13px] h-[40px]">
                  {listing.description}
                </p>
              </div>

              <div className="flex gap-x-3 text-[#7B6944] items-center font-inter tracking-[-1%]  text-[13px]">

                <div className="flex gap-1 items-center">
                  <LuUsers size={14} /> {listing.personCapacity}
                  {listing.personCapacity > 1 ? " guests" : " guest"}
                </div>

                <div className="flex gap-1 items-center">
                  <TbBed size={14} /> {listing.bedroomsNumber}
                  {listing.bedroomsNumber > 1 ? " bedrooms" : " bedroom"}
                </div>


                <div className="flex gap-1 items-center">
                  <LuBath size={14} /> {listing.bathroomsNumber}
                  {listing.bathroomsNumber > 1 ? " baths" : " bath"}
                </div>
              </div>
            </div>

            {/* <div className="flex items-center">
              <p className="text-[#333333] font-bold text-xl h-7">${listing.price}</p>
              <p className="text-[#8E8E80] text-sm tracking-tight h-[17px]">
                &nbsp;/ per night
              </p>
            </div> */}
          </div>
        );
      })}
    </div>
  );
};

RenderListings.propTypes = {
  listingList: PropTypes.array.isRequired,
};

export default RenderListings;