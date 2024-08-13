
// import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { appearance } from "../../lib/stripe";
// import { useDispatch, useSelector } from "react-redux";
// import { handlePaymentType } from "../../redux/slices/paymentSlice";
// import { useEffect } from "react";
// import toast from "react-hot-toast";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe('pk_test_51OsSKpGurTGjjGfhdLcO3WBZDR1UkYvvDWBUFFRnqQU2pSAThq4xfLVHLz11h94g2i4jONlHecSXhcxwkbJNz4a300y43aO1nM');

// const PaymentMethod = () => {
//   const dispatch = useDispatch();
//   const stripe = useStripe()
//   const elements = useElements();

//   const { clientSecret,
//     confirmPayment, billingInfo
//   } = useSelector(state => state.payment);


//   const handlePaymentElementChange = (event) => {
//     console.log(event);

//     dispatch(handlePaymentType(event.value.type))
//   };

//   // const handleSubmit = async () => {

//   //   if (!stripe || !elements || !clientSecret) {
//   //     toast.error("Stripe has not loaded yet.");
//   //     return;
//   //   }

//   //   const { error } = await stripe.confirmPayment({
//   //     elements,
//   //     confirmParams: {
//   //       return_url: 'http://localhost:5173/success',
//   //     },
//   //   });

//   //   if (error) {
//   //     toast.error(`Payment failed: ${error.message}`);
//   //   } else {
//   //     toast.success("Payment successful!");
//   //   }
//   // };

//   const paymentConfirmation = async () => {
//     if (!stripe || !elements) {
//       console.error('Stripe.js or Elements not loaded');
//       return;
//     }

//     console.log('Stripe:', stripe);
//     console.log('Elements:', elements);

//     const paymentElement = elements.getElement(PaymentElement);
//     console.log('Payment Element:', paymentElement);

//     if (!stripe || !elements || !paymentElement) {
//       toast.error("Payment Element is not available.");
//       return;
//     }

//     try {
//       const result = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//           return_url: 'http://localhost:5173/success',
//           shipping: {
//             name: `${billingInfo.firstName} ${billingInfo.lastName}`,
//             address: {
//               line1: billingInfo.line1,
//               line2: billingInfo.line2,
//               city: billingInfo.city,
//               state: billingInfo.state,
//               postal_code: billingInfo.postalCode,
//               country: billingInfo.country,
//             },
//           },
//         },
//       });

//       if (result.error) {
//         toast.error(`Payment failed: ${result.error.message}`);
//       } else {
//         toast.success("Payment successful!");
//       }
//     } catch (error) {
//       toast.error(`Payment failed: ${error.message}`);
//     }
//   };
//   useEffect(() => {
//     if (confirmPayment) {
//       paymentConfirmation();
//     }
//   }, [confirmPayment]);

//   // useEffect(() => {
//   //   if (elements) {
//   //     const paymentElement = elements.getElement(PaymentElement);
//   //     console.log('payment element use effet', paymentElement);

//   //     if (paymentElement) {
//   //       paymentElement.on("change", handlePaymentElementChange);
//   //     }
//   //   }
//   // }, [elements]);

//   const options = {
//     clientSecret: clientSecret,
//     appearance: appearance
//   };

//   return (

//       <div className="font-inter text-[#333333] space-y-8">
//         <h1 className="font-medium tracking-tight text-lg">Payment Method</h1>
//       <div className="flex flex-col space-y-2">
//         {options.clientSecret && (
//           <Elements stripe={stripePromise} options={{ clientSecret }}>
//             <PaymentElement
//               onChange={(event) => handlePaymentElementChange(event)}
//             />
//           </Elements>
//         )}

//           <p className="text-xs font-normal tracking-[-0.12px] leading-6 text-[#333]">
//           By providing your card information, you allow AvantStay, Inc. to charge your card for future payments in accordance with their terms.
//           </p>
//         </div>
//     </div>
//   );
// };

// export default PaymentMethod;






// import {
//   PaymentElement,
//   useStripe,
//   useElements,
//   Elements,
//   CardElement,
// } from "@stripe/react-stripe-js";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { loadStripe } from "@stripe/stripe-js";
// import { handlePaymentType } from "../../redux/slices/paymentSlice";
// import LoaderScreen from "../ui/LoaderScreen";

