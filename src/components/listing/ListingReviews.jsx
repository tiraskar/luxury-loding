import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { GrPowerCycle } from "react-icons/gr";
import { useSelector } from "react-redux";
import { getRelativeDateOrTime } from "../../helper/date";

const ListingReviews = () => {

  const { listingReviews, isReviewLoading } = useSelector(state => state.listing);

  const [value, setValue] = useState('');
  const [lastSliceIndex, setListSliceIndex] = useState(3)

  const handleInput = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setValue(textarea.value);
  };

  const handleLoadReviews = () => {
    setListSliceIndex(prevState => prevState + 3);
  };


  return (
    <div id="listing-reviews" className="tracking-tight space-y-8">
      <h1 className="text-xl font-semibold tracking-[-2%]">Reviews</h1>

      {/* Review form */}
      <form
        action=""
        className="border-[#0085FF] border-[1px] rounded-2xl p-4 space-y-4"
        style={{ boxShadow: '-0.5px 1px 6px 1px  rgba(0, 133, 255, 0.4)' }}
      >
        <textarea
          value={value}
          rows={1}
          className="w-full outline-none resize-none"
          placeholder="Write a review..."
          onInput={handleInput}
          style={{ overflow: 'hidden' }}
        />
        <div className="min-w-full h-px bg-[#E0E0E0] my-[2px] px-4"></div>
        <div className="flex justify-end">
          <button className="px-5 py-3 rounded-xl text-white bg-black ">Send</button>
        </div>
      </form>



      {isReviewLoading && <p>Loading ...</p>}
      {/* Review List */}
      <div className="flex flex-col space-y-8">
        {listingReviews?.slice(0, lastSliceIndex).map((review, index) => {
          const reviewFirstText = review.reviewerName ? review.reviewerName.charAt(0) : '' || review.guestName ? review.guestName.charAt(0) : '';
          const reviewTime = getRelativeDateOrTime(review?.insertedOn);
          return (
            <div key={index} className="flex flex-col space-y-[14px]">
              <div className="flex flex-row items-center gap-x-3">

                <div className="rounded-full h-[42px] w-[42px] flex justify-center bg-buttonPrimary text-white font-bold items-center">
                  {
                    review.image ? <img src={review.image} alt={review.name} className="rounded-full h-[42px] w-[42px]" />
                      : reviewFirstText
                  }
                </div>
                <p className="text-[1rem] font-semibold capitalize">{review.guestName}</p>
              </div>
              <p className="text-[13px] leading-6">{review.publicReview}</p>
              <div className="flex justify-between items-center">
                <div className="flex flex-row gap-x-[7px] items-center">
                  <FaStar color="#FFC75C" size={14} />
                  <p className="flex flex-row items-center font-semibold text-xs">{review.rating} / <span className="font-normal">&nbsp;10</span></p>
                </div>
                <p className="opacity-50">{reviewTime}</p>
              </div>
              {index < lastSliceIndex - 1 && (
                <div className="h-px bg-textDark opacity-20"></div>
              )}
            </div>
          );
        })}
        {!isReviewLoading && listingReviews.length === 0 ?
          <p className="text-center text-[14px]">No reviews yet.</p>
          : lastSliceIndex < listingReviews.length && <button
            onClick={() => handleLoadReviews()}
            className="flex flex-row justify-center items-center tracking-normal font-inter text-[13px] gap-x-2 py-2 px-[10px] border-[0.6px] border-[#D7DBE8] w-fit rounded-2xl">
            Load more
            <GrPowerCycle size={18} />
          </button>

        }
      </div>

      {/* Load more review List */}

    </div>
  );
};

export default ListingReviews;
