import React from 'react';
import PropTypes from "prop-types";
import { useState } from "react";
import Wrapper from "../common/Wrapper";

const ListingDescription = ({ listingInfo, className }) => {
  const [lineClamp, setIsLineClamp] = useState(5);

  const formatText = (content) => {
    return content.split('\n\n').map((paragraph, pIndex) => (
      <div key={`para-${pIndex}`} style={{ marginBottom: '1.5rem' }}>
        {paragraph.split('\n').map((line, lIndex, lines) => (
          <React.Fragment key={`line-${pIndex}-${lIndex}`}>
            {line}
            {/* Add line break except after last line */}
            {lIndex !== lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    ));
  };
  return (
    <Wrapper>
      <div id="Description" className={`lg:max-w-[652px] space-y-8 font-inter text-[#333333] tracking-tight ${className}`}>
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
          <p className={`${lineClamp == 5 ? "line-clamp-5" : "line-clamp-0"}`}>{formatText(listingInfo.description)}
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
    </Wrapper>
  );
};

ListingDescription.propTypes = {
  listingInfo: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default ListingDescription;