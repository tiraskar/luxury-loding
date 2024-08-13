import { useDispatch, useSelector } from "react-redux";
import { handlePaymentInput } from "../../redux/slices/paymentSlice.js";

const PersonalInfoForm = () => {

  const dispatch = useDispatch();

  const { personalInfo } = useSelector(state => state.payment);

  const handleChange = (name, value) => {
    const inputTitle = 'personalInfo';
    dispatch(handlePaymentInput({ inputTitle, name, value }))
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
            required
            className="default-input"
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
            required
            className="default-input" />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="email" className="flex">Your email</label>
          <input
            name="email"
            value={personalInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
            type="email"
            placeholder="Enter email"
            required
            className="default-input" />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="phone-number" className="flex">Phone number</label>
          <input
            name="phone"
            value={personalInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            type="number"
            placeholder="Enter phone number"
            required
            className="default-input" />
        </div>

      </div>

    </div>
  );
};


export default PersonalInfoForm;