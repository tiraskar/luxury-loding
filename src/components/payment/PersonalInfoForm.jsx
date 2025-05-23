import { useDispatch, useSelector } from "react-redux";
import { handlePaymentInput } from "../../redux/slices/paymentSlice.js";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import { useEffect } from "react";
import PropTypes from "prop-types";
import PaymentInputLabel from "../ui/PaymentInputLabel.jsx";

const PersonalInfoForm = ({ register, setValue, errors }) => {
  const dispatch = useDispatch();

  const { personalInfo } = useSelector(state => state.payment);

  const inputTitle = 'personalInfo';
  const handleChange = (name, value) => {
    dispatch(handlePaymentInput({ inputTitle, name, value }))
  }

  const countries = getCountries();
  const options = countries.map((country) => ({
    code: country,
    dialCode: `+${getCountryCallingCode(country)}`,
    name: country,
  }));

  const handleCountryChange = (e) => {
    const selectedCountryCode = e.target.value;
    const selectedDialCode =
      options.find((option) => option.code === selectedCountryCode)?.dialCode ||
      "";

    setValue("countryCode", selectedCountryCode);
    setValue("countryDialCode", selectedDialCode);
    dispatch(handlePaymentInput({ inputTitle, name: 'countryCode', value: selectedCountryCode }));
    dispatch(handlePaymentInput({ inputTitle, name: 'countryDialCode', value: selectedDialCode }));
  };

  useEffect(() => {
    setValue("countryCode", "US");
  }, []);

  return (
    <div className="font-inter text-[#333333] space-y-9">
      <h1 className="font-medium tracking-tight text-lg h-[13px]">Personal info</h1>
      <div className="grid md:grid-cols-2 gap-4 text-black text-sm font-normal">
        <div className="flex flex-col gap-y-2">
          <PaymentInputLabel
            label="First name"
            htmlFor="firstName"
          />
          <input
            name="firstName"
            {...register("personalInfo.firstName")}
            value={personalInfo.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            type="text"
            placeholder="Enter first name"
            // required
            className={`default-input 
              ${errors.personalInfo && errors?.personalInfo.firstName
                ? "border-[#FF0000]"
                : ""
              }
              `}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <PaymentInputLabel
            label="Last name"
            htmlFor="lastName"
          />
          <input
            name="lastName"
            {...register("personalInfo.lastName")}
            value={personalInfo.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            type="text"
            placeholder="Enter last name"
            // required
            className={`default-input 
              ${errors.personalInfo && errors?.personalInfo.lastName
                ? "border-[#FF0000]"
                : ""
              }
              `}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <PaymentInputLabel
            label="Email"
            htmlFor="email"
          />
          <input
            name="email"
            {...register("personalInfo.email")}
            value={personalInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
            type="email"
            placeholder="Enter email"
            // required
            className={`default-input 
              ${errors.personalInfo && errors?.personalInfo.email
                ? "border-[#FF0000]"
                : ""
              }
              `}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <PaymentInputLabel
            label="Phone number"
            htmlFor="phoneNumber"
          />
          <div
            className={`flex flex-row w-full border-[1px]  border-[#F5F5F5] rounded-xl bg-white focus-within:border-[#7B6944] focus-within:border-[1px] h-[42px]
            ${errors.personalInfo && errors?.personalInfo.phone
                ? "border-[#FF0000]"
                : ""
              }
            `}
          >
            <select
              {...register("personalInfo.countryCode")}
              onChange={(e) => handleCountryChange(e)}
              className="bg-white outline-none pl-5 pr-2 appearance-none border-r-0 border-[#F5F5F5] rounded-l-xl"
            >
              {options.map(({ code, dialCode }) => (
                <option key={code} value={code}>
                  {dialCode}
                </option>
              ))}
            </select>
            <input
              {...register("personalInfo.phone")}
              type="number"
              value={personalInfo.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "e") {
                  e.preventDefault();
                }
              }}
              min={0}
              inputMode="numeric"
              pattern="\d*"
              placeholder="Enter phone number"
              className={`pl-2 pr-5 py-[13px] w-full outline-none rounded-xl `}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;

PersonalInfoForm.propTypes = {
  register: PropTypes.func,
  setValue: PropTypes.func,
  errors: PropTypes.object,
};
