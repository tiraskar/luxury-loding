import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import { Link } from "react-router-dom";
import { LuBath, LuUsers } from "react-icons/lu";
import { TbBed } from "react-icons/tb";


const RenderListings = ({ listingList }) => {

  const [currentIndex, setCurrentIndex] = useState(
    Array(listingList?.length).fill(0)
  );

  const handleSlide = (postIndex, direction) => {
    const imagesCount = listingList[postIndex].images.length;
    setCurrentIndex((prev) => {
      const newIndex = [...prev];
      newIndex[postIndex] =
        (newIndex[postIndex] + direction + imagesCount) % imagesCount;
      return newIndex;
    });
  };

  const setSlide = (postIndex, index) => {
    setCurrentIndex((prev) => {
      const newIndex = [...prev];
      newIndex[postIndex] = index;
      return newIndex;
    });
  };

  useEffect(() => {
    if (listingList.length > 0) {
      setCurrentIndex(Array(listingList?.length).fill(0));
    }
  }, [listingList]);


  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[56px]">
      {listingList?.map((post, postIndex) => {
        return (
          <div
            key={postIndex}
            className="relative flex flex-col gap-y-4 xl:max-w-[318px]"
          >
            <div className="relative flex overflow-hidden">
              {post?.images?.map((data, index) => {
                return (
                  <div
                    key={index}
                    className={`snap-start flex-shrink-0 w-full transition-transform duration-300
                 ${index === currentIndex[postIndex] ? "block" : "hidden"
                      }`}
                  >
                    <img
                      className="object-cover w-full rounded-md md:h-[241px]"
                      src={data.url}
                      alt=""
                    />
                  </div>
                );
              })}

              {post?.images?.length > 1 && (
                <div className="absolute inset-0 flex justify-between items-center">
                  <div
                    className="absolute left-3 top-[50%] transform -translate-y-1/2 text-black h-6 w-6 bg-white bg-opacity-60 items-center flex justify-center rounded-full cursor-pointer"
                    onClick={() => handleSlide(postIndex, -1)}
                  >
                    <IoIosArrowBack size={14} />
                  </div>
                  <div
                    className="absolute right-3 top-[50%] transform -translate-y-1/2 text-black h-6 w-6 bg-white bg-opacity-60 items-center flex justify-center rounded-full cursor-pointer"
                    onClick={() => handleSlide(postIndex, 1)}
                  >
                    <IoIosArrowForward size={14} />
                  </div>
                  <div className="absolute bottom-2 flex justify-center w-full">
                    {post?.images?.map((_, index) => (
                      <GoDotFill
                        key={index}
                        size={14}
                        onClick={() => setSlide(postIndex, index)}
                        className={`cursor-pointer text-white mx-px ${index === currentIndex[postIndex]
                          ? "opacity-100"
                          : "opacity-60"
                          }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* <div>
          <img
            className="object-cover w-full rounded-md"
            src={post.images[0].url}
            alt=""
          />
        </div> */}
            {post.featured && (
              <p className="absolute tracking-[-1%] bg-white px-3 py-1.5 rounded-lg top-5 left-5 md:top-2 mg:left-2">
                Featured
              </p>
            )}

            <p className="flex items-baseline space-x-1 text-xs text-[#0094FF]">
              <GrLocation /> <span>{post.address}</span>
            </p>

            <div className="flex flex-col gap-4 text-[#333333] font-inter text-lg font-semibold">
              <Link
                to={`/listings/${post.id}`}
                className="text-xl font-inter tracking-[-1%]"
              >
                {post.name}
              </Link>
              <p className="line-clamp-2 text-[#8E8E80] leading-[20px] font-normal text-[13px]">
                {post.description}
              </p>
            </div>

            <div className="flex gap-x-3 text-[#7B6944] items-center font-inter tracking-[-1%]">
              {post?.guestsIncluded && (
                <div className="flex gap-1 items-center rounded-2xl text-[13px]">
                  <LuUsers size={14} /> {post.guestsIncluded}{" "}
                  {post.guestsIncluded > 1 ? "guests" : "guest"}
                </div>
              )}

              {post?.bedroom && (
                <div className="flex gap-1 items-center rounded-2xl text-[13px]">
                  <TbBed size={14} /> {post.bedroom}{" "}
                  {post.bedroom > 1 ? "bedrooms" : "bedroom"}
                </div>
              )}

              {post?.bath && (
                <div className="flex gap-1 items-center rounded-2xl text-[13px]">
                  <LuBath size={14} /> {post.bath}{" "}
                  {post.bath > 1 ? "baths" : "bath"}
                </div>
              )}
            </div>

            <div className="flex items-center">
              <p className="text-[#333333] font-bold text-xl">${post.price}</p>
              <p className="text-[#8E8E80] text-sm tracking-tight">
                &nbsp;/ {post.propertyType}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

RenderListings.propTypes = {
  listingList: PropTypes.array.isRequired,
};

export default RenderListings;