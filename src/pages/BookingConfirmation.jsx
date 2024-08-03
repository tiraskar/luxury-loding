import Booking from "../components/booking/Booking";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { TiTick } from "react-icons/ti";
import { Wrapper } from "../components";
import BillingAddress from "../components/payment/BillingAddress";
import PaymentMethod from "../components/payment/PaymentMethod";
import PersonalInfoForm from "../components/payment/PersonalInfoForm";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useEffect, useState } from "react";
import { baseUrl } from "../config/baseurl";
import toast from "react-hot-toast";
import axios from "axios";

const BookingConfirmation = () => {

  const paymentMethodOption = [
    {
      name: 'Card',
      image: '/images/card.png',
      value: 'card', // Add a value for each payment method
    },
    {
      name: 'USA bank account',
      image: '/images/usa-bank-account.png',
      value: 'bank-account',
    },
    {
      name: 'Affirm',
      image: '/images/affirm.png',
      value: 'affirm',
    },
  ];

  const stripe = useStripe();
  const elements = useElements();

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  
  const [billingAddress, setBillingsAddress] = useState({
    firstName: '',
    lastName: '',
    country: 'usa',
    address: '',
  });

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethodOption[0].value);
  const [clientSecret, setClientSecret] = useState(null);

  const handleSelect = (value) => {
    setSelectedPaymentMethod(value);
  };

  const handleSubmit = async () => {

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    //save the personal info
    const response = await fetch(`${baseUrl}/payment/createcustomer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        email: personalInfo.email,
        phone: personalInfo.phone,
      }),
    });

    if (response.status !== 201) {
      throw new Error('Failed to create customer');
    }

    const { customerId } = await response.json();

    // Confirm the PaymentIntent with the token
    const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: `${billingAddress.firstName} ${billingAddress.lastName}`,
          address: {
            line1: billingAddress.address
          },
        },
      },
    });

    if (intentError) {
      console.error('Payment confirm error');
      console.error(intentError);
      toast.error("Payment Failed!!!", { duration: 2000 });
      return;
    }
    // Save the payment info
    await savePaymentInfo(customerId, paymentIntent);

    console.log('Payment successful!', paymentIntent);
    toast.success("Payment successful!!!", { duration: 2000 });
  };

  const savePaymentInfo = async (customerId, paymentIntent) => {

    const requestObj = {
      guestName: `${personalInfo.firstName} ${personalInfo.lastName}`,
      guestEmail: personalInfo.email,
      guestPhone: personalInfo.phone,
      listingId: 169541,
      checkInDate: "2024-08-04",
      checkOutDate: "2024-08-05",
      guests: 2,
      paymentIntentId: paymentIntent.id,
      customerId,
      paymentMethod: "card",
      amount: "27000",
      currency: "usd",
      paymentStatus: paymentIntent.status
    };
    const response = await axios.post(`${baseUrl}/payment/savepaymentinfo`, requestObj);
    if (response.status !== 201) {
      console.error(`Failed to save payment info`);
      toast.error("Failed to save payment info!!!", { duration: 2000 });
    }
    return response.data;
  };

  const createPaymentIntent = async () => {
    const response = await fetch(`${baseUrl}/payment/createpaymentintent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "listingId": 169541,
        "checkIn": "2024-08-04",
        "checkOut": "2024-08-05",
        "guests": 2,
        "amount": "27000",
        "currency": "usd"
      }),
    });

    if (response.status !== 201) {
      console.error(`Failed to create payment intent`);
      toast.error("Something went wrong!!!", { duration: 2000 });
    }

    const { clientSecret } = await response.json();
    setClientSecret(clientSecret);
  };

  useEffect(() => {
    createPaymentIntent();
  }, [])

  return (
    <div className="flex flex-wrap md:grid md:grid-cols-9 min-h-screen">
      <div className="col-span-5 font-inter tracking-[-1%]">
        <Wrapper>
          <div className=" flex flex-col mx-auto  max-w-[652px]">
            <div className="flex flex-col justify-start lg:-ml-4">

              <div className="space-y-16">
                <p className="flex items-center text-xs text-[#A1A196] gap-1">
                  Home <GoDotFill /> Listing <GoDotFill className="text-black" />
                  <span className="text-black">Booking</span>
                </p>

                <div className="flex flex-col lg:flex-row justify-between  xl:min-w-[652px] gap-4">
                  <div className="flex items-center ">
                    <MdKeyboardArrowLeft size={24} />
                    <h1 className="text-xl font-onest tracking-tight font-semibold">
                      Confirm and Pay
                    </h1>
                  </div>
                  <div className="flex  items-center gap-4 ">
                    <div className="flex items-center space-x-2">
                      <div className="flex justify-center items-center w-6 h-6 text-xs bg-[#4AC72B] text-white rounded-full">
                        <TiTick className="text-white" />
                      </div>
                      <h1>Remember</h1>
                    </div>
                    <div className="w-full h-px bg-textDark px-4 "></div>
                    <div className="flex items-center space-x-2 ">
                      <p className="flex justify-center items-center w-6 h-6 text-xs bg-black text-white rounded-full">
                        2
                      </p>
                      <h1>Payment</h1>
                    </div>
                  </div>
                </div>
              </div>


              <div className="min-w-full h-px bg-[#E0E0E0] my-[22px] px-4"></div>

              <div className="flex flex-col gap-y-10">
                <PersonalInfoForm
                  personalInfo={personalInfo}
                  setPersonalInfo={setPersonalInfo}
                />
                <div className="min-w-full h-px bg-[#E0E0E0] px-4"></div>
                <PaymentMethod
                  paymentMethodOption={paymentMethodOption}
                  selectedPaymentMethod={selectedPaymentMethod}
                  handleSelect={handleSelect}
                  cardInfo={cardInfo}
                  setCardInfo={setCardInfo}
                  CardNumberElement={CardNumberElement}
                  CardExpiryElement={CardExpiryElement}
                  CardCvcElement={CardCvcElement}
                />
                <div className="min-w-full h-px bg-[#E0E0E0] px-4"></div>
                <BillingAddress
                  billingAddress={billingAddress}
                  setBillingsAddress={setBillingsAddress}
                />
              </div>
              <div className="hidden md:block pt-10 pb-10">
                <button
                  className="py-3 px-7 bg-[#333333] text-white rounded-[14px] "
                  onClick={() => handleSubmit()}
                >Confirm and pay</button>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      <div className="col-span-4 bg-[#F9F9F9] w-full ">
        <Wrapper>
          <div className="flex mx-auto max-w-[541px] py-20">
            <Booking />
          </div>
          <div className="block md:hidden pt-10 pb-10 md:pt-64">
            <button className="py-3 px-7 bg-[#333333] text-white rounded-[14px] ">
              Confirm and Pay
            </button>
          </div>
        </Wrapper>
      </div>

    </div>
  );
};

export default BookingConfirmation;