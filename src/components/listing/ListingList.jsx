import { useState } from "react";
import { ListingLoading, Wrapper } from "../../components";

// import ListingMap from "./ListingMap";
import ListingViewOptions from "./ListingViewOptions";
import { useSelector } from "react-redux";
import RenderListings from "./RenderListings";
import LoadMoreListingButton from "../ui/LoadMoreListingButton";

const ListingList = () => {

  const { listingList, listingCount, isFetchListing, isFetchAvailableListing, availableListing, isSearchedListing } =
    useSelector((state) => state.listing);

  const [isMapViewOpen, setIsMapViewOpen] = useState(false);


  return (
    <Wrapper>
      <div className="text-[#333333] font-onest tracking-tight flex flex-col justify-center gap-y-12 sm:gap-y-[56px]">
        <div className="flex flex-wrap justify-between gap-2">
          <h1 className=" text-3xl sm:text-[35px] font-semibold">
            {isSearchedListing ? `Available Listings - (${availableListing.length})` : `All Listings - (${listingCount})`}  
          </h1>

          <ListingViewOptions
            isMapViewOpen={isMapViewOpen}
            setIsMapViewOpen={setIsMapViewOpen}
          />
        </div>
        {
          (isFetchListing || isFetchAvailableListing) ? <ListingLoading numbers={8} /> :
        <RenderListings
              listingList={isSearchedListing ? availableListing : listingList}
        />
        }

        <div className="flex justify-center">
          {!isSearchedListing && listingCount > listingList.length && <LoadMoreListingButton />
            //   (
            //   <button
            //     onClick={() => dispatch(loadMoreListing())}
            //     className="flex flex-row justify-center items-center tracking-normal font-inter text-[13px] gap-x-2 py-2 px-[10px] border-[0.6px] border-[#D7DBE8] w-fit rounded-2xl"
            //   >
            //     Load more
            //     <GrPowerCycle
            //       size={18}
            //     className={`${isLoadMoreListing && "animate-spin"}`}
            //     />
            //   </button>
            // )
          }
          {!isSearchedListing && availableListing.length > 8 && <LoadMoreListingButton />
            //   (
            //   <button
            //     onClick={() => dispatch(loadMoreListing())}
            //     className="flex flex-row justify-center items-center tracking-normal font-inter text-[13px] gap-x-2 py-2 px-[10px] border-[0.6px] border-[#D7DBE8] w-fit rounded-2xl"
            //   >
            //     Load more
            //     <GrPowerCycle
            //       size={18}
            //       className={`${isLoadMoreListing && "animate-spin"}`}
            //     />
            //   </button>
            // )
          }
        </div>
        {/* <ListingMap /> */}
      </div>
    </Wrapper>
  );
};

export default ListingList;
