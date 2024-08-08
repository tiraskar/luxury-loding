import { useState, useRef, useEffect } from "react";
import { LuUsers, LuBath } from "react-icons/lu";
import { TbBed } from "react-icons/tb";
import { GoDash } from "react-icons/go";
import { IoImageOutline } from "react-icons/io5";
import Wrapper from "../common/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaturedListing } from "../../redux/slices/listingSlice";
import { Link } from "react-router-dom";
import ListingImages from "../listing/ListingImages";


const Heading = () => {
  return (
    <Wrapper>
      <div className="flex sm:justify-between items-center ">
        <h1 className="text-[#333333] text-[26px] sm:text-3xl md:text-[35px] font-semibold">Our featured homes</h1>
        <button className="hidden sm:block px-5 py-3 rounded-xl text-white bg-black">View All</button>
      </div>
    </Wrapper>
  );
};



const FeaturedHomes = () => {

  const [isViewAllImageOpen, setIsviewAllImageOpen] = useState(false);

  const dispatch = useDispatch();
  const { featuredListings } = useSelector(state => state.listing)

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  const handleScroll = (index) => {
    setActiveIndex(index);
    itemRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };



  const renderFeaturedHomes = featuredListings.map(({ images, name, guestsIncluded, bathroomsNumber, bedroomsNumber, id }, index) => (
    <div
      key={name}
      className="relative flex-shrink-0 grid lg:flex snap-center w-[90%] sm:w-[90%] md:w-[90%] lg:w-[90%] xl:w-[90%] bg-cardBackgroundLight rounded-2xl p-2 sm:p-4 md:p-5 gap-4"
      ref={(el) => (itemRefs.current[index] = el)}
    >
      {isViewAllImageOpen &&
        <ListingImages
          images={images}
          setIsviewAllImageOpen={setIsviewAllImageOpen}
        />}
      <div className="flex flex-col justify-end space-y-4 sm:min-w-[400px]">
        <Link to={`/listings/${id}`} className="text-xl sm:text-2xl md:text-[28px] font-medium tracking-[-1%] lg:max-w-[365px]">{name}</Link>
        <div className="flex flex-wrap gap-2 text-[#7B6944]">
          <div className="flex gap-1 border border-[#7B6944] px-2 py-1 items-center rounded-2xl text-xs sm:text-sm">
            <LuUsers size={14} /> {guestsIncluded} {guestsIncluded > 1 ? "guests" : "guest"}
          </div>
          <div className="flex gap-1 border border-[#7B6944] px-2 py-1 items-center rounded-2xl text-xs sm:text-sm">
            <TbBed size={14} /> {bedroomsNumber} {bedroomsNumber > 1 ? "bedrooms" : "bedroom"}
          </div>
          <div className="flex gap-1 border border-[#7B6944] px-2 py-1 items-center rounded-2xl text-xs sm:text-sm">
            <LuBath size={14} /> {bathroomsNumber} {bathroomsNumber > 1 ? "baths" : "bath"}
          </div>
        </div>
      </div>
      <div className="">
        <img src={images[0].url} className="w-full h-full rounded-xl object-contain" />

      </div>
      <div
        onClick={() => setIsviewAllImageOpen(true)}
        className="absolute flex bg-black rounded-full text-white items-center px-2 gap-2 bg-opacity-60 bottom-5 right-5 sm:bottom-10 sm:right-10 py-1 text-xs cursor-pointer">
        <IoImageOutline size={16} /> View all photos
      </div>
    </div>
  ));

  useEffect(() => {
    dispatch(fetchFeaturedListing());
  }, []);

  return (
    <div className="tracking-tight items-center max-w-[1720px] mx-auto">
      <Heading />
      <div className="pt-10 sm:py-16">
        <div
          className="relative flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory gap-4 px-4"
          ref={containerRef}
        >
          {renderFeaturedHomes}
        </div>
      </div>

      <div className="hidden sm:flex justify-center space-x-2">
        <div className="bg-[#0000001A] flex rounded-full px-2">
          {featuredListings?.map((_, index) => (
            <GoDash key={index} onClick={() => handleScroll(index)} size={32} className={`cursor-pointer flex items-center justify-center ${activeIndex === index ? "text-[#9A9A9A]" : "text-white"}`} />
          ))}
        </div>
      </div>

      <div className="flex items-center pl-4">
        <button className="block sm:hidden px-5 py-2 rounded-xl text-white bg-black my-4">View All</button>
      </div>

    </div>
  );
};

export default FeaturedHomes;