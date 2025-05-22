
//eslint-disable-next-line
const ListingHouseRule = ({ listingHouseRule }) => {
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
    <p
      className="text-xs leading-5"
      dangerouslySetInnerHTML={{ __html: htmlWithCheckmarks }}
    />
  );
};

export default ListingHouseRule;