import { useDispatch } from "react-redux";
import { toggleAllAmenitiesOpen } from "../../redux/slices/listingSlice";
import PropTypes from "prop-types";


const AllAmenities = ({ listingAmenities }) => {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-[#333333] transition-all delay-500 ease-in-out">
      <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-md z-10 py-2 md:w-[430px] max-h-[820px] h-auto overflow-y-auto sm:max-w-[95%] sm:max-h-[90%]">
        <div className="flex justify-between items-center px-4 py-2">
          <h2 className="text-[18px] font-medium font-inter tracking-[-2%]">All Amenities - {listingAmenities?.length}</h2>
          <button
            className="text-3xl font-normal opacity-50"
            onClick={() => dispatch(toggleAllAmenitiesOpen())}
          >
            &times;
          </button>
        </div>

        <div className="min-w-full h-px bg-[#E0E0E0]"></div>
        <div className="space-y-[9px] px-5 font-inter tracking-[-1%] py-4 max-h-[450px]  sm:max-h-[550px] overflow-y-scroll">
          {listingAmenities?.map((amenities, index) => {
            return (
              <div key={index} className="w-full flex flex-row items-center p-3 rounded-2xl bg-[#F9F9F9] space-x-3">
                <div className="flex flex-row items-center justify-center h-[42px] w-[42px] rounded-xl bg-white">
                  <p className="text-buttonPrimary font-bold">{amenities.amenityName.charAt(0)}</p>
                </div>
                {/* <p>Air conditioning</p> */}
                <p className="h-[17px] text-sm">{amenities.amenityName}</p>
              </div>
            );
          })
          }
        </div>
      </div>
    </div>
  );
};

AllAmenities.propTypes = {
  listingAmenities: PropTypes.array,
};

const AmenitiesPopup = ({ listingAmenities }) => {
  return (
    <div className="">
      <AllAmenities listingAmenities={listingAmenities} />
    </div>
  );
};

AmenitiesPopup.propTypes = {
  listingAmenities: PropTypes.array,
};

export default AmenitiesPopup;