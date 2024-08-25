
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAmenitiesList,
  fetchAvailableListing,
  fetchListingList,
  fetchListingTotalCount,
  setAmenitiesListingParams,
  setSearchListingParams,
  setSearchListingParamsToInitialState,
  toggleApplyFilter,
  toggleFilterOpen,
} from '../../redux/slices/listingSlice';

import { useEffect, useState } from 'react';
import AmenitiesSkeleton from '../ui/AmenitiesSkeleton';

const Popup = () => {
  const dispatch = useDispatch();
  const { searchListingParams, amenitiesList, isFetchingAmenities, listingCount, listingTotalCount } = useSelector(
    (state) => state.listing
  );

  const [minValue, setMinValue] = useState(searchListingParams.minPrice);
  const [maxValue, setMaxValue] = useState(searchListingParams.maxPrice);

  const handleSearchInputChange = (name, value) => {
    dispatch(setSearchListingParams({ name, value }));
  };

  const handleAmenitiesChange = (id) => {
    dispatch(setAmenitiesListingParams(id));
  };

  useEffect(() => {
    { amenitiesList.length == 0 && dispatch(fetchAmenitiesList()); }
    listingTotalCount == 0 && dispatch(fetchListingTotalCount());
  }, [amenitiesList.length, dispatch, listingTotalCount]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-[#333333] transition-all delay-500 ease-in-out">
      <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-md z-10 py-2 md:w-[430px] max-h-[820px] h-auto overflow-y-auto sm:max-w-[95%] sm:max-h-[90%]">
        <div className="flex justify-between items-center px-4 py-2">
          <h2 className="text-[18px] font-medium font-inter tracking-[-2%]">Filters</h2>
          <button
            className="text-3xl font-normal opacity-50"
            onClick={() => dispatch(toggleFilterOpen())}
          >
            &times;
          </button>
        </div>

        <div className="min-w-full h-px bg-[#E0E0E0]"></div>

        <div className="font-onest space-y-4 py-4 tracking-[-1%] px-4 max-h-[450px]  sm:max-h-[550px] overflow-y-scroll">
          <div className="space-y-3">
            <h3 className="font-inter tracking-[-2%] font-medium text-[1rem]">Size</h3>
            <div className="flex flex-col space-y-2">
              <div className="p-5 space-y-2 bg-[#F9F9F9] rounded-2xl h-[85px]">
                <h1 className="font-semibold">Bedrooms</h1>
                <input
                  type="number"
                  value={searchListingParams.bedrooms}
                  onChange={(e) => handleSearchInputChange('bedrooms', e.target.value)}
                  placeholder="4 bedrooms"
                  className="font-inter text-[#8A8A8A] bg-[#F9F9F9] outline-none"
                />
              </div>
              <div className="p-5 space-y-2 bg-[#F9F9F9] rounded-2xl h-[85px]">
                <h1 className="font-semibold">Rooms</h1>
                <input
                  type="number"
                  value={searchListingParams.rooms}
                  onChange={(e) => handleSearchInputChange('rooms', e.target.value)}
                  placeholder="3 rooms"
                  className="font-inter text-[#8A8A8A] bg-[#F9F9F9] outline-none"
                />
              </div>
              <div className="p-5 space-y-2 bg-[#F9F9F9] rounded-2xl h-[85px]">
                <h1 className="font-semibold">Room Type</h1>
                <select
                  value={searchListingParams.roomType}
                  onChange={(e) => handleSearchInputChange('roomType', e.target.value)}
                  className="font-inter text-[#8A8A8A] bg-[#F9F9F9] outline-none w-full"
                >
                  <option value="">Room type</option>
                  <option value="entire_home">Entire home</option>
                  <option value="shared_room">Shared room</option>
                  <option value="private_room">Private room</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="font-inter tracking-[-2%] font-medium text-[1rem]">Price</h3>
            <PriceRangeSlider
              minValue={minValue}
              maxValue={maxValue}
              setMinValue={setMinValue}
              setMaxValue={setMaxValue}
            />
            <div className="flex justify-between">
              <div className="flex flex-row items-center rounded-xl">
                <label className="mr-2">Min</label>
                <div className="flex items-center border-[1px] border-[#F4F4F4] rounded-xl px-3">

                  <span>{minValue}$</span>
                </div>
              </div>

              <div className="flex flex-row items-center rounded-xl">
                <label className="mr-2">Max</label>
                <div className="flex items-center border-[1px] border-[#F4F4F4] rounded-xl px-3">
                  <span>{maxValue}$</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <p>Amenities</p>
            <div className="space-y-4">
              <h5 className="font-inter text-[#8A8A8A] text-[13px]">Entertainment & Games</h5>
              {isFetchingAmenities ? Array.from({ length: 8 }, (_, index) => (
                <AmenitiesSkeleton key={index} />
              ))
                : (

                  <AmenitiesList
                    amenitiesList={amenitiesList}
                    selectedAmenities={searchListingParams.amenities}
                    handleAmenitiesChange={handleAmenitiesChange}
                  />)}
            </div>
          </div>
        </div>
        <div className="min-w-full h-px bg-[#E0E0E0]"></div>
        <div className="flex justify-between items-center px-2 py-2 font-inter">
          <p className="text-sm font-medium font-inter tracking-[-2%]">{listingCount} listings to show</p>
          <div className="flex space-x-2 items-center h-8">
            <button
              onClick={() => {
                dispatch(setSearchListingParamsToInitialState());
                dispatch(toggleFilterOpen());
                dispatch(fetchListingList());
                dispatch(fetchListingTotalCount());
              }}
              className="flex px-4  text-[13px] items-center py-2 border-[#D7DBE8] border-[0.6px] rounded-[10px] w-[68px] h-8 "
            >
              Reset
            </button>
            <button
              onClick={() => {
                dispatch(toggleApplyFilter({ minValue, maxValue }));
                dispatch(toggleFilterOpen());
                dispatch(fetchAvailableListing())
              }}
              className="flex text-[13px] text-center  py-2 items-center bg-[#333333] text-white px-4 rounded-[10px] h-8 w-[109px]"
            >
              Apply filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const FilterListing = () => {
  return (
    <div className="">
      <Popup />
    </div>
  );
};

export default FilterListing;


const PriceRangeSlider = ({ minValue, setMinValue, maxValue, setMaxValue }) => {
// const dispatch = useDispatch();


  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
    // dispatch(handleFilterSlider('maxPrice', value))
  };

  const rangeStyle = {
    left: `${(minValue / 5000) * 100}%`,
    width: `${((maxValue - minValue) / 5000) * 100}%`,
  };

  return (
    <div className='flex flex-col space-y-[2px]'>
      <FlexContainer minValue={minValue} maxValue={maxValue} />
      <div className='relative h-1 bg-[#F3F3F3] rounded-full'>
        <div className=" top-0 absolute slider-wrapper">
        <input
          type="range"
            id="price-min"
          value={minValue}
            min="0"
            max="5000"
          onChange={handleMinChange}
            className="slider slider-min"
          />
        <input
          type="range"
            id="price-max"
          value={maxValue}
            min="0"
            max="5000"
          onChange={handleMaxChange}
            className="slider slider-max"
        />
          <div className="slider-progress" style={rangeStyle}></div>
        </div>
      </div>
    </div>


  );
};

PriceRangeSlider.propTypes = {
  minValue: PropTypes.number,
  setMinValue: PropTypes.func,
  maxValue: PropTypes.number,
  setMaxValue: PropTypes.func
};

const FlexContainer = ({ minValue, maxValue }) => {

  const minPercentage = (minValue / 5000) * 100;
  const maxPercentage = (maxValue / 5000) * 100;

  return (

    <div className='relative'>
      <div
        className="absolute h-full top-0 bg-opacity-80 bg-white"
        style={{
          width: `${minPercentage}%`,
        }}
      ></div>
      <div
        className="absolute h-full top-0 bg-opacity-80 bg-white "
        style={{
          left: `${maxPercentage}%`,
          width: `${100 - maxPercentage}%`,
        }}
      ></div>
      <div
        className="absolute h-full top-0  bg-white bg-opacity-30"
        style={{
          left: `${minPercentage}%`,
          width: `${maxPercentage - minPercentage}%`,
        }}
      ></div>

      <div className={`flex w-full items-baseline space-x-[2px] justify-between`}>
        <div className='bg-buttonPrimary h-[15px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[15px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[35px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[25px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[35px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[25px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[55px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[44px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[44px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[34px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[33px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[24px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[23px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[22px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[22px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[34px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[30px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[50px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[29px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[27px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[31px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[30px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[43px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[29px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[50px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[29px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[27px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[31px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[30px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[43px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[29px] w-[10px] rounded-t-[3px]'></div>
        <div className='bg-buttonPrimary h-[29px] w-[10px] rounded-t-[3px]'></div>
      </div>

    </div>

  );
};


FlexContainer.propTypes = {
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
};


const AmenitiesCheckbox = ({ name, id, handleAmenitiesChange, isChecked }) => {
  return (
    <div
      onClick={() => handleAmenitiesChange(id)}
      key={id}
      className="p-5 bg-[#F9F9F9] rounded-2xl flex items-center space-x-3 h-[66px]"
    >
      <svg
        width={30}
        height={30}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_15326_715)">
          <path
            d="M12 3C19.2 3 21 4.8 21 12C21 19.2 19.2 21 12 21C4.8 21 3 19.2 3 12C3 4.8 4.8 3 12 3Z"
            stroke="#333333"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {isChecked && (
            <path
              d="M9 12l1 3 6-6"
              stroke="#B69F6F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill='white'
            />
          )}
        </g>
        <defs>
          <clipPath id="clip0_15326_715">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div className="flex items-center space-x-2">
        <div className="bg-white w-[42px] h-[42px] flex justify-center items-center rounded-2xl font-semibold">
          {name.charAt(0)}
        </div>
        <p className="font-inter text-[#8A8A8A]">{name}</p>
      </div>
    </div>
  );
};


AmenitiesCheckbox.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  handleAmenitiesChange: PropTypes.func,
  isChecked: PropTypes.bool,
};


function AmenitiesList({ amenitiesList, selectedAmenities, handleAmenitiesChange }) {
  return (
    <>
      {amenitiesList?.map(({ name, id }) => (
        <AmenitiesCheckbox
          key={id}
          name={name}
          id={id}
          handleAmenitiesChange={handleAmenitiesChange}
          isChecked={selectedAmenities.includes(id)}
        />
      ))}
    </>
  );
}


AmenitiesList.propTypes = {
  amenitiesList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  })),
  selectedAmenities: PropTypes.arrayOf(PropTypes.number),
  handleAmenitiesChange: PropTypes.func,
};