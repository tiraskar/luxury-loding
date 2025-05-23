import Wrapper from "../common/Wrapper";
import PropTypes from "prop-types";
import CustomImage from "../ui/CustomImage";

const SingleOffer = ({ offer, index }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-row  items-center">
        <span className="bg-black font-onest text-white flex items-center px-[10px] py-[10px] justify-center rounded-xl text-lg sm:text-[22px] sm:w-[46px] md:h-[46px] tracking-[-0.44px]">
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </span>
        <div className="w-full h-px bg-[#E0E0E0]"></div>
      </div>
      <div className="space-y-3">
        <h1 className="text-[26px] h-[33px]">{offer.title}</h1>
        <p className="text-[1rem] leading-6 text-[#868686]  lg:pr-4 2xl:pr-0 lg:max-h-[72px]">{offer.description}</p>
      </div>
      <div className="flex justify-center sm:justify-start ">
        <CustomImage src={offer.image} alt={offer.title} className="w-full max-h-[350px] xs:max-h-[400px] sm:max-h-[450px] max-w-[429px] 2xl:max-w-full rounded-[1rem]" />
      </div>
    </div>
  );
};



const Offer = () => {

  return (
    <Wrapper>
      <div className="tracking-tight space-y-6 sm:space-y-8 md:space-y-9 lg:space-y-[56px] px-2 sm:px-3 md:px-4 xl:px-0">

        <div className="font-semibold text-[1.5rem] xs:text-[1.75rem] sm:text-[1.9rem] md:text-[2rem] space-y-[2px]">
          <h1 >What we offer</h1>
          <h2 className="text-textLight">The perfect place to stay</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {offerData?.map((offer, index) =>
            <SingleOffer key={index} offer={offer} index={index} />
          )}
        </div>

      </div>
    </Wrapper>
  );
};

export default Offer;


SingleOffer.propTypes = {
  offer: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const offerData = [
  {
    image: 'images/local-offer.png',
    title: 'Local',
    description: `We love connecting guests with our local community. Enjoy local artwork, coffee, and a thoughtfully curated guidebook`,
  },
  {
    image: 'images/offer-inclusive.png',
    title: 'All inclusive',
    description: `Every property is furnished with all the comforts of home. You’ll find a fully equipped kitchen, towels, streaming services, free wifi, bathroom accessories, and more!`,
  },
  {
    image: 'images/private-offer.png',
    title: 'Private',
    description: `The best thing about booking a holiday home is the space and flexibility. Enjoy our entire home with family and friends`,
  },
];