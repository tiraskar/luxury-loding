import { Link } from "react-router-dom";
import { Wrapper } from "..";
import { MdArrowOutward } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { fetchOtherListings } from "../../redux/slices/listingSlice";


const OtherListing = () => {

  // const dispatch = useDispatch();
  // const { otherListings } = useSelector((state) => state.listing);

  // useEffect(() => {
  //   otherListings.length == 0 && dispatch(fetchOtherListings({ limit: 4 }));

  // }, [dispatch, otherListings])

  return (
    <Wrapper>
      <div className="text-[#333333] font-onest tracking-tight flex flex-col justify-center gap-y-7 sm:gap-y-[56px]">
        <h1 className=" text-3xl sm:text-[35px] font-semibold">Others Listing</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[56px]">
          {listingData?.map((post, index) => (
            <div key={index} className="flex flex-col gap-7 xl:max-w-[318px]">
              <img src={post.image} alt={post.title} className="rounded-2xl" />
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
      </div>
    </Wrapper>
  );
};

export default OtherListing;


const listingData = [
  {
    image: "/images/latest-post-one.png",
    title: "The perfect day in old town Scotsdale: Where to explore, eat and drink",
    description: `Sedona, Arizona, is renowned for its stunning red rock also landscapes and enchanting hiking trails. While many flock to the popular routes, we invite you to discover a hidden gem, the Pyramid-Scorpion Loop Hike.`,
    date: "July 12, 2024",
    readTime: "5 mins read"
  },
  {
    image: "/images/latest-post-two.png",
    title: "The perfect day in old town Scotsdale: Where to explore, eat and drink",
    description: `Sedona, Arizona, is renowned for its stunning red rock also landscapes and enchanting hiking trails. While many flock to the popular routes, we invite you to discover a hidden gem, the Pyramid-Scorpion Loop Hike.`,
    date: "July 14, 2024",
    readTime: "7 mins read"
  },
  {
    image: "/images/latest-post-three.png",
    title: "The perfect day in old town Scotsdale: Where to explore, eat and drink",
    description: `Sedona, Arizona, is renowned for its stunning red rock also landscapes and enchanting hiking trails. While many flock to the popular routes, we invite you to discover a hidden gem, the Pyramid-Scorpion Loop Hike.`,
    date: "July 16, 2024",
    readTime: "9 mins read"
  },
  {
    image: "/images/latest-post-four.png",
    title: "The perfect day in old town Scotsdale: Where to explore, eat and drink",
    description: `Sedona, Arizona, is renowned for its stunning red rock also landscapes and enchanting hiking trails. While many flock to the popular routes, we invite you to discover a hidden gem, the Pyramid-Scorpion Loop Hike.`,
    date: "July 18, 2024",
    readTime: "11 mins read"
  },

];