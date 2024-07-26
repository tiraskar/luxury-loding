import ActivitiesAndServices from "./components/ActivitiesAndServices";
import Banner from "./components/Banner";
import QuestionAnswer from "./components/QnA";

const Home = () => {
  return (
    <div className="space-y-20 font-onest">
      <Banner />
      <ActivitiesAndServices />
      <QuestionAnswer />
    </div>
  );
};

export default Home;