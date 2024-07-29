
const BillingAddress = () => {
  return (

    <div className="font-inter text-[#333333]">
      <h1 className="font-medium tracking-tight text-lg">Billing Address</h1>
      <div className="grid grid-cols-2 gap-4 text-black text-sm font-normal">
        <div className="flex flex-col gap-y-2 ">
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

        <div className="relative flex flex-col gap-y-2">
          <label htmlFor="email" className="flex">Country or Region</label>
          <select
            name="country-region"
            id="country-region"
            className="block w-full border-2 border-gray-200 px-5 py-4 pr-10 rounded-xl bg-white appearance-none"
          >
            <option value="usa">USA</option>
            <option value="canada">Canada</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-1 top-7 flex items-center pr-4">
            <svg className="w-5 h-5 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="address" className="flex">Address</label>
          <input
            name="address"
            type="text"
            placeholder="Enter address"
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
        </div>
      </div>

    </div>
  );
};

export default BillingAddress;