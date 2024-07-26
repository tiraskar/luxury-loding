// import { Wrapper } from "../../components";

// const Offer = () => {
//   return (
//     <Wrapper>
//       <div className="tracking-tight space-y-[56px]">
//         <div className="font-semibold text-[2rem]">
//           <h1>What we offer</h1>
//           <h2 className="text-textLight">The perfect place to stay</h2>
//         </div>

//         <div className="grid grid-cols-3">
//           <div className="space-y-6">
//             <div className="flex flex-row gap-1 items-center">
//               <span className="bg-black text-white px-3 py-2 rounded-xl text-[22px]">01</span>
//               <div className="min-w-full h-px bg-[#E0E0E0]"></div>
//             </div>
//             <div>
//               <h1 className="text-[26px]">Local</h1>
//               <p className="text-[1rem] leading-6 text-[#868686]">We love connecting guests with our local community. Enjoy local artwork, coffee, and a thoughtfully curated guidebook</p>
//             </div>
//             <div>
//               <img src="/images/local-offer.png" alt="" className="w-full max-w-[429px]" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default Offer;

// const offerData = [
//   {
//     image: '/images/local-offer.png',
//     title: 'Local',
//     description: `We love connecting guests with our local community. Enjoy local artwork, coffee, and a thoughtfully curated guidebook`,
//   },
//   {
//     image: '/images/offer-inclusive.png',
//     title: 'All inclusive',
//     description: `Our homes are furnished with all the comforts of home. You’ll find a fully equipped kitchen, bed linens, towels, TV, free wifi and more!`,
//   },
//   {
//     image: '/images/private-offer.png',
//     title: 'Private',
//     description: `The best thing about booking a holiday home is the space and flexibility. Enjoy our entire home with family and friends`,
//   },
// ];

import { Wrapper } from "../../components";

const Offer = () => {
  const offerData = [
    {
      image: '/images/local-offer.png',
      title: 'Local',
      description: `We love connecting guests with our local community. Enjoy local artwork, coffee, and a thoughtfully curated guidebook`,
    },
    {
      image: '/images/offer-inclusive.png',
      title: 'All inclusive',
      description: `Our homes are furnished with all the comforts of home. You’ll find a fully equipped kitchen, bed linens, towels, TV, free wifi and more!`,
    },
    {
      image: '/images/private-offer.png',
      title: 'Private',
      description: `The best thing about booking a holiday home is the space and flexibility. Enjoy our entire home with family and friends`,
    },
  ];

  return (
    <Wrapper>
      <div className="tracking-tight space-y-[56px] px-2 sm:px-3 md:px-4 xl:px-0">
        <div className="font-semibold text-[1.75rem] sm:text-[2rem]">
          <h1 >What we offer</h1>
          <h2 className="text-textLight">The perfect place to stay</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {offerData.map((offer, index) => (
            <div key={index} className="space-y-6">
              <div className="flex flex-row gap-1 items-center">
                <span className="bg-black text-white px-3 py-2 rounded-xl text-[22px]">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
                <div className="w-full h-px bg-[#E0E0E0]"></div>
              </div>
              <div>
                <h1 className="text-[26px]">{offer.title}</h1>
                <p className="text-[1rem] leading-6 text-[#868686] pr-4">{offer.description}</p>
              </div>
              <div className="flex justify-center md:justify-start">
                <img src={offer.image} alt={offer.title} className="w-full max-w-[429px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Offer;
