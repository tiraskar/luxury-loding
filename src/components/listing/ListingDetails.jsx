import PropTypes from "prop-types";
import { useState } from "react";
import AmenitiesSkeleton from "../ui/AmenitiesSkeleton";
import { useSelector } from "react-redux";

const ListingDetails = ({ listingAmenities }) => {

  const [amenitiesSlice, setAmenitiesSlice] = useState(8)
  const { isFetchingAmenities } = useSelector(state => state.listing)

  return (
    <div id="listing-details" className="tracking-[-1%] space-y-8">
      <h1 className="text-xl font-semibold tracking-[-2%]">Details</h1>
      <div className="grid sm:grid-cols-2 gap-3 ">

        {isFetchingAmenities && Array.from({ length: 8 }, (_, index) => (
          <AmenitiesSkeleton key={index} />
        ))}

        {!isFetchingAmenities && listingAmenities?.slice(0, amenitiesSlice).map((amenities) => {
          return (
            <div key={amenities.amenityId} className="lg:max-w-[318px] flex flex-row items-center p-3 rounded-2xl bg-[#F9F9F9] space-x-3">
              <div className="flex flex-row items-center justify-center h-[42px] w-[42px] rounded-xl bg-white">
                <p className="text-buttonPrimary font-bold">{amenities.amenityName.charAt(0)}</p>
          </div>
              {/* <p>Air conditioning</p> */}
              <p>{amenities.amenityName}</p>
        </div>

          );
        })}
      </div>
      {listingAmenities.length > 8 && <button
        onClick={() => { amenitiesSlice == 8 ? setAmenitiesSlice(listingAmenities.length) : setAmenitiesSlice(8); }}
        className="font-semibold text-[13px] gap-x-2 py-2 px-[10px] border-[0.6px] border-[#D7DBE8] w-fit rounded-2xl tracking-normal">
        {amenitiesSlice === 8 ? `Show all amenities (${listingAmenities.length})` : "Show less amenities"}
      </button>}
    </div>
  );
};

ListingDetails.propTypes = {
  listingAmenities: PropTypes.array.isRequired
}

export default ListingDetails;