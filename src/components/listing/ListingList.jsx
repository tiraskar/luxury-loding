import { useState } from "react";
import { ListingLoading, Wrapper } from "../../components";

// import ListingMap from "./ListingMap";
import ListingViewOptions from "./ListingViewOptions";
import { useSelector } from "react-redux";
import RenderListings from "./RenderListings";
import LoadMoreListingButton from "../ui/LoadMoreListingButton";

const ListingList = () => {

  const { listingList, listingCount, isFetchListing, isFetchAvailableListing, availableListing, isSearchedListing, isHomePageSearch } =
    useSelector((state) => state.listing);

  const [isMapViewOpen, setIsMapViewOpen] = useState(false);


  return (
    <Wrapper>
      <div className="text-[#333333] font-onest tracking-[-2%] flex flex-col justify-center gap-y-8">
        <div className="flex flex-wrap justify-between items-center gap-2 ">
          <h1 className=" text-2xl sm:text-3xl md:text-[35px] font-semibold h-[45px]">
            {isSearchedListing ? `Available listings - ${availableListing.length}` : `All listings - ${listingCount || 0}`}  
          </h1>
          <div>

          </div>
          <ListingViewOptions
            isMapViewOpen={isMapViewOpen}
            setIsMapViewOpen={setIsMapViewOpen}
          />
        </div>
        <div>
        {(isFetchListing || isFetchAvailableListing) ?
          <ListingLoading numbers={8} />
          :
          <RenderListings
            listingList={(isSearchedListing && !isHomePageSearch) ? availableListing : listingList}
          />
          }
          {isSearchedListing && availableListing.length == 0 && (
            <div className="pt-5  xs:pt-20 2xl:pt-40">
              <h1 className="text-lg xxs:text-xl md:text-2xl lg:text-3xl font-semibold text-[#333333]">
                No listings found.
              </h1>
              <p className="text-sm text-[#939387]">
                Please refine your search criteria and try again.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center pt-8">
          {!isSearchedListing && listingCount > listingList.length && <LoadMoreListingButton />
          }
          {!isSearchedListing && availableListing.length > 8 &&
            <LoadMoreListingButton />
          }
        </div>
        {/* <ListingMap /> */}
      </div>
    </Wrapper>
  );
};

export default ListingList;
