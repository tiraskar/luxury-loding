import ActivitiesAndServices from "./components/ActivitiesAndServices";
import Banner from "./components/Banner";

const Home = () => {
  return (
    <div className="space-y-20 font-onest">
      <Banner />
      <ActivitiesAndServices />
    </div>
  );
};

export default Home;