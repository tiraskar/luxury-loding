// import { ListingLoading, Wrapper } from "../../components";
// import ListingViewOptions from "./ListingViewOptions";
// import { useSelector } from "react-redux";
// import RenderListings from "./RenderListings";
// import LoadMoreListingButton from "../ui/LoadMoreListingButton";
// import { lazy, Suspense } from "react";
// import { wait } from "../../utils/helper";

// const ListingMap = lazy(() => wait(1000).then(() => import("../../components/listing/ListingMap")));

// const ListingList = () => {

//   const { listingList, listingCount, isFetchListing, isFetchAvailableListing, availableListing, isSearchedListing, isHomePageSearch, isMapViewOpen } =
//     useSelector((state) => state.listing);


//   return (
//     <Wrapper>
//       <div className={`${!isMapViewOpen ? "  flex flex-col justify-center" : "lg:grid lg:grid-cols-5 gap-4"} font-onest tracking-[-2%] text-[#333333] relative`}>
//         <div className="flex flex-col lg:col-span-2">
//           <div className="flex flex-wrap justify-between items-center gap-2 pb-8">
//             <h1 className=" text-2xl sm:text-3xl md:text-[35px] font-semibold h-[45px]">
//               {isSearchedListing ? `Available listings - ${availableListing.length}` : `All listings - ${listingCount || 0}`}
//             </h1>
//             <div>

//             </div>
//             <ListingViewOptions />
//           </div>

//           <div className="block lg:hidden  lg:col-span-3 pb-10">
//             {isMapViewOpen && <ListingMap
//               listingList={(isSearchedListing && !isHomePageSearch) ? availableListing : listingList}
//             />
//             }
//           </div>

//           <div>
//             {(isFetchListing || isFetchAvailableListing) ?
//               <ListingLoading numbers={8} />
//               :
//               <RenderListings
//                 listingList={(isSearchedListing && !isHomePageSearch) ? availableListing : listingList}
//               />
//             }
//             {isSearchedListing && !isFetchAvailableListing && availableListing.length == 0 && (
//               <div className="pt-5  xs:pt-20 2xl:pt-40">
//                 <h1 className="text-lg xxs:text-xl md:text-2xl lg:text-3xl font-semibold text-[#333333]">
//                   No listings found.
//                 </h1>
//                 <p className="text-sm text-[#939387]">
//                   Please refine your search criteria and try again.
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="flex justify-center pt-8">
//             {!isSearchedListing && listingCount > listingList.length && <LoadMoreListingButton />
//             }
//             {!isSearchedListing && availableListing.length > 8 &&
//               <LoadMoreListingButton />
//             }
//           </div>
//         </div>
//         <div className=" w-full hidden lg:block  lg:col-span-3 ">
//           {isMapViewOpen &&
//             <Suspense fallback={
//               <div>Loading map...</div>
//             }>
//               <ListingMap
//                 listingList={(isSearchedListing && !isHomePageSearch) ? availableListing : listingList}
//               />
//             </Suspense>
//           }
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default ListingList;


import { ListingLoading, Wrapper } from "../../components";
import ListingViewOptions from "./ListingViewOptions";
import { useSelector } from "react-redux";
import RenderListings from "./RenderListings";
import LoadMoreListingButton from "../ui/LoadMoreListingButton";
import { lazy, Suspense } from "react";
import { wait } from "../../utils/helper";

const ListingMap = lazy(() =>
  wait(1000).then(() => import("../../components/listing/ListingMap"))
);

const ListingList = () => {
  const {
    listingList,
    listingCount,
    isFetchListing,
    isFetchAvailableListing,
    availableListing,
    isSearchedListing,
    isHomePageSearch,
    isMapViewOpen,
  } = useSelector((state) => state.listing);

  const listingsToShow =
    isSearchedListing && !isHomePageSearch ? availableListing : listingList;

  return (
    <Wrapper>
      <div
        className={`${!isMapViewOpen
          ? "flex flex-col justify-center"
          : "lg:grid lg:grid-cols-5 gap-4"
          } font-onest tracking-[-2%] text-[#333333] relative min-h-screen`}
      >
        {/* Left Listing Section */}
        <div className="flex flex-col lg:col-span-2 overflow-y-auto">
          <div className="flex flex-wrap justify-between items-center gap-2 pb-8">
            <h1 className="text-2xl sm:text-3xl md:text-[35px] font-semibold h-[45px]">
              {isSearchedListing
                ? `Available listings - ${availableListing.length}`
                : `All listings - ${listingCount || 0}`}
            </h1>
            <ListingViewOptions />
          </div>

          {/* Mobile Map (visible only on small screens) */}
          <div className="block lg:hidden pb-10">
            {isMapViewOpen && (
              <ListingMap listingList={listingsToShow} />
            )}
          </div>

          {/* Listings or Loader */}
          <div>
            {isFetchListing || isFetchAvailableListing ? (
              <ListingLoading numbers={8} />
            ) : (
              <RenderListings listingList={listingsToShow} />
            )}

            {/* Empty state message */}
            {isSearchedListing &&
              !isFetchAvailableListing &&
              availableListing.length === 0 && (
                <div className="pt-5 xs:pt-20 2xl:pt-40">
                  <h1 className="text-lg xxs:text-xl md:text-2xl lg:text-3xl font-semibold text-[#333333]">
                    No listings found.
                  </h1>
                  <p className="text-sm text-[#939387]">
                    Please refine your search criteria and try again.
                  </p>
                </div>
              )}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center pt-8">
            {!isSearchedListing && listingCount > listingList.length && (
              <LoadMoreListingButton />
            )}
            {!isSearchedListing && availableListing.length > 8 && (
              <LoadMoreListingButton />
            )}
          </div>
        </div>

        {/* Right Map Section (fixed on large screens) */}
        <div className="hidden lg:block lg:col-span-3">
          {isMapViewOpen && (
            <Suspense fallback={<div>Loading map...</div>}>
              <div className="sticky top-10 h-screen">
                <ListingMap listingList={listingsToShow} />
              </div>
            </Suspense>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default ListingList;
