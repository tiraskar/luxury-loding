import { useState } from "react";
import { FaAsterisk } from "react-icons/fa";
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';
import { baseUrl } from "../../config/baseurl";
import axios from "axios";
import toast from "react-hot-toast";
import { notifyToastMessage } from "../ui/CustomToast";

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    description: '',
    countryCode: "US",
    countryDialCode: `+${getCountryCallingCode("US")}`
  });

  const countries = getCountries();
  const options = countries.map(country => ({
    code: country,
    dialCode: `+${getCountryCallingCode(country)}`,
    name: country
  }));

  const handleInputChange = (name, value) => {
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountryChange = (e) => {
    const selectedCountryCode = e.target.value;
    const selectedDialCode = options.find(option => option.code === selectedCountryCode)?.dialCode || '';

    setFormValues(prev => ({
      ...prev,
      countryCode: selectedCountryCode,
      countryDialCode: selectedDialCode,
      phoneNumber: prev.phoneNumber.startsWith(prev.countryDialCode)
        ? prev.phoneNumber.replace(prev.countryDialCode, selectedDialCode)
        : prev.phoneNumber
    }));
  };

  const handleFormSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true);
    const fullPhoneNumber = `${formValues.countryDialCode} ${formValues.phoneNumber}`;
    try {
      const response = await axios.post(`${baseUrl}/contact`, {
        fullname: formValues.fullname,
        email: formValues.email,
        description: formValues.description,
        phoneNumber: fullPhoneNumber
      });

      if (response.status === 200) {
        setFormValues({
          fullname: '',
          email: '',
          phoneNumber: '',
          description: '',
          countryCode: "US",
          countryDialCode: `+${getCountryCallingCode("US")}`
        });
        return notifyToastMessage("Message sent successfully!");
      }

    } catch (error) {
      toast.error("Something went wrong!!!", { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center lg:justify-end">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white flex-col px-3 py-6 sm:py-8 sm:px-8 font-inter text-sm text-black space-y-2 rounded-2xl sm:rounded-3xl tracking-normal min-w-full lg:min-w-[450px] xl:min-w-[495px] ">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="full-name" className="flex">Full Name
            <FaAsterisk color="#DE2424" size={8} className="mt-1" /></label>
          <input
            name="fullname"
            type="text"
            placeholder="Enter full name"
            value={formValues.fullname}
            onChange={(e) => handleInputChange('fullname', e.target.value)}
            required
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email" className="flex">Your email<FaAsterisk color="#DE2424" size={8} className="mt-1" /></label>
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            value={formValues.email}
            required
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="phone-number" className="flex">Phone number<FaAsterisk color="#DE2424" size={8} className="mt-1" /></label>
          <div className="flex flex-row w-full border-2 border-[#F5F5F5] rounded-xl bg-white focus-within:outline">
            <select
              name="phone-code"
              id="phone-code"
              value={formValues.countryCode}
              onChange={handleCountryChange}
              className="bg-white outline-none pl-5 pr-2 appearance-none border-r-2 border-[#F5F5F5] rounded-l-xl"
            >
              {options.map(({ code, dialCode }) => (
                <option key={code} value={code}>
                  {dialCode}
                </option>
              ))}
            </select>
            <input
              name="phone-number"
              type="text"
              inputMode="numeric"
              pattern="\d*"
              placeholder="Enter phone number"
              value={formValues.phoneNumber}
              required
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="pl-2 pr-5 py-4 w-full outline-none rounded-xl"
            />
          </div>
        </div>
        <div className="py-1">
          <textarea
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl w-full"
            name="description"
            rows={6}
            placeholder="How can we help you?"
            value={formValues.description}
            required
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="flex justify-center items-center text-white bg-black w-full text-center py-5 font-inter font-semibold text-[1rem] rounded-[1rem]"
        >
          {isLoading ? `Submitting` : "Submit"} {isLoading && <p className="animate-bounce">...</p>}
        </button>
        <div className="flex justify-center">
          <p className="text-xs text-[#A1A196] mt-4 text-center leading-6 max-w-[335px]">
            By contacting us, you agree to our Terms of services and Privacy Policy.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
