import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { GrLocation, GrPowerCycle } from "react-icons/gr";
import { LuBath, LuUsers } from "react-icons/lu";
import { TbBed } from "react-icons/tb";
import { Wrapper } from "../../components";
import { Link } from "react-router-dom";
import { IoListOutline, IoMapOutline } from "react-icons/io5";

import ListingMap from "../../components/ListingMap";

const ListingList = () => {

  const [isMapViewOpen, setIsMapViewOpen] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(Array(listingData.length).fill(0));

  const handleSlide = (postIndex, direction) => {
    const imagesCount = listingData[postIndex].image.length;
    setCurrentIndex((prev) => {
      const newIndex = [...prev];
      newIndex[postIndex] =
        (newIndex[postIndex] + direction + imagesCount) % imagesCount;
      return newIndex;
    });
  };

  const setSlide = (postIndex, index) => {
    setCurrentIndex((prev) => {
      const newIndex = [...prev];
      newIndex[postIndex] = index;
      return newIndex;
    });
  };

  return (
    <Wrapper>
      <div className="text-[#333333] font-onest tracking-tight flex flex-col justify-center gap-y-12 sm:gap-y-[56px]">
        <div className="flex flex-wrap justify-between gap-2">
          <h1 className=" text-3xl sm:text-[35px] font-semibold">All Listing - ({listingData.length})</h1>
          <div className="flex items-center space-x-[9px]">
            <div className="flex flex-row text-black bg-white border-[0.6px] border-[#D7DBE8] rounded-xl text-[13px] font-medium h-fit py-[9px] px-2.5">
              <p className="opacity-50">Sort by :</p>
              <select name="" id="" className="bg-white outline-none">
                <option value="" className="font-semibold text-[13px]">Default</option>
              </select>
            </div>
            <div className="bg-[#F9F9F9] p-0.5 w-[64] h-[34px] rounded-[10px] flex items-center space-x-[7px]">
              <div onClick={() => setIsMapViewOpen(false)} className={` h-[30px] w-[30px] flex items-center  justify-center ${!isMapViewOpen && "bg-white rounded-lg shadow-sm"}`}>
                <IoListOutline className="h-4 w-4" />
              </div>
              <div onClick={() => setIsMapViewOpen(true)} className={` h-[30px] w-[30px] flex items-center justify-center ${isMapViewOpen && "bg-white rounded-lg shadow-sm"}`}>
                <IoMapOutline className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[56px]">
          {listingData?.map((post, postIndex) => (
            <div key={postIndex} className="relative flex flex-col gap-y-4 xl:max-w-[318px]">
              <div className="relative flex overflow-hidden">
                {post?.image?.map((data, index) => (
                  <div
                    key={index}
                    className={`snap-start flex-shrink-0 w-full transition-transform duration-300 ${index === currentIndex[postIndex] ? 'block' : 'hidden'
                      }`}
                  >
                    <img
                      className="object-cover w-full rounded-md"
                      src={data}
                      alt=""
                    />
                  </div>
                ))}

                {post?.image?.length > 1 && (
                  <div className="absolute inset-0 flex justify-between items-center">
                    <div
                      className="absolute left-3 top-[50%] transform -translate-y-1/2 text-black h-6 w-6 bg-white bg-opacity-60 items-center flex justify-center rounded-full cursor-pointer"
                      onClick={() => handleSlide(postIndex, -1)}
                    >
                      <IoIosArrowBack size={14} />
                    </div>
                    <div
                      className="absolute right-3 top-[50%] transform -translate-y-1/2 text-black h-6 w-6 bg-white bg-opacity-60 items-center flex justify-center rounded-full cursor-pointer"
                      onClick={() => handleSlide(postIndex, 1)}
                    >
                      <IoIosArrowForward size={14} />
                    </div>
                    <div className="absolute bottom-2 flex justify-center w-full">
                      {post?.image?.map((_, index) => (
                        <GoDotFill
                          key={index}
                          size={14}
                          onClick={() => setSlide(postIndex, index)}
                          className={`cursor-pointer text-white mx-px ${index === currentIndex[postIndex]
                            ? 'opacity-100'
                            : 'opacity-60'
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {post.featured && (
                <p className="absolute tracking-[-1%] bg-white px-3 py-1.5 rounded-lg top-5 left-5 md:top-2 mg:left-2">
                  Featured
                </p>
              )}
              <p className="flex items-center space-x-1 text-xs text-[#0094FF]">
                <GrLocation /> <span>{post.location}</span>
              </p>
              <div className="flex flex-col gap-4 text-[#333333] font-inter text-lg font-semibold">
                <Link to='single-listing' className="text-xl font-inter tracking-[-1%]">{post.title}</Link>
                <p className="line-clamp-2 text-[#8E8E80] leading-[20px] font-normal text-[13px]">
                  {post.description}
                </p>
              </div>
              <div className="flex gap-x-3 text-[#7B6944] items-center font-inter tracking-[-1%]">
                <div className="flex gap-1 items-center rounded-2xl text-[13px]">
                  <LuUsers size={14} /> {post.guest} {post.guest > 1 ? 'guests' : 'guest'}
                </div>
                <div className="flex gap-1 items-center rounded-2xl text-[13px]">
                  <TbBed size={14} /> {post.bedroom} {post.bedroom > 1 ? 'bedrooms' : 'bedroom'}

                </div>
                <div className="flex gap-1 items-center rounded-2xl text-[13px]">
                  <LuBath size={14} /> {post.bath} {post.bath > 1 ? 'baths' : 'bath'}
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-[#333333] font-bold text-xl">${post.rate}</p>
                <p className="text-[#8E8E80] text-sm tracking-tight">&nbsp;/ {post.duration}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="flex flex-row justify-center items-center tracking-normal font-inter text-[13px] gap-x-2 py-2 px-[10px] border-[0.6px] border-[#D7DBE8] w-fit rounded-2xl">
            Load more
            <GrPowerCycle size={18} />
          </button>
        </div>
        <ListingMap />
      </div>
    </Wrapper>
  );
};

export default ListingList;

const listingData = [
  {
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
  },
  {
    image: ['/images/listing-two.png'],
    location: "Scottsdale, Arizona, United States of America",
    title: "Modern Scottsdale Oasis with Private Pool",
    description: "Relax in a modern villa in Scottsdale, featuring a private pool and close proximity to vibrant local attractions.",
    guest: 4,
    bedroom: 3,
    bath: 2,
    rate: 250,
    duration: "per night",
    featured: false
  },
  {
    image: ['/images/listing-three.png'],
    location: "Flagstaff, Arizona, United States of America",
    title: "Rustic Mountain Lodge in Flagstaff",
    description: "Experience a rustic mountain lodge in Flagstaff, perfect for a cozy getaway with access to hiking and skiing.",
    guest: 4,
    bedroom: 3,
    bath: 2,
    rate: 250,
    duration: "per night",
    featured: true
  },
  {
    image: ['/images/listing-four.png'],
    location: "Phoenix, Arizona, United States of America",
    title: "Luxury Penthouse in Downtown Phoenix",
    description: "Stay in a luxury penthouse in downtown Phoenix, offering stunning city views and upscale amenities.",
    guest: 4,
    bedroom: 3,
    bath: 2,
    rate: 300,
    duration: "per night",
    featured: false
  },
  {
    image: ['/images/listing-five.png'],
    location: "Tucson, Arizona, United States of America",
    title: "Charming Adobe Home in Tucson",
    description: "Discover the charm of Tucson in this adobe-style home, with a beautiful courtyard and desert landscaping.",
    guest: 4,
    bedroom: 3,
    bath: 2,
    rate: 220,
    duration: "per night",
    featured: true
  },
  {
    image: ['/images/listing-six.png'],
    location: "Lake Havasu City, Arizona, United States of America",
    title: "Lakeside Villa with Private Dock",
    description: "Enjoy water activities in Lake Havasu City with this lakeside villa, complete with a private dock and boat access.",
    guest: 4,
    bedroom: 3,
    bath: 2,
    rate: 275,
    duration: "per night",
    featured: true
  },
  {
    image: [
      '/images/listing-seven.png',
      '/images/listing-eight.png',
      '/images/listing-one.png',
      '/images/listing-five.png',
    ],
    location: "Prescott, Arizona, United States of America",
    title: "Historic Home in Downtown Prescott",
    description: "Stay in a beautifully restored historic home in downtown Prescott, close to shops, restaurants, and museums.",
    guest: 4,
    bedroom: 3,
    bath: 2,
    rate: 240,
    duration: "per night",
    featured: false
  },
  {
    image: ['/images/listing-eight.png'],
    location: "Grand Canyon Village, Arizona, United States of America",
    title: "Grand Canyon Lodge with Scenic Views",
    description: "Experience the wonder of the Grand Canyon from this lodge, offering breathtaking views and convenient park access.",
    guest: 4,
    bedroom: 3,
    bath: 2,
    rate: 350,
    duration: "per night",
    featured: true
  }
];
