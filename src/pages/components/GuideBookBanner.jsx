import { Link } from "react-router-dom";
import { Wrapper } from "../../components";
import { MdArrowOutward } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

const GuideBookBanner = () => {

  const post = {
    title: "Sedona’s secret Hike: Escape the crowds with this trial",
    description: `Sedona, Arizona, is renowned for its stunning red rock also landscapes and enchanting hiking trails. While many flock to the popular routes, we invite you to discover a hidden gem, the Pyramid-Scorpion Loop Hike.`,
    date: "July 12, 2024",
    readTime: "5 mins read"
  };
  return (
    <Wrapper>
      <div className="text-[#333333] font-onest tracking-tight flex flex-col justify-start gap-y-[56px]">

        <p className="flex items-center text-xs text-[#A1A196] gap-1">
          Home <GoDotFill />
          <span className="text-black">Blog & Guidebook</span>
        </p>

        <h1 className=" text-3xl md:text-[35px] font-semibold">Blog & Guidebook</h1>


        <div
          className="relative flex flex-col lg:flex-row  bg-cardBackgroundLight rounded-2xl p-2 xs:p-4 sm:p-5 gap-4 lg:max-h-[633px]"
        >

          <div className="relative flex flex-col justify-between sm:min-w-[400px] max-w-[675px]">
            <div className="flex flex-row items-center gap-3 py-4">
              <div className="w-[42px] h-[42px] rounded-full">
                <img src='/images/profile-alex.png' alt="" className="" />
              </div>
              <div className="flex flex-col tracking-tight font-inter ">
                <h1 className="font-medium text-[1rem]">Alex Brown</h1>
                <p className="text-[13px] text-[#A1A196]">Product designer | Influncer</p>
              </div>
            </div>
            <div className="flex flex-col gap-7 xl:max-w-[397px]">
              <div className="flex flex-col gap-4">
                <h1 className=" text-2xl xs:text-[28px] font-medium font-inter tracking-[-1%]">
                  {post.title}
                </h1>
                <p className=" text-[#8E8E80] text-xs leading-[22px]">
                  {post.description}
                </p>
              </div>
              <p className="flex items-center text-xs text-[#A1A196] gap-2">
                Posted: {post.date} <GoDotFill />
                <span className="text-[#0094FF]">{post.readTime}</span>
              </p>
              <div className="flex flex-row space-x-2 items-center text-[#333333] text-[1rem] font-inter">
                <Link to="/single-blog-guide">Read more </Link>
                <MdArrowOutward />
              </div>
            </div>

          </div>
          <div className="">
            <img src='/images/guide-book-banner.png' className="w-full max-w-[857px] h-full max-h-[597px] rounded-xl object-contain" />
          </div>


        </div>
      </div>
    </Wrapper>
  );
};

export default GuideBookBanner;