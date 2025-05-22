
//eslint-disable-next-line
const ListingBookingTerms = ({ className, listingHouseRule }) => {
  if (!listingHouseRule) return null;

  // Remove everything before the first ✔ or 1.
  const firstRelevantIndex = listingHouseRule.search(/(?:\d{1,2}\.\s|✔️?|✔)/);
  const cleanedRules = firstRelevantIndex !== -1
    ? listingHouseRule.slice(firstRelevantIndex)
    : listingHouseRule;

  // Add line breaks before section numbers like 1.
  const formattedRules = cleanedRules.replace(/(?:\r?\n)?(?=(?:^|\n)\d{1,2}\.\s)/g, '<br />');

  // Add line break before ✔ and color it
  const htmlWithCheckmarks = formattedRules.replace(
    /✔️?|✔/g,
    '<br /><span style="color: green;">✔️</span>'
  );

  return (
    <div id="listing_booking_terms" className={`lg:max-w-[652px] font-inter text-[#333333] tracking-tight ${className}`}>
      <h1 className="text-xl font-semibold mb-4">House Rules</h1>
      <div className="lg:max-w-full max-w-[318px] flex pl-3 rounded-2xl">
        <p
          className="text-xs leading-5"
          dangerouslySetInnerHTML={{ __html: htmlWithCheckmarks }}
        />
      </div>
    </div>
  );
};

export default ListingBookingTerms;


