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

  const { searchedListingList, isHomePageSearch, isHomePageLoading } =
    useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(setSearchListingParamsToInitialState());
  }, []);

  return (
    <div className=" space-y-[9.375rem] font-onest pt-[5px]">
      <div className="space-y-[10.5625rem]">
        <div className="">
          <HomeBanner />
          {isHomePageSearch && 
            <Wrapper>
              {searchedListingList.length == 0 &&
                !isHomePageLoading && isHomePageSearch ? (
                  <div className="pt-20 2xl:pt-40">
                  <h1 className="text-3xl font-semibold text-[#333333]">
                    No listings found.
                  </h1>
                  <p className="text-sm text-[#939387]">
                    Please refine your search criteria and try again.
                  </p>
                </div>
              ) :
                <div>
                  <h1 className="text-4xl pt-20 2xl:pt-40 pb-10 font-semibold text-[#333333]">
                    {searchedListingList.length > 0 && `Available listings (${searchedListingList.length})`}
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
