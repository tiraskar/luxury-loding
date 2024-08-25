import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handlePaymentInput } from "../../redux/slices/paymentSlice.js";
import PropTypes from "prop-types";
import PaymentInputLabel from "../ui/PaymentInputLabel.jsx";

const BillingAddress = ({ register, errors }) => {
  const { billingInfo, paymentType } = useSelector(state => state.payment);
  const { countryList } = useSelector(state => state.listing);

  const dispatch = useDispatch()

  const handleChange = (name, value) => {
    const inputTitle = 'billingInfo';
    dispatch(handlePaymentInput({ inputTitle, name, value }))
  }

  useEffect(() => {
    handleChange('country', 'US');
  }, [paymentType])

  return (

    <div className="font-inter text-[#333333] space-y-8">
      <h1 className="font-medium tracking-tight text-lg">Billing Address</h1>
      <div className="grid md:grid-cols-2 gap-4 text-black text-sm font-normal">
        <div className="flex flex-col gap-y-2 ">
          <PaymentInputLabel
            label="First name"
            htmlFor="billing-first-name"
          />
          <input
            name="firstName"
            {...register("billingInfo.firstName")}
            value={billingInfo.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            type="text"
            placeholder="Enter first name"
            className={`default-input ${errors.billingInfo && errors?.billingInfo.firstName ? 'border-[#FF0000]' : ''}`}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <PaymentInputLabel
            label="Last name"
            htmlFor="billing-last-name"
          />
          <input
            name="lastName"
            {...register("billingInfo.lastName")}
            value={billingInfo.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            type="text"
            placeholder="Enter last name"
            className={`default-input ${errors.billingInfo && errors?.billingInfo.lastName ? 'border-[#FF0000]' : ''}`} />
        </div>
        <div className="relative flex flex-col gap-y-2">
          <PaymentInputLabel
            label="Country or Region"
            htmlFor="country"
          />
          <select
            name="country"
            {...register("billingInfo.country")}
            value={billingInfo.country}
            onChange={(e) => handleChange("country", e.target.value)}
            id="country-region"
            disabled={paymentType == 'affirm'}
            className="block w-full py-px default-input pr-10 appearance-none"
            autoComplete="off"
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
          <PaymentInputLabel
            label="State"
            htmlFor="state"
          />
          <input
            name="state"
            {...register("billingInfo.state")}
            value={billingInfo.state}
            onChange={(e) => handleChange("state", e.target.value)}
            type="text"
            placeholder="Enter state"
            className={`default-input ${errors.billingInfo && errors?.billingInfo.state ? 'border-[#FF0000]' : ''}`}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <PaymentInputLabel
            label="City"
            htmlFor="city"
          />
          <input
            name="city"
            {...register("billingInfo.city")}
            value={billingInfo.city}
            onChange={(e) => handleChange("city", e.target.value)}
            type="text"
            placeholder="Enter city"
            className={`default-input ${errors.billingInfo && errors?.billingInfo.city ? 'border-[#FF0000]' : ''}`}
            autoComplete="off"
          />
        </div>


        <div className="flex flex-col gap-y-2">
          <PaymentInputLabel
            label="Line1"
            htmlFor="line1"
          />
          <input
            name="line1"
            {...register("billingInfo.line1")}
            value={billingInfo.line1}
            onChange={(e) => handleChange("line1", e.target.value)}
            type="text"
            placeholder="Enter primary address line"
            className={`default-input ${errors.billingInfo && errors?.billingInfo.line1 ? 'border-[#FF0000]' : ''}`}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <PaymentInputLabel
            label="Line2"
            htmlFor="line2"
          />
          <input
            name="line2"
            {...register("billingInfo.line2")}
            value={billingInfo.line2}
            onChange={(e) => handleChange("line2", e.target.value)}
            type="text"
            placeholder="Enter secondary address line (optional)"
            className="default-input"
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <PaymentInputLabel
            label="Postal code"
            htmlFor="postal-code"
          />
          <input
            name="postalCode"
            {...register("billingInfo.postalCode")}
            value={billingInfo.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            type="number"
            placeholder="Enter postal code"
            className={`default-input ${errors.billingInfo && errors?.billingInfo.postalCode ? 'border-[#FF0000]' : ''}`}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default BillingAddress;

BillingAddress.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
};