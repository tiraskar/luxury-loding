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
    <div className="text-white space-y-7  mb-[45px] h-[130px]">
      <h1 className="font-medium font-onest text-[1.125rem] xxs:text-[1.5rem] xs:text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] -tracking-[0.8px] leading-[56px] h-[90px]">
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
        <div className="absolute bottom-0 -mb-[2.8%] justify-center items-center text-center max-w-[425px] sm:max-w-[550px] md:max-w-[722px] lg:max-w-[822px]">
          <BannerTextInfo />
          <SearchListingForm />
        </div>
      </div>
    </Wrapper>
  );
};

export default HomeBanner;
