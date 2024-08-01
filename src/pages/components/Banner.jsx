import Wrapper from "../../components/Wrapper";

const Banner = () => {
  return (
    <Wrapper>
      <div className="relative font-onest flex justify-center bg-black bg-opacity-40 rounded-xl ">
        <div className="relative h-[320px] sm:min-h-[400px] md:min-h-[450px] lg:h-full w-full overflow-hidden">
          <img
            src="/banner-background.png"
            alt="Banner Background"
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div className="absolute bottom-0 justify-center items-center text-center max-w-[425px] sm:max-w-[550px] md:max-w-[722px] lg:max-w-[822px]">
          <div className="text-white mb-4 sm:mb-[76px]">
            <h1 className="font-medium text-[1.125rem] xxs:text-[1.5rem] xs:text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] ">
              Your Ideal Spot for Groups, Events, and Corporate Travel
            </h1>

            <p className="text-[8px] sm:text-xs md:text-sm lg:text-[1rem]">
              Top destinations for all groups with excellent amenities,
              corporate travel, and events
            </p>
          </div>

          <div className="flex flex-col font-onest lg:flex-row lg:justify-between items-center bg-white min-h-[73px] rounded-2xl -mb-[20%] sm:-mb-[5rem] md:-mb-[3rem] lg:-mb-[2rem] shadow-lg max-w-[832px] mx-auto px-4 py-2 md:py-3">
            <form className="flex flex-col md:flex-row lg:items-center lg:gap-4 w-full">
              <div className="flex">
                <div className="flex flex-col mb-4 lg:mb-0 lg:max-w-[153px] text-sm text-start pl-7">
                  <label htmlFor="location" className="font-semibold">
                    Where to go?
                  </label>
                  <input
                    type="text"
                    id="location"
                    placeholder="Anywhere"
                    className="outline-none rounded-md py-1 w-full"
                  />
                </div>
                <div className="h-10 w-px bg-textDark bg-opacity-10 hidden lg:block my-4"></div>
                <div className="flex flex-col mb-4 lg:mb-0 lg:max-w-[153px] text-sm text-start pl-7">
                  <label htmlFor="check-in" className="font-semibold">
                    Check in
                  </label>
                  <input
                    type="text"
                    id="check-in"
                    placeholder="MM.DD.YYYY"
                    className="outline-none rounded-md py-1 w-full"
                  />
                </div>
              </div>

              <div className="h-10 w-px bg-textDark bg-opacity-10 hidden lg:block  my-4"></div>
              <div className="grid grid-cols-2 sm:flex sm:flex-row">
                <div className="flex flex-col mb-4 lg:mb-0 lg:max-w-[153px] text-sm text-start pl-7">
                  <label htmlFor="check-out" className="font-semibold">
                    Check Out
                  </label>
                  <input
                    type="text"
                    id="check-out"
                    placeholder="MM.DD.YYYY"
                    className="outline-none rounded-md py-1 w-full"
                  />
                </div>
                <div className="flex flex-col mb-4 lg:mb-0 lg:max-w-[153px] text-sm text-start pl-7">
                  <label htmlFor="guest" className="block mb-1 font-semibold">
                    Guest
                  </label>
                  <input
                    id="guest"
                    type="number"
                    inputMode="numeric"
                    pattern="\d*"
                    max={50}
                    min={0}
                    placeholder="Any"
                    className="outline-none rounded-md py-1 w-full box-border overflow-hidden"
                  />
                </div>
              </div>
              <button className="block md:hidden text-white bg-buttonPrimary rounded-xl px-8 py-2 h-fit lg:mt-0 lg:w-auto w-full">
                Search
              </button>
            </form>

            <button className=" hidden md:block text-white bg-buttonPrimary rounded-xl px-8 py-2 lg:py-4 h-fit  lg:mt-0 lg:w-auto w-full">
              Search
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Banner;
