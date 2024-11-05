import { LuBath, LuUser2, LuUsers } from "react-icons/lu";
import { TbBed } from "react-icons/tb";
// import { GrLocation } from "react-icons/gr";
import { CiCalendar } from "react-icons/ci";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { useLocation } from "react-router-dom";
import TokenDiscount from "./TokenDiscount";
import { formateDate } from "../../helper/date";
import { formattedPrice } from "../../helper/formatter";
// import { useEffect, useState } from "react";

const Booking = () => {

  const { pathname } = useLocation();
  const { listingInfo } = useSelector(state => state.listing);
  const { bookingPrice,
    // loading,
    totalDiscountPrice, isValidToken } = useSelector(state => state.booking);

  // const [isValidToken, setIsTokenValid] = useState(false);
  // const [totalDiscountPrice, setTotalDiscountPrice] = useState()

  const images = listingInfo?.images || [];

  const guestNumber = localStorage?.getItem('guests');
  const bookingCheckIn = localStorage?.getItem('checkIn');
  const bookingCheckOut = localStorage?.getItem('checkOut');

  // const discountPrice = localStorage?.getItem('discountPrice');
  // const isTokenValid = localStorage?.getItem('isTokenValid');

  // useEffect(() => {
  //   if (isTokenValid == 'true') {
  //     setIsTokenValid(true);
  //   } else {
  //     setIsTokenValid(false);
  //   }

  //   if (discountPrice && discountPrice !== 0) {
  //     setTotalDiscountPrice(Number(discountPrice).toFixed(2));
  //   }
  // }, [isTokenValid, discountPrice])


  return (
    <div className=" space-y-6 md:space-y-8 px-1 xs:px-2 sm:px-0 pt-5">
      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4">
        <div className="xl:max-h-[145px] sm:max-w-[350px] lg:max-w-full xl:max-w-[207px]">
          <img src={images[0]?.url} alt="" className="w-full h-full object-cover rounded-xl" />
        </div>
        <div className="flex flex-col space-y-5 lg:h-[145px]">

          <h1 className="text-[1rem] font-inter tracking-[-1%] font-semibold leading-[22px] line-clamp-2 sm:line-clamp-none">
            {listingInfo.name}
          </h1>

          <div className="flex flex-col space-y-3">
            <div className="flex gap-x-3 text-[#8E8E80] items-center font-inter h-[15px] ">
              <div className="flex gap-1 items-center rounded-2xl text-[13px]">
                <LuUsers size={14} /> {listingInfo.personCapacity} {listingInfo.personCapacity > 1 ? 'guests' : 'guest'}
              </div>

              <div className="flex gap-1 items-center rounded-2xl text-[13px]">
                <TbBed size={14} /> {listingInfo.bedroomsNumber} {listingInfo.bedroomsNumber > 1 ? 'bedrooms' : 'bedroom'}

              </div>
              <div className="flex gap-1 items-center rounded-2xl text-[13px]">
                <LuBath size={14} /> {listingInfo.bathroomsNumber} {listingInfo.bathroomsNumber > 1 ? 'baths' : 'bath'}
              </div>
            </div>
            {/* <div className="flex items-center h-7">
              <p className="text-[#333333] font-bold text-xl">${listingInfo.price}</p>
              <p className="text-[#8E8E80] text-sm tracking-tight">&nbsp;/ per night</p>
            </div> */}
          </div>
        </div>
      </div>
      <div className="min-w-full h-px bg-[#E0E0E0] my-6 px-4 "></div>
      <div className="max-w-[396px] flex flex-col justify-center ">
        <h1 className="font-onest tracking-normal font-medium text-xl pb-6">Book {listingInfo.propertyType}</h1>
        <div className="space-y-2 ">

          <div className="grid grid-cols-2 gap-[10px]">
            <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px] ">
              <p className="flex text-[#8A8A8A] space-x-2 items-center">
                <CiCalendar size={18} /> <p>Check in</p>
              </p>
              <p className="font-semibold pl-6">
                <DatePicker
                  selected={bookingCheckIn}
                  readOnly
                  dateFormat="MM/dd/YYYY"
                  placeholderText="MM/DD/YYYY"
                  className="outline-none max-w-[117px] bg-white"
                />


              </p>
            </div>
            <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px]">
              <p className="flex text-[#8A8A8A] space-x-2 items-center">
                <CiCalendar size={18} /> <p>Check out</p>
              </p>
              <p className="font-semibold pl-6">
                <DatePicker
                  selected={bookingCheckOut}
                  readOnly
                  dateFormat="MM/dd/YYYY"
                  placeholderText="MM/DD/YYYY"
                  className="outline-none max-w-[117px] bg-white"
                />
              </p>
            </div>
          </div>

          <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px] ">
            <p className="flex text-[#8A8A8A] space-x-2 items-center">
              <LuUser2 size={18} /> <p>Guests</p>
            </p>
            <p className="font-semibold pl-6">{guestNumber}&nbsp;{guestNumber > 1 ? "Guests" : "Guest"}</p>
          </div>

        </div>
        <div className="flex flex-col space-y-4 md:space-y-6 my-10">
          {bookingPrice?.components?.price?.map(({ title, total }, index) => {
            return (
              <div key={index} className="flex items-center">
                <p className="pr-4">{title}</p>
                <div className="flex-grow flex space-x-2 items-center">
                  <div className="border-t border-dashed border-[#D3D3D3] flex-grow opacity-60" />
                </div>
                <p className="pl-4">${total}</p>
              </div>
            );
          })}
          {bookingPrice?.components?.fee?.map(({ title, total }, index) => {
            return (
              <div key={index} className="flex items-center">
                <p className="pr-4">{title}</p>
                <div className="flex-grow flex space-x-2 items-center">
                  <div className="border-t border-dashed border-[#D3D3D3] flex-grow opacity-60" />
                </div>
                <p className="pl-4">${total}</p>
              </div>
            );
          })
          }
          {bookingPrice?.components?.tax?.map(({ title, total }, index) => {
            return (
              <div key={index} className="flex items-center">
                <p className="pr-4">{title}</p>
                <div className="flex-grow flex space-x-2 items-center">
                  <div className="border-t border-dashed border-[#D3D3D3] flex-grow opacity-60" />
                </div>
                <p className="pl-4">${formattedPrice(total)}</p>
              </div>
            );
          })
          }
          {bookingPrice?.components?.map(({ title, total }, index) => {
            return (
              <div key={index} className="flex items-center">
                <p className="pr-4">{title}</p>
                <div className="flex-grow flex space-x-2 items-center">
                  <div className="border-t border-dashed border-[#D3D3D3] flex-grow opacity-60" />
                </div>
                <p className="pl-4">${formattedPrice(total)}</p>
              </div>
            );
          })
          }
        </div>

        {isValidToken && totalDiscountPrice !== 0 &&
          <div className="flex justify-between">
            <p className="text-sm font-[#8E8E80]">Discount</p>
            <p className=" text-sm sm:text-lg font-bold text-[#333333]">- $ {formattedPrice(totalDiscountPrice)}</p>
          </div>
        }
        <div className="flex justify-between items-center mt-2">
          <p className="text sm font-[#8E8E80]">
            Total</p>
          {/* {!loading && ( */}
            <p className="font-bold text-[#333333] text-xl sm:text-2xl flex items-baseline space-x-2">
            {/* {isValidToken && totalDiscountPrice !== 0 && (
                <span className="line-through text-sm justify-end text-left">
                  ${formattedPrice(bookingPrice.totalPrice)}
                </span>
              )} */}
            {/* {isValidToken && totalDiscountPrice ? (
                <span>
                  $ {formattedPrice((Number(bookingPrice.totalPrice) - Number(totalDiscountPrice)))}
                </span>
              ) : ( */}
                <span>${formattedPrice(bookingPrice.totalPrice)}</span>
            {/* )} */}
            </p>
          {/* )} */}

          {/* {!loading &&
            <p className="font-bold text-[#333333] text-xl sm:text-2xl flex items-baseline space-x-2">
              {isValidToken && totalDiscountPrice != 0 && <span className="line-through text-sm justify-end text-left">${Number(formattedPrice(bookingPrice.totalPrice)).toFixed(2)}</span>}
              {
                isValidToken && totalDiscountPrice ? <span>
                  $ {formattedPrice(`${Number(bookingPrice.totalPrice).toFixed(2) - Number(totalDiscountPrice).toFixed(2)}`)}
                </span>
                  : <span>${Number(formattedPrice(bookingPrice.totalPrice)).toFixed(2)}</span>
              }
          </p>} */}
              {/* {isValidToken && totalDiscountPrice != 0 && <span className="line-through text-sm justify-end text-left">${bookingPrice.totalPrice}<br /></span>}
              <span>${formattedPrice(Number(bookingPrice.totalPrice) - (isValidToken == 'true' && totalDiscountPrice !== 0 ? Number(totalDiscountPrice) : 0))}
            </span> */}
        </div>
        {pathname.includes('payment') && <TokenDiscount
          listingId={listingInfo.id}
          checkInDate={formateDate(new Date(bookingCheckIn))}
          checkOutDate={formateDate(new Date(bookingCheckOut))}
          totalPrice={bookingPrice.totalPrice}
          guestNumber={guestNumber}
        />}
        <p className="text-[#666666] mt-10 mb-3">Any questions? Call us
          <a href="tel:(813) 531-8988" className="text-black cursor-pointer"> (813) 531-8988</a></p>
      </div>
    </div>
  );
};

export default Booking;
