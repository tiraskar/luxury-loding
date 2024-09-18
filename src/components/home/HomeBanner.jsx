// import { Link } from "react-router-dom";
import Wrapper from "../common/Wrapper";
import SearchListingForm from "../listing/SearchListingForm";
import CustomImage from "../ui/CustomImage";
// import SearchListingMobileView from "../listing/SearchListingMobileView";
// import { toggleIsSearchHomePageOpen } from "../../redux/slices/listingSlice";
import BannerTextInfo from "./BannerTextInfo";

const BannerImage = () => {
  return (
    <div
      className="relative 
      min-h-[250px] xs:min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:h-full w-full overflow-hidden max-h-[605px]  rounded-2xl ">
      <CustomImage
        src={`images/search_banner.jpg`}
        alt="Banner Background"
        className=" w-full h-full object-cover"
      />
    </div>
  );
};



const HomeBanner = () => {

  return (
    <Wrapper>
      <div className="relative font-onest flex justify-center rounded-xl max-h-[605px]">
        <BannerImage />
        <div className="absolute bottom-3 xs:bottom-0  xs:-mb-[11.75%]   sm:-mb-[4.75%] lg:-mb-[2.75%]  justify-center items-center text-center max-w-[425px] xs:max-w-[480px] xs:min-w-[400px] sm:min-w-[630px] md:max-w-[722px] lg:max-w-[822px]">
          <BannerTextInfo />
          {/* {isSearchHomePageOpen && */}
          {/* <SearchListingMobileView /> */}
          {/* } */}
          <SearchListingForm />
        </div>
      </div>
    </Wrapper>
  );
};

export default HomeBanner;
