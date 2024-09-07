const AmenitiesSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="h-[60px] bg-textLight rounded-2xl max-w-[360px] mb-2.5"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default AmenitiesSkeleton;