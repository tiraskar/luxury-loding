import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuBath, LuUsers } from "react-icons/lu";
import { TbBed } from "react-icons/tb";
import { Link } from "react-router-dom";

const ListingMap = () => {
  return (
    <div>

      <ImageViewMap />
    </div>
  );
};

export default ListingMap;

const ImageViewMap = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlide = (direction) => {
    const imagesCount = listingData.image.length;
    setCurrentIndex((prev) => (prev + direction + imagesCount) % imagesCount);
  };

  const setSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[56px]">
      <div className="relative flex flex-col gap-y-4 xl:max-w-[318px]">
        <div className="relative flex overflow-hidden">
          {listingData.image.map((data, index) => (
            <div
              key={index}
              className={`snap-start flex-shrink-0 w-full transition-transform duration-300 ${index === currentIndex ? 'block' : 'hidden'}`}
            >
              <img className="object-cover w-full rounded-md" src={data} alt="" />
            </div>
          ))}

          {listingData.image.length > 1 && (
            <div className="absolute inset-0 flex justify-between items-center">
              <div
                className="absolute left-3 top-[50%] transform -translate-y-1/2 text-black h-6 w-6 bg-white bg-opacity-60 items-center flex justify-center rounded-full cursor-pointer"
                onClick={() => handleSlide(-1)}
              >
                <IoIosArrowBack size={14} />
              </div>
              <div
                className="absolute right-3 top-[50%] transform -translate-y-1/2 text-black h-6 w-6 bg-white bg-opacity-60 items-center flex justify-center rounded-full cursor-pointer"
                onClick={() => handleSlide(1)}
              >
                <IoIosArrowForward size={14} />
              </div>
              <div className="absolute bottom-2 flex justify-center w-full">
                {listingData.image.map((_, index) => (
                  <GoDotFill
                    key={index}
                    size={14}
                    onClick={() => setSlide(index)}
                    className={`cursor-pointer text-white mx-px ${index === currentIndex ? 'opacity-100' : 'opacity-60'}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {listingData.featured && (
          <p className="absolute tracking-[-1%] bg-white px-3 py-1.5 rounded-lg top-5 left-5 md:top-2 mg:left-2">
            Featured
          </p>
        )}
        <p className="flex items-center space-x-1 text-xs text-[#0094FF]">
          <GrLocation /> <span>{listingData.location}</span>
        </p>
        <div className="flex flex-col gap-4 text-[#333333] font-inter text-lg font-semibold">
          <Link to='single-listing' className="text-xl font-inter tracking-[-1%]">{listingData.title}</Link>
          <p className="line-clamp-2 text-[#8E8E80] leading-[20px] font-normal text-[13px]">
            {listingData.description}
          </p>
        </div>
        <div className="flex gap-x-3 text-[#7B6944] items-center font-inter tracking-[-1%]">
          <div className="flex gap-1 items-center rounded-2xl text-[13px]">
            <LuUsers size={14} /> {listingData.guest} {listingData.guest > 1 ? 'guests' : 'guest'}
          </div>
          <div className="flex gap-1 items-center rounded-2xl text-[13px]">
            <TbBed size={14} /> {listingData.bedroom} {listingData.bedroom > 1 ? 'bedrooms' : 'bedroom'}
          </div>
          <div className="flex gap-1 items-center rounded-2xl text-[13px]">
            <LuBath size={14} /> {listingData.bath} {listingData.bath > 1 ? 'baths' : 'bath'}
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-[#333333] font-bold text-xl">${listingData.rate}</p>
          <p className="text-[#8E8E80] text-sm tracking-tight">&nbsp;/ {listingData.duration}</p>
        </div>
      </div>
    </div>
  );
};

// Example object of listing data
const listingData = {
  image: [
    '/images/listing-one.png',
    '/images/listing-two.png',
    '/images/listing-three.png',
  ],
  location: "Sedona, Arizona, United States of America",
  title: "Cozy Cabin Retreat in Sedona's Red Rocks",
  description: "Enjoy a tranquil escape in Sedona's red rock country, offering breathtaking views and serene hiking trails.",
  guest: 3,
  bedroom: 2,
  bath: 2,
  rate: 200,
  duration: "per night",
  featured: false
};
