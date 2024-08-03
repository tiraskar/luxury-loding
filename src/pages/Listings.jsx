import ListingList from "../components/listing/ListingList";
import SearchListing from "../components/listing/FilterableSearchListingForm";

const Listings = () => {
  return (

    <div className="space-y-[79px]">
      <SearchListing />
      <ListingList />
    </div>
  );
};

export default Listings;