import { useState } from "react";
import { GrPowerCycle } from "react-icons/gr";
import { ListingLoading, Wrapper } from "../../components";

import ListingMap from "./ListingMap";
import ListingViewOptions from "./ListingViewOptions";
import { useDispatch, useSelector } from "react-redux";
import { loadMoreListing } from "../../redux/slices/listingSlice";
import RenderListings from "./RenderListings";

const ListingList = () => {
  const dispatch = useDispatch();

  const { listingList, listingCount, loading, isFetchListing } =
    useSelector((state) => state.listing);

  const [isMapViewOpen, setIsMapViewOpen] = useState(false);

  if (isFetchListing && loading) {
    return (
      <div>
        < ListingLoading numbers={8} />
      </div>
    )
  }



  return (
    <Wrapper>
      <div className="text-[#333333] font-onest tracking-tight flex flex-col justify-center gap-y-12 sm:gap-y-[56px]">
        <div className="flex flex-wrap justify-between gap-2">
          <h1 className=" text-3xl sm:text-[35px] font-semibold">
            All Listings - ({listingCount})
          </h1>

          <ListingViewOptions
            isMapViewOpen={isMapViewOpen}
            setIsMapViewOpen={setIsMapViewOpen}
          />
        </div>
        <RenderListings
          listingList={listingList}
        />

        <div className="flex justify-center">
          {listingCount > listingList.length && (
            <button
              onClick={() => dispatch(loadMoreListing())}
              className="flex flex-row justify-center items-center tracking-normal font-inter text-[13px] gap-x-2 py-2 px-[10px] border-[0.6px] border-[#D7DBE8] w-fit rounded-2xl"
            >
              Load more
              <GrPowerCycle
                size={18}
                className={`${loading && "animate-spin"}`}
              />
            </button>
          )}
        </div>
        <ListingMap />
      </div>
    </Wrapper>
  );
};

export default ListingList;
