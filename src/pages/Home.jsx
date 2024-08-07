import { useSelector } from "react-redux";
import { HomeBanner, Greeting, FeaturedHomes, Offer, RentalExperience, ActivitiesAndServices, Testimonials, AccommodationExperience, Accommodation, QuestionAndAnswers, Wrapper, ListingLoading } from "../components";
import RenderListings from "../components/listing/RenderListings";


const Home = () => {
  const { searchedListingList, isSearchListing } = useSelector(state => state.listing);
  return (
    <div className="space-y-20 font-onest">
      <HomeBanner />
      <Wrapper>
        {isSearchListing && <ListingLoading numbers={8} />}
        {searchedListingList.length > 0 &&
          <RenderListings
            listingList={searchedListingList}
          />}

      </Wrapper>
      <Greeting />
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