import Wrapper from "../common/Wrapper";
import SearchListingForm from "../listing/SearchListingForm";
import CustomImage from "../ui/CustomImage";

const BannerImage = () => {
  return (
    <div
      className="relative h-[320px] sm:min-h-[400px] md:min-h-[450px] lg:h-full w-full overflow-hidden">
      <CustomImage
        src={`banner-background.png`}
        alt="Banner Background"
        className=" w-full h-full rounded-2xl"
      />
      {/* <img
        src={`${import.meta.env?.BASE_URL}banner-background.png`}
        alt="Banner Background"
        className=" w-full h-full rounded-2xl"
      /> */}
    </div>
  );
};

const BannerTextInfo = () => {
  return (
    <div className="text-white space-y-[30px]  mb-[45px] h-[130px]">
      <h1 className="font-medium font-onest text-[1.125rem] xxs:text-[1.5rem] xs:text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] tracking-[-0.8px] leading-[56px] h-[90px]">
        Your Ideal Spot for Groups, Events, and Corporate Travel
      </h1>

      <p className="text-[8px] sm:text-xs md:text-sm lg:text-[1rem] h-[11px]">
        Top destinations for all groups with excellent amenities,
        corporate travel, and events
      </p>
    </div>
  );
};

const HomeBanner = () => {
  return (
    <Wrapper>
      <div className="relative font-onest flex justify-center rounded-xl max-h-[605px]  ">
        <BannerImage />
        <div className="absolute bottom-0 lg:-mb-[2.75%] justify-center items-center text-center max-w-[425px] sm:max-w-[550px] md:max-w-[722px] lg:max-w-[822px]">
          <BannerTextInfo />
          <SearchListingForm />
          {/* <Form /> */}
        </div>
      </div>
    </Wrapper>
  );
};

export default HomeBanner;

// const Form = () => {
//   return (
//     <div className="grid grid-cols-5 gap-4 bg-white rounded-3xl h-[73px] w-[822px]">
//       <div className="flex flex-col lg:mb-0 text-sm text-start h-[69px] mx-7 my-3 space-y-1 w-[97.3px]">
//         <label className="font-semibold h-[18px]">
//           Where to go?
//         </label>
//         <input
//           type="text"
//           placeholder="Anywhere"
//           // value={searchListingParams.location}
//           // onChange={(e) => handleInputChange('location', e.target.value)}
//           className="outline-none rounded-md font-inter py-1 w-full text-[1rem] tracking-[-0.16px font-inter]"
//         />
//       </div>
//       <div className="flex flex-col lg:mb-0 text-sm text-start h-[69px] mx-7 my-3 space-y-1 w-[97.3px]">
//         <label className="font-semibold h-[18px]">
//           Where to go?
//         </label>
//         <input
//           type="text"
//           placeholder="Anywhere"
//           // value={searchListingParams.location}
//           // onChange={(e) => handleInputChange('location', e.target.value)}
//           className="outline-none rounded-md font-inter py-1 w-full text-[1rem] tracking-[-0.16px font-inter]"
//         />
//       </div>
//       <div className="flex flex-col lg:mb-0 text-sm text-start h-[69px] mx-7 my-3 space-y-1 w-[97.3px]">
//         <label className="font-semibold h-[18px]">
//           Where to go?
//         </label>
//         <input
//           type="text"
//           placeholder="Anywhere"
//           // value={searchListingParams.location}
//           // onChange={(e) => handleInputChange('location', e.target.value)}
//           className="outline-none rounded-md font-inter py-1 w-full text-[1rem] tracking-[-0.16px font-inter]"
//         />
//       </div>
//       <div className="flex flex-col lg:mb-0 text-sm text-start h-[69px] mx-7 my-3 space-y-1 w-[97.3px]">
//         <label className="font-semibold h-[18px]">
//           Where to go?
//         </label>
//         <input
//           type="text"
//           placeholder="Anywhere"
//           // value={searchListingParams.location}
//           // onChange={(e) => handleInputChange('location', e.target.value)}
//           className="outline-none rounded-md font-inter py-1 w-full text-[1rem] tracking-[-0.16px font-inter]"
//         />
//       </div>
//       <div className="flex flex-col lg:mb-0 text-sm text-start h-[69px] mx-7 my-3 space-y-1 w-[97.3px]">
//         <label className="font-semibold h-[18px]">
//           Where to go?
//         </label>
//         <input
//           type="text"
//           placeholder="Anywhere"
//           // value={searchListingParams.location}
//           // onChange={(e) => handleInputChange('location', e.target.value)}
//           className="outline-none rounded-md font-inter py-1 w-full text-[1rem] tracking-[-0.16px font-inter]"
//         />
//       </div>
//     </div>
//   );
// };
