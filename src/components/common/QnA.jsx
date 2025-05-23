import { useState } from "react";
import { Wrapper } from "..";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

const QuestionAnswer = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleAnswer = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Wrapper>
      <div className="px-2 sm:px-3 md:px-4 xl:px-0">
        <div className="grid  p-2 xs:p-3 sm:p-4 md:p-6 lg:grid-cols-3 lg:p-[42px] font-onest bg-cardBackgroundLight rounded-[1.5rem] tracking-tight">
          <h1 className="font-semibold text-[24px] sm:text-[26px] md:text-3xl  lg:text-[2rem] xl:text-[35px]  lg:max-w-[330px] col-span-1 py-6 md:py-8 lg:py-0">
            Frequently asked <br className=" hidden lg:block" /> questions
          </h1>

          <div className="lg:col-span-2">
            {questionAnswer?.map((qa, index) => (
              <div key={index} className="">
                <div className="grid grid-cols-12 items-center cursor-pointer" onClick={() => toggleAnswer(index)}>

                  <h1 className="text-[1rem] md:text-lg lg:text-xl xl:text-[22px] col-span-11 py-4">{qa.question}</h1>

                  <p className="flex justify-end col-span-1 cursor-pointer ">
                    <MdOutlineKeyboardArrowUp size={24}
                      className={`${expandedIndex === index ? 'rotate-120' : 'rotate-180 '} transition-all delay-100`}
                    />
                  </p>

                </div>

                {expandedIndex === index && (
                  <p className="text-xs sm:text-sm text-[#8E8E80] leading-7 pb-4">{qa.answer}</p>
                )}
                {index < questionAnswer.length - 1 && (
                  <div className="h-px bg-textDark opacity-20"></div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </Wrapper>
  );
};

export default QuestionAnswer;

const questionAnswer = [
  {
    question: "Is there parking available at your properties?",
    answer: `Certainly! We are delighted to provide complimentary on-site parking at all of our properties, ensuring that you enjoy a convenient and stress-free parking experience throughout your stay with us.`
  },
  {
    question: `Are pets allowed in the properties?`,
    answer: `We absolutely adhere to our pet policy. We are committed to providing excellent service and making your stay as comfortable and enjoyable as possible for your pets. Please contact our pet care team for more information about pet-friendly accommodations.`
  },
  {
    question: `Do you have a minimum stay requirement?`,
    answer: `Most properties are a minimum stay of 2 nights, but please reach out to our customer support phone number if you are in need of a reservation less than the listed minimum stay.`
  },
  {
    question: `What amenities are included in the vacation rentals?`,
    answer: `With Luxury Lodging, the essentials are covered at all properties, including linens, toiletries, free wifi, coffee, and more!`
  }
];
