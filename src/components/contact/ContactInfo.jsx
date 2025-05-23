const ContactInfo = () => {
  return (
    <div className="flex flex-col space-y-8 justify-between max-h-[617px]">
      <div className="flex flex-col gap-y-8 mt-8 sm:mt-12 lg:mt-12">
        <div className="flex flex-col gap-y-3 max-w-[389px]">
          <h1 className=" text-2xl xxs:text-[26px] sm:text-[text-32px] md:text-[38px]">Say Hello!</h1>
          <p className="text-xs leading-[22px] text-[#8E8E80]">Whether you have questions about our services or need assistance with your property, we’re here to help. Fill out the contact form below, and a member of our team will get back to you.</p>
        </div>
        <div className="flex flex-col gap-y-8 text-lg sm:text-xl md:text-2xl font-inter">
          <a href="mailto:support@luxurylodgingpm.com">support@luxurylodgingpm.com</a>
          <a href="tel:+1813531-8988">(813) 531-8988</a>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 xs:gap-y-4 md:gap-y-6 max-w-[501px]">
        <h1 className="font-medium font-inter tracking-[-1%] text-lg xxs:text-xl xs:text-2xl md:text-[28px]">
          Co-hosting services</h1>
        <p className=" text-xs sm:text-[13px] leading-5 sm:leading-[22px] text-[#8E8E80]">
          Looking for a trustworthy co-host to elevate your
          vacation rental? We specialize in bespoke,
          full-service co-hosting, managing everything
          from marketing and pricing optimization to guest
          interactions and property maintenance.
          Trust us to be stewards of your property,
          ensuring your investment is well cared for
          and consistently profitable. Enjoy the benefits
          of vacation rental ownership without the hassle,
          knowing your property is in expert hands.
        </p>
      </div>
    </div>
  );
};


export default ContactInfo;