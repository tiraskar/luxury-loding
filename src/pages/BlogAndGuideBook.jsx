import LatestPosts from "./components/LatestPosts";
import RentalExperience from "./components/RentalExperience";

const BlogAndGuideBook = () => {
  return (
    <div className="flex flex-col gap-y-[150px]">
      <LatestPosts />
      <RentalExperience />
    </div>
  );
};

export default BlogAndGuideBook;