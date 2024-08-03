import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { GrPowerCycle } from "react-icons/gr";

const ListingReviews = () => {
  const reviewData = [
    {
      name: 'Eleanor Pena',
      image: '/images/reviewer-one.png',
      text: `This is a smoke-free home. Violation of the no-smoking policy will result in a $500 fee for additional cleaning and other related costs, in addition to the Guest being responsible for any damages attributable to smoking beyond said fee.`,
      rating: 4.8,
      time: '6 hours ago'
    },
    {
      name: 'Brooklyn Simmons',
      image: '/images/reviewer-two.png',
      text: `This is a smoke-free home. Violation of the no-smoking policy will result in a $500 fee for additional cleaning and other related costs, in addition to the Guest being responsible for any damages attributable to smoking beyond said fee.`,
      rating: 5,
      time: '3 hours ago'
    },
    {
      name: 'Dianne Russell',
      image: '/images/reviewer-three.png',
      text: `This is a smoke-free home. Violation of the no-smoking policy will result in a $500 fee for additional cleaning and other related costs, in addition to the Guest being responsible for any damages attributable to smoking beyond said fee.`,
      rating: 4.5,
      time: '5 hours ago'
    }
  ];
  const [value, setValue] = useState('');

  const handleInput = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setValue(textarea.value);
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



      {/* Review List */}
      <div className="flex flex-col space-y-8">
        {reviewData.map((review, index) => (
          <div key={index} className="flex flex-col space-y-[14px]">
            <div className="flex flex-row items-center gap-x-3">
              <img src={review.image} alt={review.name} className="rounded-full h-[42px] w-[42px]" />
              <p className="text-[1rem] font-semibold">{review.name}</p>
            </div>
            <p className="text-[13px] leading-6">{review.text}</p>
            <div className="flex justify-between items-center">
              <div className="flex flex-row gap-x-[7px] items-center">
                <FaStar color="#FFC75C" size={14} />
                <p className="flex flex-row items-center font-semibold text-xs">{review.rating} / <span className="font-normal">&nbsp;5</span></p>
              </div>
              <p className="opacity-50">{review.time}</p>
            </div>
            {index < reviewData.length - 1 && (
              <div className="h-px bg-textDark opacity-20"></div>
            )}
          </div>
        ))}
      </div>

      {/* Load more review List */}
      <button className="flex flex-row justify-center items-center tracking-normal font-inter text-[13px] gap-x-2 py-2 px-[10px] border-[0.6px] border-[#D7DBE8] w-fit rounded-2xl">
        Load more
        <GrPowerCycle size={18} />
      </button>
    </div>
  );
};

export default ListingReviews;
