import { useSelector } from "react-redux";
import RenderListings from "./RenderListings";
import Wrapper from "../common/Wrapper";


const OtherListing = () => {

  const { otherListings } = useSelector((state) => state.listing);

  return (
    <Wrapper>
      <div className="text-[#333333] font-onest tracking-tight flex flex-col justify-center gap-y-7 sm:gap-y-8 md:space-y-[56px]">
        <h1 className=" text-3xl sm:text-[35px] font-semibold">Others listings</h1>
        <RenderListings listingList={otherListings} />
      </div>
    </Wrapper>
  );
};

export default OtherListing;
