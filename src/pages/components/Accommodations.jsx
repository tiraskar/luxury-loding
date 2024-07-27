import { Link } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { MdArrowOutward } from "react-icons/md";

const Accommodations = () => {
  return (
    <div className="tracking-tight font-onest">
      <Wrapper>
        <h1 className="text-[26px]">Experience comfort and style at our Arizona accommodations</h1>
        <p className="text-[28px] text-[#999999]">Book direct for a memorable stay.</p>
        <div className="flex flex-row space-x-2 items-center text-[#333333] text-[1rem] py-3">
          <Link >Book your stay</Link>
          <MdArrowOutward />
        </div>
      </Wrapper>
      <div className="flex flex-col gap-1 max-w-[1536px] mx-auto justify-center rounded-2xl py-[56px]">
        <div className="relative">
          <img src="/images/accommodation-one.png" alt="" />
          <div className="font-onest absolute flex flex-col bg-cardBackgroundDark bottom-8 right-8 gap-y-10  p-5 rounded-2xl">
            <h1 className="text-2xl leading-9 tracking-tight max-w-[148px]">
              Best price guarentee
            </h1>
            <p className="text-sm leading-[22px] max-w-[298px]">
              Our best price guarantee ensures you get the most competitive rates, without any extra booking fees or commissions, when you book directly with us.
            </p>
          </div>
        </div>
        <div className="relative grid grid-cols-2 gap-1">
          <div className="relative">
            <img src="/images/accommodation-two.png" alt="" />

            <div className="font-onest absolute flex flex-col bg-cardBackgroundDark bottom-8 right-8 gap-y-10  p-5 rounded-2xl">
              <h1 className="text-2xl leading-9 tracking-tight max-w-[265px]">
                Exclusive deals and promotions
              </h1>
              <p className="text-sm leading-[22px] max-w-[298px]">
                Unlock exclusive deals and promotions available only to our direct guests, offering extra value and special offers tailored for your stay.
              </p>
            </div>
          </div>
          <div className="relative">
            <img src="/images/accommodation-three.png" alt="" />
            <div className="font-onest absolute flex flex-col bg-cardBackgroundDark bottom-8 right-8 gap-y-10  p-5 rounded-2xl">
              <h1 className="text-2xl leading-9 tracking-tight max-w-[156px]">
                Personalized service
              </h1>
              <p className="text-sm leading-[22px] max-w-[298px]">
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