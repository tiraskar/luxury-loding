const PersonalInfoForm = () => {
  return (
    <div className="font-inter text-[#333333]">
      <h1 className="font-medium tracking-tight text-lg">Personal Info</h1>
      <div className="grid grid-cols-2 gap-4 text-black text-sm font-normal">

        <div className="flex flex-col gap-y-2">
          <label htmlFor="first-name" className="flex ">First Name</label>
          <input
            name="first-name"
            type="text"
            placeholder="Enter first name"
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="last-name" className="flex ">Last Name</label>
          <input
            name="last-name"
            type="text"
            placeholder="Enter last name"
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="email" className="flex">Your email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="phone-number" className="flex">Phone number</label>
          <input
            name="phone-number"
            type="number"
            placeholder="Enter phone number"
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
        </div>

      </div>

    </div>
  );
};


export default PersonalInfoForm;