import Wrapper from "../common/Wrapper";

const FeaturedHomeSkeleton = () => {
  return (
    <Wrapper>
      <div
        className="relative  grid lg:flex snap-center min-w-full animate-pulse  rounded-2xl gap-4"
      >
        <div className="flex flex-col justify-end space-y-10 sm:min-w-[400px]">

          <div className="flex flex-col space-y-4">
            <div className="text-xl sm:text-2xl md:text-[28px] font-medium tracking-[-1%] lg:max-w-[365px] bg-cardBackgroundDark rounded-lg">
              <div className="text-gray-500 w-full h-6"></div>
            </div>
            <div className="text-xl sm:text-2xl md:text-[28px] font-medium tracking-[-1%] lg:max-w-[365px] bg-cardBackgroundDark rounded-lg">
              <div className="text-gray-500 w-full h-6 "></div>
            </div>
            <div className="text-xl sm:text-2xl md:text-[28px] font-medium tracking-[-1%] lg:max-w-[365px] bg-cardBackgroundDark rounded-lg">
              <div className="text-gray-500 w-full h-6 "></div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 ">
            <div className="flex gap-1 border bg-cardBackgroundDark border-[#7B6944] px-10 py-1 items-center rounded-2xl text-xs sm:text-sm">
            </div>
            <div className="flex gap-1 border bg-cardBackgroundDark border-[#7B6944] px-10 py-1 items-center rounded-2xl text-xs sm:text-sm">

            </div>
            <div className="flex gap-1  border bg-cardBackgroundDark border-[#7B6944] px-10 py-1 items-center rounded-2xl text-xs sm:text-sm">
            </div>
          </div>
        </div>
        <div className=" w-full h-[400px] lg:h-[500px] bg-cardBackgroundDark rounded-2xl">
        </div>
      </div>
    </Wrapper>
  );
};

export default FeaturedHomeSkeleton;