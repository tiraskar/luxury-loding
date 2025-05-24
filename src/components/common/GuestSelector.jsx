import { useRef, useEffect } from 'react';
import { LuUser2 } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingGuests } from '../../redux/slices/bookingSlice';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
//eslint-disable-next-line
export default function GuestSelector({ setIsGuestChanged, openGuestDropdown, setOpenDropDown }) {
  const dispatch = useDispatch();
  const { bookingGuests } = useSelector(state => state.booking);
  const { listingInfo } = useSelector(state => state.listing);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropDown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  const handleChange = (type, value) => {
    setIsGuestChanged(true);
    dispatch(setBookingGuests({ name: type, value: value }));
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="bg-white flex flex-col rounded-2xl px-3.5 py-5 space-y-[6px] cursor-pointer"
        onClick={() => {
          setOpenDropDown(!openGuestDropdown);
        }}
      >
        <div className="flex text-[#8A8A8A] space-x-2 items-center">
          <LuUser2 size={18} className="mr-1" /> <span>Guests</span>
        </div>
        <div className="flex space-x-2 font-semibold pl-1 items-center justify-between">
          <p>
            {bookingGuests.adults + bookingGuests.children}
            {(bookingGuests.adults > 1 || bookingGuests.children > 0) ? " guests" : " guest"}
            {bookingGuests.infants > 0 && `, ${bookingGuests.infants} infants`}
            {bookingGuests.pets > 0 && `, ${bookingGuests.pets} ${(bookingGuests.pets > 1 || bookingGuests.pets > 0) ? " pets" : " pet"}`}
          </p>
          <span>
            {openGuestDropdown ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
          </span>
        </div>

      </div>

      {openGuestDropdown && (
        <div className="absolute top-full mt-2 left-0 bg-white border border-buttonPrimary shadow-lg rounded-2xl p-4 w-full z-10">
          {['adults', 'children', 'infants', 'pets'].map((type) => (
            <div key={type} className="flex font-onest justify-between items-center py-2">
              <div>
                <p className="font-medium capitalize">{type}</p>
                <p className="text-sm text-gray-500">
                  {type === 'adults' && 'Age 13+'}
                  {type === 'children' && 'Ages 2–12'}
                  {type === 'infants' && 'Under 2'}
                  {type === 'pets'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleChange(type, -1)}
                  className="w-8 h-8 rounded-full text-buttonPrimary border border-buttonPrimary text-lg flex items-center justify-center disabled:opacity-30"
                  disabled={
                    type === 'adults'
                      ? bookingGuests.adults === 1  // Adults can't go below 1
                      : bookingGuests[type] === 0   // Others can't go below 0
                  }

                >
                  −
                </button>
                <span className="w-5 text-center">{bookingGuests[type]}</span>
                <button
                  onClick={() => handleChange(type, 1)}
                  className="w-8 h-8 rounded-full border text-buttonPrimary border-buttonPrimary text-lg flex items-center justify-center disabled:opacity-30"
                  disabled={
                    (type === 'adults' || type === 'children')
                      ? (bookingGuests.adults + bookingGuests.children >= listingInfo.personCapacity)
                      : (type === 'infants')
                        ? (bookingGuests.infants >= (listingInfo.infants || 5))
                        : (type === 'pets')
                          ? listingInfo?.amenities.some((d) => d.amenityId == 37)
                            ? (bookingGuests.pets >= 2)
                            : true
                          : false
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <p className="text-xs text-gray-500 mt-2">

            This place has a maximum of {listingInfo.personCapacity} guests, not including infants. {(listingInfo && listingInfo?.amenities.filter((d) => d.amenityId == 37).length > 0) ? ` If you're bringing more than 1 pet, please let your host know.` : `Pets aren't allowed.`}
          </p>
          <div className="text-right mt-3">
            <button
              className="text-sm font-semibold underline"
              onClick={() => {
                setOpenDropDown(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
