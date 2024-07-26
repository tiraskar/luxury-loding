import ActivitiesAndServices from "./components/ActivitiesAndServices";
import Banner from "./components/Banner";
import Offer from "./components/Offer";
import QuestionAnswer from "./components/QnA";

const Home = () => {
  return (
    <div className="space-y-20 font-onest">
      <Banner />
      <Offer />
      <ActivitiesAndServices />
      <QuestionAnswer />
    </div>
  );
};

export default Home;