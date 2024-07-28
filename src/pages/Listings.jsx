import SearchListing from "./components/forms/SearchListing";
import ListingList from "./components/ListingList";

const Listings = () => {
  return (

    <div className="space-y-[79px]">
      <SearchListing />
      <ListingList />
    </div>
  );
};

export default Listings;