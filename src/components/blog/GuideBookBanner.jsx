import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import Wrapper from "../common/Wrapper";
import CustomImage from "../ui/CustomImage";

const GuideBookBanner = () => {

  const post = {
    id: 1,
    title: "Sedona’s secret Hike: Escape the crowds with this trial",
    description: `Sedona, Arizona, is renowned for its stunning red rock also landscapes and enchanting hiking trails. While many flock to the popular routes, we invite you to discover a hidden gem, the Pyramid-Scorpion Loop Hike.`,
    date: "July 12, 2024",
    readTime: "5 mins read"
  };

  return (
    <Wrapper>
      <div className="text-[#333333] font-onest tracking-tight flex flex-col justify-start gap-y-[56px]">

        <div className="space-y-10 flex flex-col">
          <p className="flex items-center text-sm text-[#A1A196] gap-1">
            <span>Home</span>
            <span className="text-black font-medium flex items-center gap-1"> <GoDotFill className="h-2" /> Blog & Guidebook</span>
        </p>
          <h1 className=" text-3xl xxs:text-4xl xs:text-[40px] sm:text-[46px] md:text-[50px] lg:text-[58px] font-semibold">Blog & Guidebook</h1>
        </div>

        <div
          className="relative flex flex-col lg:flex-row  bg-cardBackgroundLight rounded-3xl  xs:p-4 sm:pr-[18px] sm:pl-6 gap-4 lg:max-h-[633px] max-w-[1320px]"
        >

          <div className="relative flex flex-col justify-between sm:min-w-[400px] max-w-[675px] py-2">
            <div className="flex flex-row items-center gap-3 ">
              <div className="w-[42px] h-[42px] rounded-full">
                <CustomImage
                  src='images/profile-alex.png'
                  alt="" className="" />
              </div>
              <div className="flex flex-col tracking-[-0.16px] font-inter space-y-0.5">
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
                <Link to={`/blog/guidebook/${post.id}`}>Read more </Link>
                <MdArrowOutward />
              </div>
            </div>

          </div>

          <div className="">
            <CustomImage
              src='images/guide-book-banner.png'
              className="w-full max-w-[857px] h-full max-h-[597px] rounded-xl object-contain"
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default GuideBookBanner;