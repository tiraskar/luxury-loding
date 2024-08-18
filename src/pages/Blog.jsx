import { LatestPosts, QuestionAndAnswers } from "../components";

const Blog = () => {
  return (
    <div className="space-y-20 pt-8">
      <LatestPosts />
      <QuestionAndAnswers />
    </div>
  )
}

export default Blog