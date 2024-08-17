import CustomImage from "../ui/CustomImage";


const Accommodations = () => {
  return (
    <div className="relative tracking-tight font-onest w-full h-full">

      <div className="flex flex-col gap-1 max-w-[1536px] mx-auto justify-center rounded-2xl">
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[550px]">
          <CustomImage
            src="images/accommodation-one.png"
            alt=""
            className="h-full w-full min-h-56 object-cover" />
          <div className="font-onest absolute flex flex-col bg-cardBackgroundDark bottom-4 sm:bottom-8 right-4 md:right-8 gap-y-2 md:gap-y-10 p-4  sm:p-5 rounded-2xl max-w-[280px] md:max-w-[338px] ">
            <h1 className="text-lg sm:text-2xl leading-6 md:leading-9 tracking-tight sm:max-w-[148px]">
              Best price guarantee
            </h1>
            <p className=" text-xs sm:text-sm leading-4 sm:leading-[22px]  max-w-[298px]">
              Our best price guarantee ensures you get the most competitive rates, without any extra booking fees or commissions, when you book directly with us.
            </p>
          </div>
        </div>

        <div className="relative grid lg:grid-cols-2 gap-1 w-full  lg:h-[550px]">
          <div className="relative  h-[300px] md:h-[400px] lg:h-[550px]">
            <CustomImage
              src="images/accommodation-two.png"
              alt=""
              className={`w-full h-full object-fill`}
            />

            <div className="font-onest absolute flex flex-col bg-cardBackgroundDark bottom-4 sm:bottom-8 max-w-[280px] right-6 sm:max-w-full sm:right-8 gap-y-2 sm:gap-y-4 lg:gap-y-10 p-4 sm:p-5 rounded-2xl">
              <h1 className="sm:text-lg lg:text-2xl lg:leading-9 tracking-tight max-w-[256px]">
                Exclusive deals and promotions
              </h1>
              <p className="text-xs sm:text-sm leading-4 sm:leading-[22px] max-w-[298px]">
                Unlock exclusive deals and promotions available only to our direct guests, offering extra value and special offers tailored for your stay.
              </p>
            </div>
          </div>

          <div className="relative h-[300px] md:h-[400px] lg:h-[550px]">
            <CustomImage
              src="images/accommodation-three.png"
              alt=""
              className={`w-full h-full object-fill`}
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