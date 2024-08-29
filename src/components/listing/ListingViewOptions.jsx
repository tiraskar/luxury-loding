import { IoListOutline, IoMapOutline } from 'react-icons/io5';
import PropTypes from 'prop-types';
import { fetchAvailableListing, fetchListingList, setListingOrder } from '../../redux/slices/listingSlice';
import { useDispatch, useSelector } from 'react-redux';

const ListingViewOptions = ({ setIsMapViewOpen, isMapViewOpen }) => {

  const { isSearchedListing } = useSelector(state => state.listing);
  const dispatch = useDispatch();

  const handleSortChange = (e, value) => {

    e.preventDefault();
    dispatch(setListingOrder(value));

    if (isSearchedListing) {
      dispatch(fetchAvailableListing());

    } else {
      dispatch(fetchListingList());
    }
  }

  return (
    <div className="flex items-center space-x-[9px]">
      <div className="flex flex-row text-black bg-white border-[0.6px] border-[#D7DBE8] rounded-xl text-[13px] font-medium h-fit py-[6px] sm:py-[9px] px-2.5">
        <p className="opacity-50">Sort by :</p>
        <select
          onChange={(e) => handleSortChange(e, e.target.value)}
          className="bg-white outline-none">

          <option value="" className="font-semibold text-[13px]">Default</option>
          <option value="low-to-high" className="font-semibold text-[13px]">Price Low</option>
          <option value="high-to-low" className="font-semibold text-[13px]">Price High</option>
        </select>
      </div>
      <div className="bg-[#F9F9F9] p-0.5 w-[64] h-[34px] rounded-[10px] flex items-center space-x-[7px]">
        <div onClick={() => setIsMapViewOpen(false)} className={` h-[30px] w-[30px] flex items-center  justify-center ${!isMapViewOpen && "bg-white rounded-lg shadow-sm"}`}>
          <IoListOutline className="h-4 w-4" />
        </div>
        <div onClick={() => setIsMapViewOpen(true)} className={` h-[30px] w-[30px] flex items-center justify-center ${isMapViewOpen && "bg-white rounded-lg shadow-sm"}`}>
          <IoMapOutline className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

ListingViewOptions.propTypes = {
  setIsMapViewOpen: PropTypes.func.isRequired,
  isMapViewOpen: PropTypes.bool.isRequired,
};

export default ListingViewOptions;