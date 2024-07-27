import SearchListing from "./components/forms/SearchListing";
import ListingList from "./components/ListingList";

const Listing = () => {
  return (

    <div className="space-y-[79px]">
      <SearchListing />
      <ListingList />
    </div>
  );
};

export default Listing;