// // Load Stripe outside of a component’s render to avoid recreating the instance on every render.
// const stripePromise = loadStripe('pk_test_51OsSKpGurTGjjGfhdLcO3WBZDR1UkYvvDWBUFFRnqQU2pSAThq4xfLVHLz11h94g2i4jONlHecSXhcxwkbJNz4a300y43aO1nM');

// const PaymentMethod = () => {
//   const dispatch = useDispatch();
//   const elements = useElements();
//   const stripe = useStripe();
//   const [isLoading, setIsLoading] = useState(false);
//   const [stripePaymentType, setStripePaymentType] = useState('card');

//   const { clientSecret, billingInfo, confirmPayment, paymentType } = useSelector((state) => state.payment);



//   const handlePaymentElementChange = (event) => {

//     // paymentElement = elements.create('payment', event.value.type);
//     // dispatch(handlePaymentType(event.value.type));
//     setStripePaymentType(event.value.type);
//   };

//   const handleSubmit = async () => {
//     setIsLoading(true);

//     if (!stripe || !elements || !clientSecret) {
//       console.error('Stripe.js or Elements not loaded');
//       setIsLoading(false);
//       return;
//     }

//     const paymentElement = elements.getElement(PaymentElement);

//     if (!paymentElement) {
//       toast.error("Payment Element is not mounted.");
//       setIsLoading(false);
//       return;
//     }


//     // if (!elements.getElement(PaymentElement)) {
//     //   toast.error("Payment Element is not mounted.");
//     //   setIsLoading(false);
//     //   return;
//     // }

//     try {
//       const result = await stripe.confirmPayment({
//       // elements,
//       // confirmParams: {
//       //   return_url: 'http://localhost:5173/success',
//       //   shipping: {
//       //     name: `${billingInfo.firstName} ${billingInfo.lastName}`,
//       //     address: {
//       //       line1: billingInfo.line1,
//       //       line2: billingInfo.line2,
//       //       city: billingInfo.city,
//       //       state: billingInfo.state,
//       //       postal_code: billingInfo.postalCode,
//       //       country: billingInfo.country,
//       //     },
//       //   },
//       // },
//         elements,
//         confirmParams: {
//           return_url: 'http://localhost:5173/success',
//           payment_method: paymentType,
//           shipping: {
//             name: `${billingInfo.firstName} ${billingInfo.lastName}`,
//             address: {
//               line1: billingInfo.line1,
//               line2: billingInfo.line2,
//               city: billingInfo.city,
//               state: billingInfo.state,
//               postal_code: billingInfo.postalCode,
//               country: billingInfo.country,
//             },
//           }
//         }
//       });

//       if (result.error) {
//         toast.error(`Payment failed: ${result.error.message}`);
//         console.error(result.error.message);
//       } else {
//         toast.success('Payment successful!');
//         console.log('Payment successful!');
//       }
//     } catch (error) {
//       toast.error('Payment failed!!!');
//       console.error(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (confirmPayment) {
//       handleSubmit();
//     }
//   }, [confirmPayment]);

//   // console.log('elements', elements.getElement(PaymentElement));

//   useEffect(() => {
//     dispatch(handlePaymentType(stripePaymentType));
//   }, [stripePaymentType])


//   useEffect(() => {
//     if (elements) {
//       const paymentElement = elements.getElement(PaymentElement);
//       if (paymentElement) {
//         paymentElement.on("change", handlePaymentElementChange);
//       }
//     }
//     }, [elements]);

//   return (
//     <div className="font-inter text-[#333333] space-y-8">
//       {isLoading && <LoaderScreen />}
//       <h1 className="font-medium tracking-tight text-lg">Payment Method</h1>
//       <div className="flex flex-col space-y-2">
//         {clientSecret && (
//           <Elements stripe={stripePromise} options={{ clientSecret }}>
//             <PaymentElement onChange={handlePaymentElementChange} />
//           </Elements>
//         )}
//         <p className="text-xs font-normal tracking-[-0.12px] leading-6 text-[#333]">
//           By providing your card information, you allow AvantStay, Inc. to charge your card for future payments in accordance with their terms.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PaymentMethod;
