import { useState } from "react";
import { FaAsterisk } from "react-icons/fa";

const ContactForm = () => {
  const [formValues, setFormValues] = useState({
    fullname: '',
    email: '',
    phone: '',
    message: '',
    countryCode: ''
  });

  const handleInputChange = (name, value) => {

    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // const response = axios.post('http://localhost:5000/contact', formValues);
    // console.log(response);

  };
  return (
    <div className="flex justify-center lg:justify-end">
      <form className="bg-white flex-col px-3 py-6 sm:py-8 sm:px-8 font-inter text-sm text-black space-y-2 rounded-2xl sm:rounded-3xl tracking-normal min-w-full lg:min-w-[450px] xl:min-w-[495px] ">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="full-name" className="flex">Full Name
            <FaAsterisk color="#DE2424" size={8} className="mt-1" /></label>
          <input
            name="full-name"
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
          <input
            name="phone-number"
            type="text"
            inputMode="numeric"
            pattern="\d*"
            placeholder="Enter phone number"
            value={formValues.phone}
            required
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl" />
        </div>
        <div className="py-1">
          <textarea
            className="border-[2px] border-[#F5F5F5] px-5 py-4 rounded-xl w-full"
            name="message"
            rows={6}
            placeholder="How can we help you?"
            value={formValues.message}
            required
            onChange={(e) => handleInputChange('message', e.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={(e) => handleFormSubmit(e)}
          className="text-white bg-black w-full text-center py-5 font-inter font-semibold text-[1rem] rounded-[1rem] ">Submit</button>
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