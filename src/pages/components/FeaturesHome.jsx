import { useState, useRef } from "react";
import Wrapper from "../../components/Wrapper";
import { LuUsers, LuBath } from "react-icons/lu";
import { TbBed } from "react-icons/tb";
import { GoDash } from "react-icons/go";
import { IoImageOutline } from "react-icons/io5";

const FeaturesHome = () => {
  const featuredHomesData = [
    {
      title: "Red rock views & Secret backyard hiking",
      image: "/images/features-home-one.png",
      guests: 6,
      bedrooms: 3,
      baths: 2,
    },
    {
      title: "Mountain village views & BBQ",
      image: "/images/features-home-one.png",
      guests: 8,
      bedrooms: 4,
      baths: 3,
    },
    {
      title: "Peaceful village views & Private pool",
      image: "/images/features-home-one.png",
      guests: 4,
      bedrooms: 2,
      baths: 1,
    },
    {
      title: "Luxurious village views & Swimming pool",
      image: "/images/features-home-one.png",
      guests: 5,
      bedrooms: 3,
      baths: 2,
    },
    {
      title: "Beautiful village views & Private backyard",
      image: "/images/features-home-one.png",
      guests: 7,
      bedrooms: 3,
      baths: 2,
    },
    {
      title: "Serene village views & Private backyard",
      image: "/images/features-home-one.png",
      guests: 6,
      bedrooms: 2,
      baths: 1,
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  const handleScroll = (index) => {
    setActiveIndex(index);
    itemRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div className="tracking-tight items-center max-w-[1720px] mx-auto">
      <Wrapper>
        <div className="flex sm:justify-between items-center ">
          <h1 className="text-[#333333] text-[26px] sm:text-3xl md:text-[35px] font-semibold">Our featured homes</h1>
          <button className="hidden sm:block px-5 py-3 rounded-xl text-white bg-black">View All</button>
        </div>
      </Wrapper>
      <div className="pt-10 sm:py-16">
        <div
          className="relative flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory gap-4 px-4"
          ref={containerRef}
        >
          {featuredHomesData.map(({ image, title, guests, bedrooms, baths }, index) => (
            <div
              key={title}
              className="relative flex-shrink-0 grid lg:flex snap-center w-[90%] sm:w-[90%] md:w-[90%] lg:w-[90%] xl:w-[90%] bg-cardBackgroundLight rounded-2xl p-2 sm:p-4 md:p-5 gap-4"
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <div className="flex flex-col justify-end space-y-4 sm:min-w-[400px]">
                <h1 className="text-xl sm:text-2xl md:text-[28px] font-medium tracking-[-1%]">{title}</h1>
                <div className="flex flex-wrap gap-2 text-[#7B6944]">
                  <div className="flex gap-1 border border-[#7B6944] px-2 py-1 items-center rounded-2xl text-xs sm:text-sm">
                    <LuUsers size={14} /> {guests} {guests > 1 ? "guests" : "guest"}
                  </div>
                  <div className="flex gap-1 border border-[#7B6944] px-2 py-1 items-center rounded-2xl text-xs sm:text-sm">
                    <TbBed size={14} /> {bedrooms} {bedrooms > 1 ? "bedrooms" : "bedroom"}
                  </div>
                  <div className="flex gap-1 border border-[#7B6944] px-2 py-1 items-center rounded-2xl text-xs sm:text-sm">
                    <LuBath size={14} /> {baths} {baths > 1 ? "baths" : "bath"}
                  </div>
                </div>
              </div>
              <div className="">
                <img src={image} className="w-full h-auto rounded-xl object-contain" />
                
              </div>
              <div className="absolute flex bg-black rounded-full text-white items-center px-2 gap-2 bg-opacity-60 bottom-5 right-5 sm:bottom-10 sm:right-10 py-1 text-xs">
                <IoImageOutline size={16} /> View all photos
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden sm:flex justify-center space-x-2">
        <div className="bg-[#0000001A] flex rounded-full px-2">
          {featuredHomesData?.map((_, index) => (
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

export default FeaturesHome;
