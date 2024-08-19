
// import PropTypes from 'prop-types';
// // import { TbBeachOff } from "react-icons/tb";
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAmenitiesList, setAmenitiesListingParams, setSearchListingParams, setSearchListingParamsToInitialState, toggleApplyFilter, toggleFilterOpen } from '../../redux/slices/listingSlice';
// import LoadingSpinner from '../ui/LoadingSpinner';
// import { useEffect } from 'react';

// const Popup = () => {

//   const dispatch = useDispatch();

//   const { searchListingParams, amenitiesList, isFetchingAmenities } = useSelector(state => state.listing)

//   const handleSearchInputChange = (name, value) => {
//     dispatch(setSearchListingParams({ name, value }))
//   };

//   const handleAmenitiesChange = (id) => {
//     dispatch(setAmenitiesListingParams(id));
//   }

//   useEffect(() => {
//     dispatch(fetchAmenitiesList());
//   }, [])

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 bg-fixed  flex items-center justify-center z-50 text-[#333333] transition-all delay-500 ease-in-out">

//       <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-md z-10 py-2  lg:w-[430px] max-h-[820px]">

//         <div className='flex justify-between items-center px-4 py-2'>
//           <h2 className="text-[18px] font-medium font-inter tracking-[-2%]">Filters</h2>
//           <button
//             className="text-3xl font-normal opacity-50"
//             onClick={() => dispatch(toggleFilterOpen())}
//           >
//             &times;
//           </button>
//         </div>

//         <div className="min-w-full h-px bg-[#E0E0E0]"></div>

//         <div className='font-onest space-y-4 py-4 tracking-[-1%] px-4 lg:max-h-[700px] sm:max-h-[550px] overflow-x-scroll'>

//           <div className='space-y-3'>

//             <h3 className="font-inter tracking-[-2%] font-medium text-[1rem]">Size</h3>
//             <div className='flex flex-col space-y-2 '>
//               <div className='p-5 space-y-2 bg-[#F9F9F9] rounded-2xl'>
//                 <h1 className='font-semibold '>Bedrooms</h1>
//                 <input
//                   type='number'
//                   value={searchListingParams.bedrooms}
//                   onChange={(e) => handleSearchInputChange('bedrooms', e.target.value)}
//                   placeholder='4 bedrooms'
//                   className='font-inter text-[#8A8A8A] bg-[#F9F9F9] outline-none' />
//               </div>
//               <div className='p-5 space-y-2 bg-[#F9F9F9] rounded-2xl'>
//                 <h1 className='font-semibold'>Rooms</h1>
//                 <input
//                   type='number'
//                   value={searchListingParams.rooms}
//                   onChange={(e) => handleSearchInputChange('rooms', e.target.value)}
//                   placeholder='3 rooms'
//                   className='font-inter text-[#8A8A8A] bg-[#F9F9F9] outline-none' />
//               </div>
//               <div className='p-5 space-y-2 bg-[#F9F9F9] rounded-2xl'>
//                 <h1 className='font-semibold'>Room Type</h1>
//                 <select
//                   value={searchListingParams.roomType}
//                   onChange={(e) => handleSearchInputChange('roomType', e.target.value)}
//                   className='font-inter text-[#8A8A8A] bg-[#F9F9F9] outline-none w-full'>
//                   <option value="">Room type</option>
//                   <option value="entire_home">Entire home</option>
//                   <option value="shared_room">Shared room</option>
//                   <option value="private_room">Private room</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className='space-y-5'>

//             <h3 className="font-inter tracking-[-2%] font-medium text-[1rem]">Price</h3>

// <svg width="388" height="67" viewBox="0 0 388 67" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path fillRule="evenodd" clipRule="evenodd" d="M204 8C204 6.34315 205.343 5 207 5H211C212.657 5 214 6.34315 214 8V55H204V8ZM27 20C25.3431 20 24 21.3431 24 23V55H34V23C34 21.3431 32.6569 20 31 20H27ZM0 43C0 41.3431 1.34315 40 3 40H7C8.65685 40 10 41.3431 10 43V55H0V43ZM12 43C12 41.3431 13.3431 40 15 40H19C20.6569 40 22 41.3431 22 43V55H12V43ZM36 33C36 31.3431 37.3431 30 39 30H43C44.6569 30 46 31.3431 46 33V55H36V33ZM51 20C49.3431 20 48 21.3431 48 23V55H58V23C58 21.3431 56.6569 20 55 20H51ZM180 24C180 22.3431 181.343 21 183 21H187C188.657 21 190 22.3431 190 24V55H180V24ZM243 24C241.343 24 240 25.3431 240 27V55H250V27C250 25.3431 248.657 24 247 24H243ZM324 27C324 25.3431 325.343 24 327 24H331C332.657 24 334 25.3431 334 27V55H324V27ZM195 25C193.343 25 192 26.3431 192 28V55H202V28C202 26.3431 200.657 25 199 25H195ZM252 28C252 26.3431 253.343 25 255 25H259C260.657 25 262 26.3431 262 28V55H252V28ZM339 25C337.343 25 336 26.3431 336 28V55H346V28C346 26.3431 344.657 25 343 25H339ZM291 5C289.343 5 288 6.34315 288 8V31V55H298V31V8C298 6.34315 296.657 5 295 5H291ZM264 15C264 13.3431 265.343 12 267 12H271C272.657 12 274 13.3431 274 15V55H264V15ZM351 12C349.343 12 348 13.3431 348 15V55H358V15C358 13.3431 356.657 12 355 12H351ZM216 29C216 27.3431 217.343 26 219 26H223C224.657 26 226 27.3431 226 29V55H216V29ZM303 26C301.343 26 300 27.3431 300 29V55H310V29C310 27.3431 308.657 26 307 26H303ZM276 29C276 27.3431 277.343 26 279 26H283C284.657 26 286 27.3431 286 29V55H276V29ZM363 26C361.343 26 360 27.3431 360 29V55H370V29C370 27.3431 368.657 26 367 26H363ZM372 29C372 27.3431 373.343 26 375 26H379C380.657 26 382 27.3431 382 29V55H372V29ZM231 28C229.343 28 228 29.3431 228 31V55H238V31C238 29.3431 236.657 28 235 28H231ZM312 31C312 29.3431 313.343 28 315 28H319C320.657 28 322 29.3431 322 31V55H312V31Z" fill="url(#paint0_linear_15326_646)" />
//   <path fillRule="evenodd" clipRule="evenodd" d="M75 0C73.3431 0 72 1.34315 72 3V55H82V3C82 1.34315 80.6569 0 79 0H75ZM87 11C85.3431 11 84 12.3431 84 14V55H94V14C94 12.3431 92.6569 11 91 11H87ZM96 14C96 12.3431 97.3431 11 99 11H103C104.657 11 106 12.3431 106 14V55H96V14ZM111 21C109.343 21 108 22.3431 108 24V55H118V24C118 22.3431 116.657 21 115 21H111ZM120 25C120 23.3431 121.343 22 123 22H127C128.657 22 130 23.3431 130 25V55H120V25ZM135 31C133.343 31 132 32.3431 132 34V55H142V34C142 32.3431 140.657 31 139 31H135ZM144 35C144 33.3431 145.343 32 147 32H151C152.657 32 154 33.3431 154 35V55H144V35ZM159 33C157.343 33 156 34.3431 156 36V55H166V36C166 34.3431 164.657 33 163 33H159ZM168 36C168 34.3431 169.343 33 171 33H175C176.657 33 178 34.3431 178 36V55H168V36ZM63 30C61.3431 30 60 31.3431 60 33V55H70V33C70 31.3431 68.6569 30 67 30H63Z" fill="url(#paint1_linear_15326_646)" />
//   <rect y="53" width="388" height="4" rx="2" fill="#F3F3F3" />
//   <rect x="61" y="53" width="107" height="4" rx="2" fill="#B69F6F" />
//   <circle cx="72" cy="55" r="11.25" fill="#B69F6F" stroke="white" strokeWidth="1.5" />
//   <path d="M70 52L70 58" stroke="white" strokeWidth="2" strokeLinecap="round" />
//   <path d="M74 52L74 58" stroke="white" strokeWidth="2" strokeLinecap="round" />
//   <circle cx="166" cy="55" r="11.25" fill="#B69F6F" stroke="white" strokeWidth="1.5" />
//   <path d="M164 52L164 58" stroke="white" strokeWidth="2" strokeLinecap="round" />
//   <path d="M168 52L168 58" stroke="white" strokeWidth="2" strokeLinecap="round" />
//   <defs>
//     <linearGradient id="paint0_linear_15326_646" x1="122.026" y1="0" x2="122.026" y2="55" gradientUnits="userSpaceOnUse">
//       <stop stopColor="#ECECEC" />
//       <stop offset="1" stopColor="#ECECEC" stopOpacity="0" />
//     </linearGradient>
//     <linearGradient id="paint1_linear_15326_646" x1="119" y1="0" x2="119" y2="66" gradientUnits="userSpaceOnUse">
//       <stop stopColor="#B69F6F" />
//       <stop offset="1" stopColor="#ECECEC" stopOpacity="0" />
//     </linearGradient>
//   </defs>
// </svg>
//             <div className='flex justify-between'>
//               <div className='flex flex-row items-center rounded-xl'>
//                 <label  className="mr-2">Min</label>
//                 <div className='flex items-center border-[1px] border-[#F4F4F4] rounded-xl px-3'>
//                   <input
//                     name="min-amount"
//                     type="text"
//                     inputMode="numeric"
//                     pattern="\d*"
//                     placeholder=""
//                     value={searchListingParams.minPrice}
//                     onChange={(e) => handleSearchInputChange('minPrice', e.target.value)}
//                     className="outline-none w-8 rounded-xl py-1"
//                   />
//                   <span>$</span>
//                 </div>
//               </div>

//               <div className='flex flex-row items-center rounded-xl'>
//                 <label className="mr-2">Max</label>
//                 <div className='flex items-center border-[1px] border-[#F4F4F4] rounded-xl px-3'>
//                   <input
//                     name="max-amount"
//                     type="text"
//                     inputMode="numeric"
//                     pattern="\d*"
//                     placeholder=""
//                     value={searchListingParams.maxPrice}
//                     onChange={(e) => handleSearchInputChange('maxPrice', e.target.value)}
//                     className="outline-none w-10 rounded-xl py-1"
//                   />
//                   <span>$</span>
//                 </div>
//               </div>
//             </div>

//           </div>

//           <div className='space-y-5'>
//             <p className="">Amenities</p>
//             <div className='space-y-4'>
//               <h5 className='font-inter text-[#8A8A8A] text-[13px]'>Entertainment & Games</h5>
//               {isFetchingAmenities ? <LoadingSpinner /> : amenitiesList?.map(({ name, id }) => {
//                 return (
//                   <div key={id} className='p-5 bg-[#F9F9F9] rounded-2xl flex items-center space-x-3'>
//                     <input
//                       checked={searchListingParams.amenities.includes(id)}
//                       onClick={() => handleAmenitiesChange(id)}
//                       type="checkbox"
//                       className="w-[22px] h-[22px]"
//                     />
//                     <div className='flex items-center space-x-2'>
//                       <div className='bg-white w-[42px] h-[42px] flex justify-center items-center rounded-2xl font-semibold'>
//                         {/* <TbBeachOff size={22} /> */} {name.charAt(0)}
//                       </div>
//                       <p className='font-inter text-[#8A8A8A]'>{name}</p>
//                     </div>
//                   </div>
//                 );
//               })
//               }
//               {/* <div className='p-5 bg-[#F9F9F9] rounded-2xl flex items-center space-x-3'>
//                 <input type="checkbox" className="w-[22px] h-[22px] bg-buttonPrimary" />
//                 <div className='flex items-center'>
//                   <div className='bg-white w-[42px] h-[42px] flex justify-center items-center rounded-2xl'>
//                     <TbBeachOff size={22} />
//                   </div>
//                   <p className='font-inter text-[#8A8A8A]'>Private Pool</p>
//                 </div>
//               </div> */}
//             </div>
//           </div>
//         </div>
//         <div className="min-w-full h-px bg-[#E0E0E0]"></div>
//         <div className='flex justify-between items-center px-2 py-2 font-inter'>
//           <p className="text-sm font-medium font-inter tracking-[-2%]">25 listing to show</p>
//           <div className='flex space-x-2 '>
//             <button
//               onClick={() => {
//                 dispatch(setSearchListingParamsToInitialState());
//                 dispatch(toggleFilterOpen());
//               }
//               } 
//               className='px-4 py-2 border-[#D7DBE8] border-[0.6px] rounded-[10px]'>Reset</button>
//             <button
//               onClick={() => {
//                 dispatch(toggleApplyFilter());
//                 dispatch(toggleFilterOpen());
//               }}
//               className='px-4 py-2 bg-[#333333] text-white rounded-[10px]'>Apply filters</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// Popup.propTypes = {
//   isVisible: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
// };


// const FilterListing = () => {

//   return (
//     <div className="">
//       <Popup
//       />
//     </div>
//   );
// };

// export default FilterListing;


import PropTypes from 'prop-types';
// import { TbBeachOff } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAmenitiesList,
  setAmenitiesListingParams,
  setSearchListingParams,
  setSearchListingParamsToInitialState,
  toggleApplyFilter,
  toggleFilterOpen,
} from '../../redux/slices/listingSlice';

