import { useEffect, useState } from "react";
import { FaAsterisk } from "react-icons/fa";
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';
import { baseUrl } from "../../config/baseurl";
import axios from "axios";
import { toast } from "react-toastify";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import AlertDialog from "../ui/AlertDialog";

const schema = yup.object({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.number().required(),
  description: yup.string().min(10, 'Description must be at least 10 characters').required(''),
  countryCode: yup.string().required().default('us'),
  countryDialCode: yup.string().required()
}).required();


const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const countries = getCountries();
  const options = countries.map(country => ({
    code: country,
    dialCode: `+${getCountryCallingCode(country)}`,
    name: country
  }));

  const handleCountryChange = (e) => {
    const selectedCountryCode = e.target.value;
    const selectedDialCode = options.find(option => option.code === selectedCountryCode)?.dialCode || '';

    setValue('countryCode', selectedCountryCode);
    setValue('countryDialCode', selectedDialCode);
  };

  const onSubmit = async (data) => {

    setIsLoading(true);
    const fullPhoneNumber = `${data.countryDialCode} ${data.phoneNumber}`;
    try {
      const response = await axios.post(`${baseUrl}/contact`, {
        fullname: data.fullName,
        email: data.email,
        description: data.description,
        phoneNumber: fullPhoneNumber
      });

      if (response.status === 200) {

        setValue('fullName', '');
        setValue('email', '');
        setValue('phoneNumber', '');
        setValue('description', '');
        setValue('countryCode', 'US');
        setValue('countryDialCode', `+${getCountryCallingCode("US")}`);

        setSuccessMessage(true)
      }

    } catch (error) {
      toast.error("Something went wrong!!!", { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setValue('countryCode', 'US');
    setValue('countryDialCode', `+${getCountryCallingCode("US")}`);
  }, []);

  const handleCloseAlert = () => {
    setSuccessMessage(false);
  }

  return (
    <div className="flex justify-center lg:justify-end">
      {successMessage && <AlertDialog
        onSubmit={handleCloseAlert}
        submitText="Close"
        warningMessage=''
        message={`We’ve received your message. Thank you for reaching out to us! Our team will get back to you soon.`}
        success={true}
      />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white flex-col p-4 sm:p-8 font-inter text-sm text-black space-y-2 rounded-2xl sm:rounded-3xl tracking-normal min-w-full lg:min-w-[450px] xl:min-w-[495px] "
      >
        <div className="flex flex-col gap-y-2">
          <label className="flex">
            Full Name
            <FaAsterisk color="#DE2424" size={8} className="mt-1" />
          </label>
          <input
            {...register("fullName")}
            type="text"
            placeholder="Enter full name"
            className={`default-input  ${errors.fullName ? 'border-[#FF0000]' : ''}`}
          />

        </div>
        <div className="flex flex-col gap-y-2">
          <label className="flex">
            Your email
            <FaAsterisk color="#DE2424" size={8} className="mt-1" />
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter email"
            className={`default-input  ${errors.email ? 'border-[#FF0000]' : ''}`}
          />

        </div>
        <div className="flex flex-col gap-y-2">
          <label className="flex">
            Phone number
            <FaAsterisk color="#DE2424" size={8} className="mt-1" />
          </label>
          <div className={`flex flex-row w-full border-[1px]  border-[#D3D3D3] rounded-xl bg-white focus-within:border-[#7B6944] focus-within:border-[1px] ${errors.phoneNumber ? 'border-[#FF0000]' : ''}`}>
            <select
              {...register("countryCode")}
              onChange={(e) => handleCountryChange(e)}
              className="bg-white outline-none pl-5 pr-2 appearance-none border-r-2 border-[#F5F5F5] rounded-l-xl"
            >
              {options.map(({ code, dialCode }) => (
                <option key={code} value={code}>
                  {dialCode}
                </option>
              ))}
            </select>
            <input
              {...register("phoneNumber")}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              placeholder="Enter phone number"
              className={`pl-2 pr-5 py-4 w-full outline-none rounded-xl `}
            />

          </div>
        </div>
        <div className="flex flex-col py-1">
          <textarea
            {...register("description")}
            rows={6}
            placeholder="How can we help you?"
            className={`default-input w-full ${errors.description ? 'border-[#FF0000]' : ''}`}
          />
          <span className="text-[#FF0000] font-xs">{errors?.description?.message}</span>
        </div>
        <button
          type="submit"
          className="flex justify-center items-center text-white bg-black w-full text-center px-8 py-[19px] font-inter font-semibold text-[1rem] rounded-[1rem]"
          disabled={isLoading}
        >
          {isLoading ? `Submitting` : "Submit"} {isLoading && <p className="animate-bounce">&nbsp;...</p>}
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
