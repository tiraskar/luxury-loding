import Wrapper from "../../components/Wrapper";

const Banner = () => {
  return (
    <Wrapper>
      <div className="relative font-onest flex justify-center bg-black bg-opacity-40 rounded-xl">
        <div className="">
          <img src="/banner-background.png" alt="" />
        </div>
        <div className="absolute bottom-0 justify-center items-center text-center max-w-[425px] sm:max-w-[550px] md:max-w-[722px] lg:max-w-[822px]">
          <div className="text-white">
            <h1
              className="font-medium text-[1.25rem] xs:text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] ">
              Your Ideal Spot for Groups, Events, and Corporate Travel</h1>

            <p className="text-[1rem]">Top destinations for all groups with excellent amenities, corporate travel, and events</p>
          </div>

          {/* <div className="flex bg-white min-h-[73px] rounded-2xl -mb-[2rem] shadow-lg ">
            <SearchForm />
          </div> */}
        </div>
      </div>
    </Wrapper>
  );
};

export default Banner;

const SearchForm = () => {
  return (
    <form className="flex  justify-between items-center gap-3">
      <div className="flex flex-col max-w-[153px] text-sm">
        <label htmlFor="location">Where to go?</label>
        <input type="text" id="location" placeholder="Anywhere" />
      </div>
      <div className="flex flex-col max-w-[153px] text-sm">
        <label htmlFor="check-in">Check in</label>
        <input type="text" id="check-in" placeholder="MM.DD.YYYY" />
      </div>
      <div className="flex flex-col max-w-[153px] text-sm">
        <label htmlFor="check-out">Check out</label>
        <input type="text" id="check-out" placeholder="MM.DD.YYYY" />
      </div>
      <div className="flex flex-col max-w-[153px] text-sm">
        <label htmlFor="guest">Guest</label>
        <input type="text" id="guest" placeholder="Any" />
      </div>
      <button className="text-white bg-buttonPrimary rounded-xl px-8 py-4 h-fit">Search</button>
    </form>
  );
};