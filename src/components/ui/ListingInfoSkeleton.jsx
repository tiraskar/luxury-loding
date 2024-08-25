import Wrapper from "../common/Wrapper";

const ListingInfoSkeleton = () => {
  return (
    <Wrapper>
      <div className="animate-pulse">
        <div className="md:grid md:grid-cols-2 gap-3">
          <div className="bg-textLight rounded-xl w-full h-full mb-4"></div>
          <div className="flex flex-col">
            <div className="bg-textLight rounded-xl w-full h-72 mb-4"></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-textLight rounded-xl w-full h-40 lg:h-48 "></div>
              <div className="bg-textLight rounded-xl w-full h-40 lg:h-48 "></div>
            </div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>

    </Wrapper>
  );
};

export default ListingInfoSkeleton;