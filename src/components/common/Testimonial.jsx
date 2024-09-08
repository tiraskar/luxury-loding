import Wrapper from "./Wrapper";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";


const RightArrowButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="right-0 md:right-4 md:absolute">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className=" w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"

      >
        <circle cx="20" cy="20" r="20" fill="white" />
        <path
          d="M16.7501 13.5C16.7501 13.5 23.25 18.2871 23.25 20C23.25 21.713 16.75 26.5 16.75 26.5"
          stroke="#222222"
          strokeWidth="1.625"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

RightArrowButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const LeftArrowButton = ({ onClick }) => {
  return (
    <button className="left-0 md:left-4 md:absolute" onClick={onClick}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className=" w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
      >
        <circle cx="20" cy="20" r="20" fill="white" />
        <path
          d="M23.2499 26.5C23.2499 26.5 16.75 21.7129 16.75 20C16.75 18.287 23.25 13.5 23.25 13.5"
          stroke="#222222"
          strokeWidth="1.625"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

LeftArrowButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const Testimonial = () => {
  const { reviewList } = useSelector((state) => state.other);

  const newReviewList = reviewList.filter(review => {
    const hasRating = review.rating == 10;
    const hasPublicReview = review.publicReview && review.publicReview.split(' ').length > 10;
    const hasName = review.guestName || review.reviewerName;

    return hasRating && hasPublicReview && hasName;
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < newReviewList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to the first review
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(newReviewList.length - 1); // Loop back to the last review
    }
  };

  const currentReview = newReviewList[currentIndex];

  return (
    <div className="tracking-tight items-center max-w-[1440px] mx-auto space-y-6 xs:space-y-8 sm:space-y-8 md:space-y-9 lg:space-y-[3.5rem]">
      <Wrapper>
        <h1 className="text-[#333333] text-xl xxs:text-2xl xs:text-[26px] md:text-3xl md:text-[35px] font-semibold">
          Hear from our happy guests
        </h1>
      </Wrapper>

      <div className="bg-cardBackgroundLight justify-center flex flex-col relative">
        <Wrapper>
          <div className="flex flex-col justify-center text-center items-center py-[1rem] pt-20 lg:py-[6.25rem] space-y-2">
            <div className="flex gap-2">
              {Array.from({ length: (currentReview?.rating) / 2 }, (_, index) => (
                <FaStar key={index} className="w-5 h-5 text-buttonPrimary" />
              ))}

            </div>
            <div className="flex  items-center ">
              <div className="-mt-20">
                <LeftArrowButton onClick={handlePrev} />
              </div>

              <div className="flex flex-col justify-center items-center">
                <q className="text-sm sm:text-lg md:text-xl lg:text-2xl tracking-normal lg:pt-12 md:max-w-[625px] lg:max-w-[970px] xl:max-w-[1120px]">
                  {currentReview?.publicReview}
                </q>
                <div className="flex flex-col items-center justify-center space-y-3 py-[3.5rem]">
                  <h4 className="text-sm sm:text-lg lg:text-xl font-medium">
                    -  {currentReview?.guestName !== null ? currentReview?.guestName : currentReview?.reviewerName}
                  </h4>
                  {/* <p className="text-sm opacity-30">MBA Student</p> */}
                </div>
              </div>
              <div className="-mt-20">
                <RightArrowButton onClick={handleNext} />
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default Testimonial;

// <div className="tracking-tight items-center max-w-[1720px] mx-auto space-y-6 xs:space-y-8 sm:space-y-8 md:space-y-9 lg:space-y-[3.5rem]">
//   <Wrapper>
//     <h1 className="text-[#333333] text-xl xxs:text-2xl xs:text-[26px] md:text-3xl md:text-[35px] font-semibold">Hear from our happy guests</h1>
//   </Wrapper>

//   <div className="space-y-6">
//     <div
//       className="relative flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory gap-4 px-4"
//       ref={containerRef}
//     >
//       {renderTestimonial}
//     </div>
//     <div className="hidden sm:flex justify-center space-x-2 ">
//       <div className="bg-[#0000001A] flex rounded-full px-4 h-6 justify-center items-center">
//         {testimonialData?.map((_, index) => (
//           <div key={index} onClick={() => handleScroll(index)} className="cursor-pointer">{
//             index == activeIndex ? <svg className="mx-1" xmlns="http://www.w3.org/2000/svg" width="17" height="2" viewBox="0 0 17 2" fill="none">
//               <path d="M1 1H16" stroke="#9A9A9A" strokeWidth="2" strokeLinecap="round" />
//             </svg> : <svg className="mx-1" xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2" fill="none">
//               <path d="M1 1H9" stroke="white" strokeWidth="2" strokeLinecap="round" />
//             </svg>
//           }</div>
//         ))}
//       </div>
//     </div>
//   </div>

// </div>

// const testimonialData = [
//   {
//     quotes: `Brindy and team are absolutely wonderful hosts. The place was nothing short of immaculate and beautifully decorated. They were very responsive and knowledgeable on the area when I asked for some recommendations.`,
//     image: "images/happy-guest-one.png",
//     profile: "images/profile-alex.png",
//     name: "Alex Brown",
//     position: "Host & Property Manager",
//   },
//   {
//     quotes: `I absolutely adore Brindy and team. The place was nothing short of immaculate and beautifully decorated. They were very responsive and knowledgeable on the area when I asked for some recommendations.`,
//     image: "images/happy-guest-one.png",
//     profile: "images/profile-alex.png",
//     name: "Emmy Smith",
//     position: "Frontend Designer",
//   },
//   {
//     quotes: `I absolutely adore Brindy and team. The place was nothing short of immaculate and beautifully decorated. They were very responsive and knowledgeable on the area when I asked for some recommendations.`,
//     image: "images/happy-guest-one.png",
//     profile: "images/profile-alex.png",
//     name: "John Doe",
//     position: "Doctor",
//   },
// ];

// testimonialData?.map(({ quotes, image, profile, name, position }, index) => (
//   <div
//     key={index}
//     className="relative flex-shrink-0 grid sm:flex snap-center w-[90%] sm:w-[90%] md:w-[90%] lg:w-[90%] xl:w-[90%] bg-cardBackgroundLight rounded-2xl p-5 gap-4"
//     ref={(el) => (itemRefs.current[index] = el)}
//   >
//     <div className=" xs:min-w-[200px] md:min-w-[300px]">
//       <CustomImage
//         src={image}
//         className="w-full h-auto  max-h-[350px] md:max-h-[514px] rounded-xl object-contain" />
//     </div>

//     <div className="relative flex flex-col justify-between lg:min-w-[400px] lg:max-w-[675px]">
//       <q className=" text-sm sm:text-lg md:text-xl lg:text-2xl tracking-normal lg:pt-12">{quotes}</q>

//       <div className="flex flex-row items-center gap-3 mt-4 lg:mt-0">
//         <div className="w-[42px] h-[42px] rounded-full">
//           <CustomImage
//             src={profile}
//             alt=""
//             className="" />
//         </div>

//         <div className="flex flex-col tracking-tight font-inter ">
//           <h1 className="font-medium text-[13px] md:text-[1rem]">{name}</h1>
//           <p className="text-[10px] sm:text-[13px] text-[#A1A196]">{position}</p>
//         </div>
//       </div>
//     </div>
//   </div>
// ));



// <Wrapper>
//   <div className="tracking-tight items-center space-y-6 xs:space-y-8 sm:space-y-8 md:space-y-9 lg:space-y-[3.5rem]">
//     <h1 className="text-[#333333] text-xl xxs:text-2xl xs:text-[26px] md:text-3xl md:text-[35px] font-semibold">
//       Hear from our happy guests
//     </h1>

//     <div className="bg-cardBackgroundLight justify-center flex flex-col py-20">

//       <div className="flex justify-center">
//         <FaStar className="w-5 h-5 text-buttonPrimary" />
//       </div>
//       <div className="flex text-center items-center px-1">
//         <LeftArrowButton />
//         <div className="flex flex-col justify-center items-center">
//           <q className="text-xl md:text-2xl text-[#000000] leading-[2.375rem]  md:px-28">
//             {`Whether you're seeking a romantic getaway, a family-friendly adventure, or a solo exploration, our vacation service is committed to making your dreams a reality`}
//           </q>



//           <div className="flex flex-col items-center justify-center space-y-3 py-[3.5rem]">
//             <h4 className="text-xl font-medium">Jenny Wilson</h4>
//             <p className="text-sm opacity-30">MBA Student</p>
//           </div>
//         </div>

//         <RightArrowButton />
//       </div>
//     </div>
//   </div>
// </Wrapper>;