
const BillingAddress = ({ billingAddress, setBillingsAddress }) => {

  const handleChange = (name, value) => {
    setBillingsAddress((prev) => ({ ...prev, [name]: value }));
  }

  return (

    <div className="font-inter text-[#333333] space-y-8">
      <h1 className="font-medium tracking-tight text-lg">Billing Address</h1>
      <div className="grid md:grid-cols-2 gap-4 text-black text-sm font-normal">
        <div className="flex flex-col gap-y-2 ">
          <label htmlFor="first-name" className="flex ">First Name</label>
          <input
            name="firstName"
            value={billingAddress.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            type="text"
            placeholder="Enter first name"
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="last-name" className="flex ">Last Name</label>
          <input
            name="lastName"
            value={billingAddress.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            type="text"
            placeholder="Enter last name"
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="line1" className="flex">Line1</label>
          <input
            name="line1"
            value={billingAddress.line1}
            onChange={(e) => handleChange("line1", e.target.value)}
            type="text"
            placeholder="Enter primary address line"
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="line2" className="flex">Line2</label>
          <input
            name="line2"
            value={billingAddress.line2}
            onChange={(e) => handleChange("line2", e.target.value)}
            type="text"
            placeholder="Enter secondary address line (optional)"
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="city" className="flex">City</label>
          <input
            name="city"
            value={billingAddress.city}
            onChange={(e) => handleChange("city", e.target.value)}
            type="text"
            placeholder="Enter city"
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="state" className="flex">State</label>
          <input
            name="state"
            value={billingAddress.state}
            onChange={(e) => handleChange("state", e.target.value)}
            type="text"
            placeholder="Enter state"
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="postalCode" className="flex">Postal Code</label>
          <input
            name="postalCode"
            value={billingAddress.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            type="text"
            placeholder="Enter postal code"
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
        </div>
      </div>
      <div className="relative flex flex-col gap-y-2">
        <label htmlFor="country" className="flex">Country or Region</label>
        <select
          name="country"
          value={billingAddress.country}
          onChange={(e) => handleChange("country", e.target.value)}
          id="country-region"
          className="block w-full border-2 border-gray-200 px-5 py-4 pr-10 rounded-xl bg-white appearance-none"
        >
          <option value="us">USA</option>
          <option value="canada">Canada</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-1 top-7 flex items-center pr-4">
          <svg className="w-5 h-5 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BillingAddress;