import Wrapper from "../../components/Wrapper";

const ActivitiesAndServices = () => {
  return (
    <Wrapper>
      <div className="flex flex-col space-y-[56px]">
        <h1 className="text-3xl sm:text-[35px] font-semibold">Activities & Services</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activitesData?.map(({ icon, title, description }) => {
            return (
              <div key={title} className="flex flex-col bg-cardBackgroundLight rounded-2xl p-5 space-y-6 sm:space-y-8">
                <div className="w-[50px] h-[50px] bg-[#E5E5CC] flex justify-center items-center rounded-full">
                  <img src={icon} />
                </div>
                <div>
                  <h1 className="text-xl sm:text-[22px]">
                    {title}
                  </h1>
                  <p className="text-sm text-[#8E8E80]">
                    {description}
                  </p>
                </div>
              </div>);
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default ActivitiesAndServices;

const activitesData = [
  {
    icon: '/svg/group.svg',
    title: 'Responsive and helpful team',
    description: 'Our team is readily available to provide clear and prompt instructions, ensuring a smooth and enjoyable stay',
  },
  {
    icon: '/svg/interior.svg',
    title: `Stylish interiors`,
    description: `Enjoy stylish, hygienic accommodations with meticulous cleaning, curated decor, and contemporary furnishings`,
  },
  {
    icon: '/svg/parking.svg',
    title: 'Parking spaces',
    description: `Enjoy secure, easily accessible parking with ample space, ensuring a hassle-free stay.`,
  },
  {
    icon: '/svg/location.svg',
    title: 'Prime location',
    description: `Our accommodations are in a prime location, steps from the city's attractions, dining spots, and activities, offering unmatched convenience and access to the best experiences`,
  },
  {
    icon: '/svg/smarthome.svg',
    title: `Self check-in with smart lock`,
    description: `Enjoy seamless self check-in with our smart lock system, allowing convenient access at your designated time for a hassle-free start to your stay`,
  },
  {
    icon: '/svg/amenties.svg',
    title: `Well stocked with amenities`,
    description: `We offer a wide range of amenities, including fully equipped kitchens, luxurious linens, toiletries, and entertainment options, ensuring a comfortable and enjoyable stay`,
  },
  {
    icon: '/svg/wifi.svg',
    title: `High speed WI-FI`,
    description: `We offer a wide range of amenities, including fully equipped kitchens, luxurious linens, toiletries, and entertainment options, ensuring a comfortable and enjoyable stay`,
  },
  {
    icon: '/svg/pet.svg',
    title: `Pet friendly`,
    description: `We warmly welcome your pets with special amenities and designated areas for their comfort. Enjoy a stress-free stay knowing your pets are as valued as you are.`,
  },
  {
    icon: '/svg/event.svg',
    title: `Event friendly`,
    description: `We warmly welcome events at our hotels, providing versatile spaces and dedicated staff to ensure your event is a success with seamless planning and exceptional service.`,
  },
];