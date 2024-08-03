const PersonalInfoForm = ({ personalInfo, setPersonalInfo }) => {

  const handleChange = (name, value) => {
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="font-inter text-[#333333] space-y-8">
      <h1 className="font-medium tracking-tight text-lg">Personal Info</h1>
      <div className="grid md:grid-cols-2 gap-4 text-black text-sm font-normal">

        <div className="flex flex-col gap-y-2">
          <label htmlFor="first-name" className="flex ">First Name</label>
          <input
            name="firstName"
            value={personalInfo.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            type="text"
            placeholder="Enter first name"
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="last-name" className="flex ">Last Name</label>
          <input
            name="lastName"
            value={personalInfo.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            type="text"
            placeholder="Enter last name"
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="email" className="flex">Your email</label>
          <input
            name="email"
            value={personalInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
            type="email"
            placeholder="Enter email"
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="phone-number" className="flex">Phone number</label>
          <input
            name="phone"
            value={personalInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            type="number"
            placeholder="Enter phone number"
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
        </div>

      </div>

    </div>
  );
};


export default PersonalInfoForm;