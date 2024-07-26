
// const RentalExperience = () => {
//   return (
//     <div className="flex justify-center relative tracking-tight">
//       <div className="bg-black bg-opacity-40 2xl:rounded-2xl">
//         <img src="/images/rental-experience.png" alt="" className="w-full max-w-[1536px] 2xl:rounded-2xl" />
//         <div className="absolute text-white text-[58px] top-10 max-w-[706px] left-[56px]">
//           Ready for the best home rental experience
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RentalExperience;


const RentalExperience = () => {
  return (
    <div className="flex justify-center relative tracking-tight">
      <div className="relative bg-black bg-opacity-40 2xl:rounded-2xl">
        <img
          src="/images/rental-experience.png"
          alt=""
          className="w-full max-w-[1536px] 2xl:rounded-2xl"
        />
        <div className="absolute font-medium text-white text-[32px] sm:text-[36px] md:text-[42px] lg:text-[58px] max-w-[370px] sm:max-w-[420px] md:max-w-[580px] lg:max-w-[706px] left-[5vw] top-[10vh] leading-none">
          Ready for the best home rental experience
        </div>
      </div>
    </div>
  );
};

export default RentalExperience;
