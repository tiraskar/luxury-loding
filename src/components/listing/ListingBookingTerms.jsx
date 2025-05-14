
//eslint-disable-next-line
const ListingBookingTerms = ({ className, listingHouseRule }) => {

  return (
    <div id="listing_booking_terms" className={`lg:max-w-[652px] font-inter text-[#333333] tracking-tight ${className}`}>
      <h1 className="text-xl font-semibold">House Rules</h1>
      <div className="lg:max-w-full max-w-[318px] flex pl-3 rounded-2xl  ">
        <p className="text-xs leading-5 ">
          {listingHouseRule?.split("✔️").map((rule, index) => (
            <span key={index} className="py-4">
              {index !== 0 && "✔️"} {rule}
              <br />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default ListingBookingTerms;
