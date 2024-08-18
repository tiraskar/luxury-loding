import { GuideBookBanner, LatestPosts, RentalExperience } from "../components";


const BlogAndGuideBook = () => {
  return (
    <div className="flex flex-col gap-y-[150px] pt-8">
      <GuideBookBanner />
      <LatestPosts />
      <RentalExperience />
    </div>
  );
};

export default BlogAndGuideBook;