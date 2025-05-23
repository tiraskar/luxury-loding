import { useDispatch, useSelector } from "react-redux";
import {
  HomeBanner,
  Greeting,
  // FeaturedHomes,
  Offer,
  RentalExperience,
  ActivitiesAndServices,
  Testimonials,
  // AccommodationExperience,
  Accommodation,
  QuestionAndAnswers,
  Wrapper,
  ListingLoading,
} from "../components";
import RenderListings from "../components/listing/RenderListings";
import { lazy, Suspense, useEffect } from "react";
import { fetchListingLocationList, setSearchListingParamsToInitialState, toggleMapView } from "../redux/slices/listingSlice";
// import SearchListingMobileView from "../components/listing/SearchListingMobileView";
import { fetchUserReviews } from "../redux/slices/otherSlice";
import { wait } from "../utils/helper";
import FeaturedHomeSkeleton from "../components/ui/FeaturedHomeSkeleton";

const FeaturedHomes = lazy(() => wait(2000).then(() => import("../components/home/FeaturedHomes")))

const Home = () => {
  const dispatch = useDispatch();

  const { searchedListingList, isHomePageSearch, isHomePageLoading } =
    useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(setSearchListingParamsToInitialState());
    dispatch(fetchUserReviews())
    dispatch(fetchListingLocationList())
    dispatch(toggleMapView(false))
    localStorage.clear();
  }, []);

  return (
    <div className="space-y-[3rem] xxs:space-y-[4rem] xs:space-y-[5rem] sm:space-y-[6rem] lg:space-y-[9.375rem] font-onest pt-[5px]">
      <div className="space-y-[3rem] xxs:space-y-[4rem] xs:space-y-[5rem] sm:space-y-[6rem] lg:space-y-[10.5625rem]">
        <div className="">
          <HomeBanner />

          {isHomePageSearch && 
            <Wrapper>
              {searchedListingList.length == 0 &&
                !isHomePageLoading && isHomePageSearch ? (
                  <div className="pt-5  xs:pt-20 2xl:pt-40">
                    <h1 className="text-lg xxs:text-xl md:text-2xl lg:text-3xl font-semibold text-[#333333]">
                    No listings found.
                  </h1>
                  <p className="text-sm text-[#939387]">
                    Please refine your search criteria and try again.
                  </p>
                </div>
              ) :
                <div>
                  <h1 className="text-xl xxs:text-2xl sm:text-3xl md:text-4xl pt-10 xs:pt-20 2xl:pt-40 pb-4 xs:pb-7 sm:pb-10 font-semibold text-[#333333]">
                    {searchedListingList.length > 0 && `Available listings -${searchedListingList.length}`}
                  </h1>
                  {isHomePageLoading && <ListingLoading numbers={8} />}
                  {searchedListingList.length > 0 && (
                    <RenderListings listingList={searchedListingList} />
                  )}
                </div>
              }
          </Wrapper>
          }
        </div>
        <div className="space-y-[3rem] xxs:space-y-[4rem] xs:space-y-[5rem] sm:space-y-[6rem] lg:space-y-[10.1875rem]">
          <Greeting />
          <Suspense fallback={<FeaturedHomeSkeleton />}>
            <FeaturedHomes />
          </Suspense>
        </div>
      </div>
      <Offer />
      <RentalExperience />
      <ActivitiesAndServices /> 
      <Testimonials />
      <div className="space-y-[3.5rem]"> 
        {/* <AccommodationExperience /> */}
        <Accommodation />
      </div>
      <QuestionAndAnswers />
    </div>
  );
};

export default Home;
