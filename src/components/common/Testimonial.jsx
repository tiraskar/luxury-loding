import { useState, useRef } from "react";
import Wrapper from "./Wrapper";
import CustomImage from "../ui/CustomImage";

const Testimonial = () => {

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  const handleScroll = (index) => {
    setActiveIndex(index);
    itemRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };


  const renderTestimonial = testimonialData?.map(({ quotes, image, profile, name, position }, index) => (
    <div
      key={index}
      className="relative flex-shrink-0 grid md:flex snap-center w-[90%] sm:w-[90%] md:w-[90%] lg:w-[90%] xl:w-[90%] bg-cardBackgroundLight rounded-2xl p-5 gap-4"
      ref={(el) => (itemRefs.current[index] = el)}
    >
      <div className="">
        <CustomImage
          src={image}
          className="w-full h-auto max-h-[514px] rounded-xl object-contain" />
      </div>

      <div className="relative flex flex-col justify-between sm:min-w-[400px] max-w-[675px]">
        <q className=" text-sm sm:text-xl md:text-lg lg:text-2xl tracking-normal lg:pt-12">{quotes}</q>

        <div className="flex flex-row items-center gap-3 mt-4 lg:mt-0">
          <div className="w-[42px] h-[42px] rounded-full">
            <CustomImage
              src={profile}
              alt=""
              className="" />
          </div>

          <div className="flex flex-col tracking-tight font-inter ">
            <h1 className="font-medium text-[1rem]">{name}</h1>
            <p className="text-[13px] text-[#A1A196]">{position}</p>
          </div>
        </div>
      </div>

    </div>
  ));


  return (
    <div className="tracking-tight items-center max-w-[1720px] mx-auto space-y-[3.5rem]">
      <Wrapper>
        <h1 className="text-[#333333] text-[26px] md:text-3xl md:text-[35px] font-semibold">Hear from our happy guests</h1>
      </Wrapper>

      <div className="space-y-6">
        <div
          className="relative flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory gap-4 px-4"
          ref={containerRef}
        >
          {renderTestimonial}
        </div>
        <div className="hidden sm:flex justify-center space-x-2 ">
          <div className="bg-[#0000001A] flex rounded-full px-4 h-6 justify-center items-center">
            {testimonialData?.map((_, index) => (
              <div key={index} onClick={() => handleScroll(index)} className="cursor-pointer">{
                index == activeIndex ? <svg className="mx-1" xmlns="http://www.w3.org/2000/svg" width="17" height="2" viewBox="0 0 17 2" fill="none">
                  <path d="M1 1H16" stroke="#9A9A9A" strokeWidth="2" strokeLinecap="round" />
                </svg> : <svg className="mx-1" xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2" fill="none">
                  <path d="M1 1H9" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              }</div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Testimonial;


const testimonialData = [
  {
    quotes: `Brindy and team are absolutely wonderful hosts. The place was nothing short of immaculate and beautifully decorated. They were very responsive and knowledgeable on the area when I asked for some recommendations.`,
    image: "images/happy-guest-one.png",
    profile: 'images/profile-alex.png',
    name: 'Alex Brown',
    position: 'Host & Property Manager',

  },
  {
    quotes: `I absolutely adore Brindy and team. The place was nothing short of immaculate and beautifully decorated. They were very responsive and knowledgeable on the area when I asked for some recommendations.`,
    image: "images/happy-guest-one.png",
    profile: 'images/profile-alex.png',
    name: 'Emmy Smith',
    position: 'Frontend Designer',
  },
  {
    quotes: `I absolutely adore Brindy and team. The place was nothing short of immaculate and beautifully decorated. They were very responsive and knowledgeable on the area when I asked for some recommendations.`,
    image: "images/happy-guest-one.png",
    profile: 'images/profile-alex.png',
    name: 'John Doe',
    position: 'Doctor',
  },


];