import { useEffect, useState } from 'react';

const Popup = () => {
  const dispatch = useDispatch();
  const { searchListingParams, amenitiesList, isFetchingAmenities, listingCount } = useSelector(
    (state) => state.listing
  );

  const handleSearchInputChange = (name, value) => {
    dispatch(setSearchListingParams({ name, value }));
  };

  const handleAmenitiesChange = (id) => {
    dispatch(setAmenitiesListingParams(id));
  };

  useEffect(() => {
    dispatch(fetchAmenitiesList());
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-[#333333] transition-all delay-500 ease-in-out">
      <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-md z-10 py-2 lg:w-[430px] max-h-[820px] h-auto overflow-y-auto sm:max-w-[95%] sm:max-h-[90%]">
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

            <svg width="388" height="67" viewBox="0 0 388 67" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M204 8C204 6.34315 205.343 5 207 5H211C212.657 5 214 6.34315 214 8V55H204V8ZM27 20C25.3431 20 24 21.3431 24 23V55H34V23C34 21.3431 32.6569 20 31 20H27ZM0 43C0 41.3431 1.34315 40 3 40H7C8.65685 40 10 41.3431 10 43V55H0V43ZM12 43C12 41.3431 13.3431 40 15 40H19C20.6569 40 22 41.3431 22 43V55H12V43ZM36 33C36 31.3431 37.3431 30 39 30H43C44.6569 30 46 31.3431 46 33V55H36V33ZM51 20C49.3431 20 48 21.3431 48 23V55H58V23C58 21.3431 56.6569 20 55 20H51ZM180 24C180 22.3431 181.343 21 183 21H187C188.657 21 190 22.3431 190 24V55H180V24ZM243 24C241.343 24 240 25.3431 240 27V55H250V27C250 25.3431 248.657 24 247 24H243ZM324 27C324 25.3431 325.343 24 327 24H331C332.657 24 334 25.3431 334 27V55H324V27ZM195 25C193.343 25 192 26.3431 192 28V55H202V28C202 26.3431 200.657 25 199 25H195ZM252 28C252 26.3431 253.343 25 255 25H259C260.657 25 262 26.3431 262 28V55H252V28ZM339 25C337.343 25 336 26.3431 336 28V55H346V28C346 26.3431 344.657 25 343 25H339ZM291 5C289.343 5 288 6.34315 288 8V31V55H298V31V8C298 6.34315 296.657 5 295 5H291ZM264 15C264 13.3431 265.343 12 267 12H271C272.657 12 274 13.3431 274 15V55H264V15ZM351 12C349.343 12 348 13.3431 348 15V55H358V15C358 13.3431 356.657 12 355 12H351ZM216 29C216 27.3431 217.343 26 219 26H223C224.657 26 226 27.3431 226 29V55H216V29ZM303 26C301.343 26 300 27.3431 300 29V55H310V29C310 27.3431 308.657 26 307 26H303ZM276 29C276 27.3431 277.343 26 279 26H283C284.657 26 286 27.3431 286 29V55H276V29ZM363 26C361.343 26 360 27.3431 360 29V55H370V29C370 27.3431 368.657 26 367 26H363ZM372 29C372 27.3431 373.343 26 375 26H379C380.657 26 382 27.3431 382 29V55H372V29ZM231 28C229.343 28 228 29.3431 228 31V55H238V31C238 29.3431 236.657 28 235 28H231ZM312 31C312 29.3431 313.343 28 315 28H319C320.657 28 322 29.3431 322 31V55H312V31Z" fill="url(#paint0_linear_15326_646)" />
              <path fillRule="evenodd" clipRule="evenodd" d="M75 0C73.3431 0 72 1.34315 72 3V55H82V3C82 1.34315 80.6569 0 79 0H75ZM87 11C85.3431 11 84 12.3431 84 14V55H94V14C94 12.3431 92.6569 11 91 11H87ZM96 14C96 12.3431 97.3431 11 99 11H103C104.657 11 106 12.3431 106 14V55H96V14ZM111 21C109.343 21 108 22.3431 108 24V55H118V24C118 22.3431 116.657 21 115 21H111ZM120 25C120 23.3431 121.343 22 123 22H127C128.657 22 130 23.3431 130 25V55H120V25ZM135 31C133.343 31 132 32.3431 132 34V55H142V34C142 32.3431 140.657 31 139 31H135ZM144 35C144 33.3431 145.343 32 147 32H151C152.657 32 154 33.3431 154 35V55H144V35ZM159 33C157.343 33 156 34.3431 156 36V55H166V36C166 34.3431 164.657 33 163 33H159ZM168 36C168 34.3431 169.343 33 171 33H175C176.657 33 178 34.3431 178 36V55H168V36ZM63 30C61.3431 30 60 31.3431 60 33V55H70V33C70 31.3431 68.6569 30 67 30H63Z" fill="url(#paint1_linear_15326_646)" />
              <rect y="53" width="388" height="4" rx="2" fill="#F3F3F3" />
              <rect x="61" y="53" width="107" height="4" rx="2" fill="#B69F6F" />
              <circle cx="72" cy="55" r="11.25" fill="#B69F6F" stroke="white" strokeWidth="1.5" />
              <path d="M70 52L70 58" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M74 52L74 58" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="166" cy="55" r="11.25" fill="#B69F6F" stroke="white" strokeWidth="1.5" />
              <path d="M164 52L164 58" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M168 52L168 58" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <defs>
                <linearGradient id="paint0_linear_15326_646" x1="122.026" y1="0" x2="122.026" y2="55" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ECECEC" />
                  <stop offset="1" stopColor="#ECECEC" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint1_linear_15326_646" x1="119" y1="0" x2="119" y2="66" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#B69F6F" />
                  <stop offset="1" stopColor="#ECECEC" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="flex justify-between">
              <div className="flex flex-row items-center rounded-xl">
                <label className="mr-2">Min</label>
                <div className="flex items-center border-[1px] border-[#F4F4F4] rounded-xl px-3">
                  <input
                    name="min-amount"
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    placeholder=""
                    value={searchListingParams.minPrice}
                    onChange={(e) => handleSearchInputChange('minPrice', e.target.value)}
                    className="outline-none w-8 rounded-xl py-1"
                  />
                  <span>$</span>
                </div>
              </div>

              <div className="flex flex-row items-center rounded-xl">
                <label className="mr-2">Max</label>
                <div className="flex items-center border-[1px] border-[#F4F4F4] rounded-xl px-3">
                  <input
                    name="max-amount"
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    placeholder=""
                    value={searchListingParams.maxPrice}
                    onChange={(e) => handleSearchInputChange('maxPrice', e.target.value)}
                    className="outline-none w-10 rounded-xl py-1"
                  />
                  <span>$</span>
                </div>
              </div>
            </div>
          </div>

          {/* <PriceRangeSlider /> */}


          <div className="space-y-5">
            <p>Amenities</p>
            <div className="space-y-4">
              <h5 className="font-inter text-[#8A8A8A] text-[13px]">Entertainment & Games</h5>
              {isFetchingAmenities ? (
                <div className='flex '>Loading<p className='animate-bounce pl-1'>...</p></div>
              ) : (
                amenitiesList?.map(({ name, id }) => (
                  <div
                    key={id}
                    className="p-5 bg-[#F9F9F9] rounded-2xl flex items-center space-x-3 h-[66px]"
                  >
                    <input
                      checked={searchListingParams.amenities.includes(id)}
                      onClick={() => handleAmenitiesChange(id)}
                      type="checkbox"
                      className="w-[22px] h-[22px]"
                    />
                    <div className="flex items-center space-x-2">
                      <div className="bg-white w-[42px] h-[42px] flex justify-center items-center rounded-2xl font-semibold">
                        {name.charAt(0)}
                      </div>
                      <p className="font-inter text-[#8A8A8A]">{name}</p>
                    </div>
                  </div>
                ))
              )}
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
              }}
              className="flex px-4  text-[13px] items-center py-2 border-[#D7DBE8] border-[0.6px] rounded-[10px] w-[68px] h-8 "
            >
              Reset
            </button>
            <button
              onClick={() => {
                dispatch(toggleApplyFilter());
                dispatch(toggleFilterOpen());
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

Popup.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const FilterListing = () => {
  return (
    <div className="">
      <Popup />
    </div>
  );
};

export default FilterListing;


const PriceRangeSlider = () => {
  const [minValue, setMinValue] = useState(50);
  const [maxValue, setMaxValue] = useState(550);
  const minRange = 0;
  const maxRange = 600;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 10);
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 10);
    setMaxValue(value);
  };

  return (
    <div className="relative w-full h-8">
      {/* Track */}
      <div className="absolute inset-0 h-1 bg-[#F3F3F3] rounded-full"></div>

      {/* Active Track */}
      <div
        className="absolute h-1 bg-buttonPrimary rounded-full"
        style={{
          left: `${(minValue / maxRange) * 100}%`,
          width: `${((maxValue - minValue) / maxRange) * 100}%`,
        }}
      ></div>

      {/* Minimum Range Input */}
      <div className="relative w-full">
        <input
          type="range"
          min={minRange}
          max={maxRange}
          value={minValue}
          onChange={handleMinChange}
          className="w-full bg-transparent"
        />
        <div
          className="absolute top-1 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(minValue / maxRange) * 100}%`, zIndex: 5 }}
        >
          <SliderIcon />
        </div>
      </div>

      {/* Maximum Range Input */}
      <div className="relative w-full">
        <input
          type="range"
          min={minRange}
          max={maxRange}
          value={maxValue}
          onChange={handleMaxChange}
          className="w-full bg-transparent"
        />
        <div
          className="absolute top-1 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(maxValue / maxRange) * 100}%`, zIndex: 5 }}
        >
          <SliderIcon />
        </div>
      </div>
    </div>
  );
};

const SliderIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11.25" fill="#B69F6F" stroke="white" strokeWidth="1.5" />
      <path d="M10 9L10 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 9L14 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};