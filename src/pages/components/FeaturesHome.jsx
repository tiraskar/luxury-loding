import { useState, useRef } from "react";
import Wrapper from "../../components/Wrapper";
import { LuUsers, LuBath } from "react-icons/lu";
import { TbBed } from "react-icons/tb";
import { GoDash } from "react-icons/go";

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
        <div className="flex justify-between items-center">
          <h1 className="text-[#333333] text-[35px] font-semibold">Our featured homes</h1>
          <button className="px-5 py-3 rounded-xl text-white bg-black">View All</button>
        </div>
      </Wrapper>
      <div className="py-16">
        <div
          className="relative flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory gap-4 px-4"
          ref={containerRef}
        >
          {featuredHomesData.map(({ image, title, guests, bedrooms, baths }, index) => (
            <div
              key={title}
              className="relative flex-shrink-0 grid lg:flex snap-center w-[90%] sm:w-[90%] md:w-[90%] lg:w-[90%] xl:w-[90%] bg-cardBackgroundLight rounded-2xl p-5 gap-4"
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <div className="flex flex-col justify-end space-y-4 sm:min-w-[400px]">
                <h1 className="text-[28px] font-medium tracking-[-1%]">{title}</h1>
                <div className="flex space-x-2 text-[#7B6944]">
                  <div className="flex gap-1 border border-[#7B6944] px-2 py-1 items-center rounded-2xl text-sm">
                    <LuUsers size={14} /> {guests} {guests > 1 ? "guests" : "guest"}
                  </div>
                  <div className="flex gap-1 border border-[#7B6944] px-2 py-1 items-center rounded-2xl text-sm">
                    <TbBed size={14} /> {bedrooms} {bedrooms > 1 ? "bedrooms" : "bedroom"}
                  </div>
                  <div className="flex gap-1 border border-[#7B6944] px-2 py-1 items-center rounded-2xl text-sm">
                    <LuBath size={14} /> {baths} {baths > 1 ? "baths" : "bath"}
                  </div>
                </div>
              </div>
              <div className="">
                <img src={image} className="w-full h-auto rounded-xl object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center space-x-2">
        <div className="bg-[#0000001A] flex rounded-full px-2">
          {featuredHomesData?.map((_, index) => (
            <GoDash key={index} onClick={() => handleScroll(index)} size={32} className={`cursor-pointer flex items-center justify-center ${activeIndex === index ? "text-[#9A9A9A]" : "text-white"}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesHome;
