import { LatestPosts, QuestionAndAnswers } from "../components";

const Blog = () => {
  localStorage.clear();
  return (
    <div className="space-y-20 pt-8">
      <LatestPosts />
      <QuestionAndAnswers />
    </div>
  )
}

export default Blog