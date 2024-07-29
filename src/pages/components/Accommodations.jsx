import { Link } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { MdArrowOutward } from "react-icons/md";

const Accommodations = () => {
  return (
    <div className="tracking-tight font-onest">
      <Wrapper>
        <div className="px-2 sm:px-3 md:px-4 xl:px-0">
          <h1 className="text-2xl sm:text-[26px]">Experience comfort and style at our Arizona accommodations</h1>
          <p className="text-2xl sm:text-[28px] text-[#999999]">Book direct for a memorable stay.</p>
          <div className="flex flex-row space-x-2 items-center text-[#333333] text-[1rem] py-3">
            <Link >Book your stay</Link>
            <MdArrowOutward />
          </div>
        </div>
      </Wrapper>
      <div className="flex flex-col gap-1 max-w-[1536px] mx-auto justify-center rounded-2xl py-[56px]">
        <div className="relative">
          <img src="/images/accommodation-one.png" alt="" className="min-h-52" />
          <div className="font-onest absolute flex flex-col bg-cardBackgroundDark bottom-4 sm:bottom-8 right-4 md:right-8 gap-y-2 sm:gap-y-10 p-4  sm:p-5 rounded-2xl">
            <h1 className="text-lg sm:text-2xl leading-6 md:leading-9 tracking-tight sm:max-w-[148px]">
              Best price guarentee
            </h1>
            <p className=" text-xs sm:text-sm leading-4 sm:leading-[22px] max-w-[298px]">
              Our best price guarantee ensures you get the most competitive rates, without any extra booking fees or commissions, when you book directly with us.
            </p>
          </div>
        </div>
        <div className="relative grid md:grid-cols-2 gap-1">
          <div className="relative">
            <img src="/images/accommodation-two.png" alt="" />

            <div className="font-onest absolute flex flex-col bg-cardBackgroundDark bottom-4 sm:bottom-8 max-w-[280px] right-6 sm:max-w-full sm:right-8 gap-y-2 sm:gap-y-4 lg:gap-y-10 p-4 sm:p-5 rounded-2xl">
              <h1 className="sm:text-lg lg:text-2xl lg:leading-9 tracking-tight max-w-[156px]">
                Exclusive deals and promotions
              </h1>
              <p className="text-xs sm:text-sm leading-4 sm:leading-[22px] max-w-[298px]">
                Unlock exclusive deals and promotions available only to our direct guests, offering extra value and special offers tailored for your stay.
              </p>
            </div>
          </div>
          <div className="relative">
            <img src="/images/accommodation-three.png" alt="" />
            <div className="font-onest absolute flex flex-col bg-cardBackgroundDark bottom-4 sm:bottom-8 max-w-[280px] right-6 sm:max-w-full sm:right-8 gap-y-2 sm:gap-y-4 lg:gap-y-10 p-4 sm:p-5 rounded-2xl">
              <h1 className="sm:text-lg lg:text-2xl lg:leading-9 tracking-tight max-w-[156px]">
                Personalized service
              </h1>
              <p className="text-xs sm:text-sm leading-4 sm:leading-[22px] max-w-[298px]">
                Experience personalized service when booking directly with us. Our dedicated team is committed to tailoring your stay to your unique preferences, ensuring exceptional hospitality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accommodations;