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
  const dispatch = useDispatch();

  const { searchedListingList, isHomePageSearch, isSearchedListing } =
    useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(setSearchListingParamsToInitialState());
  }, []);

  return (
    <div className=" space-y-[9.375rem] font-onest pt-[5px]">
      <div className="space-y-[10.5625rem]">
        <div className="">
          <HomeBanner />
          <Wrapper>
            <h1 className="text-4xl pt-20 pb-10 font-semibold text-[#333333]">
              {searchedListingList.length > 0 && `Available listings (${searchedListingList.length})`}
            </h1>
            {isHomePageSearch && <ListingLoading numbers={8} />}
            {searchedListingList.length > 0 && (
              <RenderListings listingList={searchedListingList} />
            )}
            {searchedListingList.length == 0 &&
              isSearchedListing &&
              !isHomePageSearch && (
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
        <div className="space-y-[10.1875rem]">
          <Greeting />
          <FeaturedHomes />
        </div>
      </div>
      <Offer />
      <RentalExperience />
      <ActivitiesAndServices /> 
      <Testimonials />
      <div className="space-y-[3.5rem]"> 
        <AccommodationExperience />
        <Accommodation />
      </div>
      <QuestionAndAnswers />
    </div>
  );
};

export default Home;
