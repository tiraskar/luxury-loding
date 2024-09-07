import { Link, useLocation } from "react-router-dom";
import Wrapper from "../common/Wrapper";
import { MdArrowOutward } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
// import { GrPowerCycle } from "react-icons/gr";
import CustomImage from "../ui/CustomImage";



const LatestPosts = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Wrapper>
      <div className="text-[#333333] font-onest tracking-tight flex flex-col justify-center space-y-6 xs:space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-[56px]">

        {pathname !== '/blog' && <div className=" flex space-y-5 flex-col text-[28px] sm:text-3xl md:text-[32px] lg:text-[35px] font-semibold">
          <h1></h1>
        </div>}
        <p className="text-[28px] sm:text-3xl md:text-[32px] lg:text-[35px] text-center">Oops! We haven't written any blogs yet. Stay tuned!</p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[56px]">
          {lastestPosts?.map((post, index) => (
            <div key={index} className="flex flex-col gap-7 xl:max-w-[318px]">
              <CustomImage src={post.image} alt={post.title} className="rounded-2xl" />
              <p className="flex items-center text-xs text-[#A1A196] gap-2">
                Posted: {post.date} <GoDotFill />
                <span className="text-[#0094FF]">{post.readTime}</span>
              </p>
              <div className="flex flex-col gap-4">
                <h1 className="text-xl font-inter tracking-[-1%]">
                  {post.title}
                </h1>
                <p className="line-clamp-2 text-[#8E8E80] text-[11px] leading-[18px]">
                  {post.description}
                </p>
              </div>
              <div className="flex flex-row space-x-2 items-center text-[#333333] text-xs font-inter">
                <Link to="#">Read more </Link>
                <MdArrowOutward />
              </div>
            </div>
          ))}
        </div>

        {/* <div className="flex justify-center">
          <button className="flex flex-row  justify-center items-center tracking-normal font-inter text-[13px] gap-x-2 py-2 px-[10px] border-[0.6px] border-[#D7DBE8] w-fit rounded-2xl">
            Load more
            <GrPowerCycle size={18} />
          </button>
        </div> */}
      </div>
    </Wrapper>
  );
};

export default LatestPosts;


const lastestPosts = [
  // {
  //   image: "images/latest-post-one.png",
  //   title: "The perfect day in old town Scotsdale: Where to explore, eat and drink",
  //   description: `Sedona, Arizona, is renowned for its stunning red rock also landscapes and enchanting hiking trails. While many flock to the popular routes, we invite you to discover a hidden gem, the Pyramid-Scorpion Loop Hike.`,
  //   date: "July 12, 2024",
  //   readTime: "5 mins read"
  // },
  // {
  //   image: "images/latest-post-two.png",
  //   title: "The perfect day in old town Scotsdale: Where to explore, eat and drink",
  //   description: `Sedona, Arizona, is renowned for its stunning red rock also landscapes and enchanting hiking trails. While many flock to the popular routes, we invite you to discover a hidden gem, the Pyramid-Scorpion Loop Hike.`,
  //   date: "July 14, 2024",
  //   readTime: "7 mins read"
  // },
  // {
  //   image: "images/latest-post-three.png",
  //   title: "The perfect day in old town Scotsdale: Where to explore, eat and drink",
  //   description: `Sedona, Arizona, is renowned for its stunning red rock also landscapes and enchanting hiking trails. While many flock to the popular routes, we invite you to discover a hidden gem, the Pyramid-Scorpion Loop Hike.`,
  //   date: "July 16, 2024",
  //   readTime: "9 mins read"
  // },
  // {
  //   image: "images/latest-post-four.png",
  //   title: "The perfect day in old town Scotsdale: Where to explore, eat and drink",
  //   description: `Sedona, Arizona, is renowned for its stunning red rock also landscapes and enchanting hiking trails. While many flock to the popular routes, we invite you to discover a hidden gem, the Pyramid-Scorpion Loop Hike.`,
  //   date: "July 18, 2024",
  //   readTime: "11 mins read"
  // },
  // {
  //   image: "images/latest-post-five.png",
  //   title: "The perfect day in old town Scotsdale: Where to explore, eat and drink",
  //   description: `Sedona, Arizona, is renowned for its stunning red rock also landscapes and enchanting hiking trails. While many flock to the popular routes, we invite you to discover a hidden gem, the Pyramid-Scorpion Loop Hike.`,
  //   date: "July 20, 2024",
  //   readTime: "13 mins read"
  // },
  // {
  //   image: "images/latest-post-six.png",
  //   title: "The perfect day in old town Scotsdale: Where to explore, eat and drink",
  //   description: `Sedona, Arizona, is renowned for its stunning red rock also landscapes and enchanting hiking trails. While many flock to the popular routes, we invite you to discover a hidden gem, the Pyramid-Scorpion Loop Hike.`,
  //   date: "July 22, 2024",
  //   readTime: "15 mins read"
  // },
  // {
  //   image: "images/latest-post-seven.png",
  //   title: "The perfect day in old town Scotsdale: Where to explore, eat and drink",
  //   description: `Sedona, Arizona, is renowned for its stunning red rock also landscapes and enchanting hiking trails. While many flock to the popular routes, we invite you to discover a hidden gem, the Pyramid-Scorpion Loop Hike.`,
  //   date: "July 24, 2024",
  //   readTime: "17 mins read"
  // },
  // {
  //   image: "images/latest-post-eight.png",
  //   title: "The perfect day in old town Scotsdale: Where to explore, eat and drink",
  //   description: `Sedona, Arizona, is renowned for its stunning red rock also landscapes and enchanting hiking trails. While many flock to the popular routes, we invite you to discover a hidden gem, the Pyramid-Scorpion Loop Hike.`,
  //   date: "July 26, 2024",
  //   readTime: "19 mins read"
  // }
];
