import { GrPowerCycle } from 'react-icons/gr';
import { loadMoreListing } from '../../redux/slices/listingSlice';
import { useDispatch, useSelector } from 'react-redux';


const LoadMoreListingButton = () => {

  const dispatch = useDispatch();
  const { isLoadMoreListing } = useSelector(state => state.listing);
  return (
    <div className="flex justify-center">
      <button
        onClick={() => dispatch(loadMoreListing())}
        className="flex flex-row justify-center items-center tracking-normal font-inter text-[13px] gap-x-2 py-2 px-[10px] border-[0.6px] border-[#D7DBE8] w-fit rounded-2xl"
        disabled={isLoadMoreListing}
      >
        Load more
        <GrPowerCycle
          size={18}
          className={`${isLoadMoreListing && "animate-spin"}`}
        />
      </button>
    </div>
  );
};

export default LoadMoreListingButton;