import ActivitiesAndServices from "./components/ActivitiesAndServices";
import Banner from "./components/Banner";
import FeaturesHome from "./components/FeaturesHome";
import Offer from "./components/Offer";
import QuestionAnswer from "./components/QnA";
import RentalExperience from "./components/RentalExperience";
import Testimonial from "./components/Testimonial";
import Welcome from "./components/Welcome";

const Home = () => {
  return (
    <div className="space-y-20 font-onest">
      <Banner />
      <Welcome />
      <FeaturesHome />
      <Offer />
      <RentalExperience />
      <ActivitiesAndServices />
      <Testimonial />
      <QuestionAnswer />
    </div>
  );
};

export default Home;