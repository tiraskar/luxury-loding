import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { GrPowerCycle } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { getRelativeDateOrTime } from "../../helper/date";
import { saveListingReview } from "../../redux/slices/listingSlice";
import { useForm } from "react-hook-form";

const ListingReviews = () => {

  const { listingReviews, isReviewLoading } = useSelector(state => state.listing);

  const [lastSliceIndex, setListSliceIndex] = useState(3)


  const handleLoadReviews = () => {
    setListSliceIndex(prevState => prevState + 3);
  };

  //todo: filter review 

  const reviewsList = listingReviews?.filter(review => review.status == "published" && review.reviewerName)

  return (
    <div id="listing-reviews" className="tracking-tight space-y-8">
      <h1 className="text-xl font-semibold tracking-[-2%]">Reviews</h1>

      {/* Review form */}
      <ReviewForm />


      {isReviewLoading && <p>Loading ...</p>}
      {/* Review List */}
      <div className="flex flex-col space-y-8">
        {reviewsList?.slice(0, lastSliceIndex).map((review, index) => {
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
                <p className="text-[1rem] font-semibold capitalize">{review.guestName || review.reviewerName}</p>
              </div>
              <p className="text-[13px] leading-6">{review.publicReview}</p>
              <div className="flex justify-between items-center">
                <div className="flex flex-row gap-x-[7px] items-center">
                  <FaStar color="#FFC75C" size={14} />
                  <p className="flex flex-row items-center font-semibold text-xs">{review.rating} / <span className="font-normal">&nbsp;10</span></p>
                </div>
                <p className="opacity-50">{reviewTime}</p>
              </div>
              {index < lastSliceIndex - index && (
                <div className="h-px bg-textDark opacity-20"></div>
              )}
            </div>
          );
        })}
        {!isReviewLoading && reviewsList.length === 0 ?
          <p className="text-center text-[14px]">No reviews yet.</p>
          : lastSliceIndex < reviewsList.length && <button
            onClick={() => handleLoadReviews()}
            className="flex flex-row justify-center items-center tracking-normal font-inter text-[13px] gap-x-2 py-2 px-[10px] border-[0.6px] border-[#D7DBE8] w-fit rounded-2xl">
            Load more
            <GrPowerCycle size={18} />
          </button>

        }
      </div>
    </div>
  );
};

export default ListingReviews;

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingSpinner from "../ui/LoadingSpinner";


const schema = yup.object({
  review: yup.string().min(10, 'Review must be at least 10 characters')
}).required();

const ReviewForm = () => {
  const { isReviewSent, isReviewSaving } = useSelector(state => state.listing);
  const dispatch = useDispatch();
  const [review, setReview] = useState('')

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      review: ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = () => {
    dispatch(saveListingReview(review));
  };

  let textarea = document.getElementById('review-textarea');
  const [rows, setRows] = useState(1);

  useEffect(() => {
    if (isReviewSent) {
      reset(); // Reset the form values
      setReview('');
      setRows(1);
      textarea.style.height = 'auto';
    }
  }, [isReviewSent, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${errors.review ? "border-[#FF0000]" : "border-[#0085FF] "} border-[1px] rounded-2xl p-4 space-y-4`}
      style={{
        boxShadow: `${!errors.review && '-0.5px 1px 6px 1px  rgba(0, 133, 255, 0.4)'}`
      }}
    >
      <textarea
        {...register('review')}
        id="review-textarea"
        rows={rows}
        onChange={(e) => {
          textarea = e.target;
          textarea.style.height = 'auto';
          textarea.style.height = `${textarea.scrollHeight}px`;
          setReview(e.target.value);
        }
        }
        className="w-full outline-none resize-none"
        placeholder="Write a review..."
        style={{ overflow: 'hidden' }}
      />

      {errors?.review && <p className="text-[#FF0000] text-xs">{errors?.review.message}</p>}
      <div className="min-w-full h-px bg-[#E0E0E0] my-[2px] px-4"></div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isReviewSaving}
          className="px-5 py-3 rounded-xl text-white bg-black">
          {isReviewSaving ? <LoadingSpinner /> : "Send"}
        </button>
      </div>
    </form>
  );
};

