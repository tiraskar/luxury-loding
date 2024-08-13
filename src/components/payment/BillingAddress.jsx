
import { useDispatch, useSelector } from "react-redux";
import { handlePaymentInput } from "../../redux/slices/paymentSlice.js";

const BillingAddress = () => {
  const { billingInfo } = useSelector(state => state.payment);
  const { countryList } = useSelector(state => state.listing);

  const dispatch = useDispatch()

  const handleChange = (name, value) => {
    const inputTitle = 'billingInfo';
    dispatch(handlePaymentInput({ inputTitle, name, value }))
  }

  return (

    <div className="font-inter text-[#333333] space-y-8">
      <h1 className="font-medium tracking-tight text-lg">Billing Address</h1>
      <div className="grid md:grid-cols-2 gap-4 text-black text-sm font-normal">
        <div className="flex flex-col gap-y-2 ">
          <label htmlFor="first-name" className="flex ">First name</label>
          <input
            name="firstName"
            value={billingInfo.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            type="text"
            placeholder="Enter first name"
            required
            className="default-input" />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="last-name" className="flex ">Last name</label>
          <input
            name="lastName"
            value={billingInfo.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            type="text"
            placeholder="Enter last name"
            className="default-input" />
        </div>
        <div className="relative flex flex-col gap-y-2">
          <label htmlFor="country" className="flex">Country or Region</label>
          <select
            name="country"
            value={billingInfo.country}
            onChange={(e) => handleChange("country", e.target.value)}
            id="country-region"
            className="block w-full default-input pr-10 appearance-none"
            required
          >
            {countryList?.map((data) => {
              return (
                <option key={data.code} value={data.code}>
                  {data.country}
                </option>
              );
            })}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-1 top-7 flex items-center pr-4">
            <svg className="w-5 h-5 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="city" className="flex">City</label>
          <input
            name="city"
            value={billingInfo.city}
            onChange={(e) => handleChange("city", e.target.value)}
            type="text"
            placeholder="Enter city"
            className="default-input"
            required
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="state" className="flex">State</label>
          <input
            name="state"
            value={billingInfo.state}
            onChange={(e) => handleChange("state", e.target.value)}
            type="text"
            placeholder="Enter state"
            className="default-input"
            required
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="line1" className="flex">Line1</label>
          <input
            name="line1"
            value={billingInfo.line1}
            onChange={(e) => handleChange("line1", e.target.value)}
            type="text"
            placeholder="Enter primary address line"
            className="default-input"
            required
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="line2" className="flex">Line2</label>
          <input
            name="line2"
            value={billingInfo.line2}
            onChange={(e) => handleChange("line2", e.target.value)}
            type="text"
            placeholder="Enter secondary address line (optional)"
            className="default-input" />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="postalCode" className="flex">Postal code</label>
          <input
            name="postalCode"
            value={billingInfo.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            type="number"
            placeholder="Enter postal code"
            className="default-input"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default BillingAddress;