import { LatestPosts, QuestionAndAnswers } from "../components";

const Blog = () => {
  localStorage.clear();
  return (
    <div className=" space-y-6 xs:space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-20 pt-8">
      <LatestPosts />
      <QuestionAndAnswers />
    </div>
  )
}

export default Blog