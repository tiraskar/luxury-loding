import PropTypes from "prop-types";
import { useState } from "react";

const ListingDescription = ({ listingInfo }) => {
  const [lineClamp, setIsLineClamp] = useState(5)
  return (
    <div id="listing-description" className="lg:max-w-[652px] space-y-8 font-inter text-[#333333] tracking-tight">
      <h1 className="text-xl font-semibold">Description</h1>
      {/* <div className="flex flex-col space-y-3 font-normal text-[13px] leading-6">
        <h3 className="text-sm font-semibold">Summary</h3>
        <p >Welcome to {listingInfo.name}</p>
        <ul className="font-normal">
          <li>- Spectacular backyard oasis with pool, hot tub, putting green, propane grill, & fire pit</li>
          <li>- Indulgent King-sized beds for ultimate comfort</li>
          <li>- Kids bunk room with games including a foosball table</li>
          <li>- Location: {listingInfo.street}</li>
        </ul>
      </div> */}
      <div className="flex flex-col space-y-1 font-normal text-[13px] leading-6">
        <p className={`${lineClamp == 5 ? "line-clamp-5" : "line-clamp-0"}`}>{listingInfo.description}
        </p>
        <span
          onClick={() => setIsLineClamp(lineClamp == 0 ? 5 : 0)}
          className="text-[#0094FF] cursor-pointer">
          {lineClamp == 5 ? "View more" : "View less"}
        </span>
      </div>
      {/* <div className="flex flex-col space-y-1 font-normal text-[13px] leading-6">
        <h1 className="text-sm font-semibold">Description</h1>


      </div> */}
    </div>
  );
};

ListingDescription.propTypes = {
  listingInfo: PropTypes.object.isRequired,
}

export default ListingDescription;