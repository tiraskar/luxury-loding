
const ReviewLoading = () => {
  return (
    <div className="flex flex-col space-y-2 animate-pulse">
      <div className="flex space-x-3 items-center" >
        <div className="rounded-full h-[42px] w-[42px] flex justify-center font-bold items-center bg-textLight">
        </div>
        <div className="h-10 bg-textLight rounded-full max-w-[360px] mb-2.5"></div>
      </div>
      <div className="h-2 bg-textLight rounded-full max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-textLight rounded-full max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-textLight rounded-full max-w-[360px] mb-2.5"></div>
    </div>
  );
};

export default ReviewLoading;