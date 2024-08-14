import { useDispatch, useSelector } from "react-redux";
import {
  HomeBanner,
  Greeting,
  FeaturedHomes,
  Offer,
  RentalExperience,
  ActivitiesAndServices,
  Testimonials,
  AccommodationExperience,
  Accommodation,
  QuestionAndAnswers,
  Wrapper,
  ListingLoading,
} from "../components";
import RenderListings from "../components/listing/RenderListings";
import { useEffect } from "react";
import { setSearchListingParamsToInitialState } from "../redux/slices/listingSlice";

const Home = () => {
  const disptach = useDispatch();

  const { searchedListingList, isSearchListing, isSearchedListing } =
    useSelector((state) => state.listing);

  useEffect(() => {
    disptach(setSearchListingParamsToInitialState());
  }, []);

  return (
    <div className="space-y-20 font-onest pt-[5px]">
      <div className="">
        <div className="space-y-20">
          <HomeBanner />
          <Wrapper>
            <h1 className="text-4xl pb-10 font-semibold text-[#333333]">
              {searchedListingList.length > 0 && "Search Results"}
            </h1>
            {isSearchListing && <ListingLoading numbers={8} />}
            {searchedListingList.length > 0 && (
              <RenderListings listingList={searchedListingList} />
            )}
            {searchedListingList.length == 0 &&
              isSearchedListing &&
              !isSearchListing && (
                <div>
                  <h1 className="text-3xl font-semibold text-[#333333]">
                    No listings found.
                  </h1>
                  <p className="text-sm text-[#939387]">
                    Please refine your search criteria and try again.
                  </p>
                </div>
              )}
          </Wrapper>
        </div>
        <div className="pt-[169px]">
          <Greeting />
        </div>
      </div>
      <FeaturedHomes />
      <Offer />
      <RentalExperience />
      <ActivitiesAndServices />
      <Testimonials />
      <AccommodationExperience />
      <Accommodation />
      <QuestionAndAnswers />
    </div>
  );
};

export default Home;
