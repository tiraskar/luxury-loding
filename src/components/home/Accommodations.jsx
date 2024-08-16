import CustomImage from "../ui/CustomImage";


const Accommodations = () => {
  return (
    <div className="tracking-tight font-onest">

      <div className="flex flex-col gap-1 max-w-[1536px] mx-auto justify-center rounded-2xl">
        <div className="relative">
          <CustomImage
            src="images/accommodation-one.png"
            alt=""
            className="min-h-52" />
          <div className="font-onest absolute flex flex-col bg-cardBackgroundDark bottom-4 sm:bottom-8 right-4 md:right-8 gap-y-2 md:gap-y-10 p-4  sm:p-5 rounded-2xl max-w-[280px] md:max-w-[338px] ">
            <h1 className="text-lg sm:text-2xl leading-6 md:leading-9 tracking-tight sm:max-w-[148px]">
              Best price guarantee
            </h1>
            <p className=" text-xs sm:text-sm leading-4 sm:leading-[22px] max-w-[298px]">
              Our best price guarantee ensures you get the most competitive rates, without any extra booking fees or commissions, when you book directly with us.
            </p>
          </div>
        </div>

        <div className="relative grid md:grid-cols-2 gap-1">
          <div className="relative">
            <CustomImage
              src="images/accommodation-two.png"
              alt="" />

            <div className="font-onest absolute flex flex-col bg-cardBackgroundDark bottom-4 sm:bottom-8 max-w-[280px] right-6 sm:max-w-full sm:right-8 gap-y-2 sm:gap-y-4 lg:gap-y-10 p-4 sm:p-5 rounded-2xl">
              <h1 className="sm:text-lg lg:text-2xl lg:leading-9 tracking-tight max-w-[256px]">
                Exclusive deals and promotions
              </h1>
              <p className="text-xs sm:text-sm leading-4 sm:leading-[22px] max-w-[298px]">
                Unlock exclusive deals and promotions available only to our direct guests, offering extra value and special offers tailored for your stay.
              </p>
            </div>
          </div>

          <div className="relative">
            <CustomImage
              src="images/accommodation-three.png"
              alt=""
            />
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