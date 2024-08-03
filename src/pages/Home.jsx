import { HomeBanner, Greeting, FeaturedHomes, Offer, RentalExperience, ActivitiesAndServices, Testimonials, AccommodationExperience, Accommodation, QuestionAndAnswers } from "../components"


const Home = () => {
  return (
    <div className="space-y-20 font-onest">
      <HomeBanner />
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