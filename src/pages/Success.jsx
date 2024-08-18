import { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../config/baseurl';
import axios from 'axios';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Success = () => {
    const query = useQuery();
    const paymentIntent = query.get('payment_intent');
    const [paymentStatus, setPaymentStatus] = useState(null);

    const getPaymentIntentInfo = async () => {
        try {
            const response = await axios.get(`${baseUrl}/payment/getpaymentintent/${paymentIntent}`);
            if (response.status === 200) {
                const paymentIntent = response.data.paymentIntent;
                setPaymentStatus(paymentIntent.status);
            } else {
                console.error('Failed to get payment intent info');
            }
        } catch (error) {
            console.error('Error fetching payment intent info', error);
        }
    };

    useEffect(() => {
        if (paymentIntent) {
            getPaymentIntentInfo();

            const interval = setInterval(() => {
                getPaymentIntentInfo();
            }, 10000);

            return () => clearInterval(interval);
        }
    }, [paymentIntent]);

    const renderStatus = () => {
        switch (paymentStatus) {
            case 'succeeded':
                return (
                    <>
                        <FaCheckCircle color='green' className="h-24 w-24 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                        <p className="text-gray-600 mb-6">Thank you for your booking. Your payment has been processed successfully.</p>
                    </>
                );
            case 'requires_payment_method':
                return (
                    <>
                        <FaExclamationCircle color='red' className="h-24 w-24 text-yellow-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Payment Failed!</h2>
                        <p className="text-gray-600 mb-6">The payment method you provided was not accepted. Please try again with a different payment method.</p>
                    </>
                );
            case 'requires_confirmation':
                return (
                    <>
                        <FaSpinner color='gray' className="h-24 w-24 text-blue-500 animate-spin mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Payment Pending!</h2>
                        <p className="text-gray-600 mb-6">Your payment is currently pending confirmation. Please wait a moment.</p>
                    </>
                );
            case 'requires_action':
                return (
                    <>
                        <FaExclamationCircle color='gray' className="h-24 w-24 text-yellow-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Additional Action Required!</h2>
                        <p className="text-gray-600 mb-6">Your payment requires additional action. Please follow the instructions provided by your bank.</p>
                    </>
                );
            case 'processing':
                return (
                    <>
                        <FaSpinner color='gray' className="h-24 w-24 text-blue-500 animate-spin mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Payment Processing!</h2>
                        <p className="text-gray-600 mb-6">Your payment is currently being processed. Please wait a moment.</p>
                    </>
                );
            case 'requires_capture':
                return (
                    <>
                        <FaExclamationCircle color='red' className="h-24 w-24 text-yellow-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Payment Requires Capture!</h2>
                        <p className="text-gray-600 mb-6">Your payment requires capture. Please contact support for further assistance.</p>
                    </>
                );
            case 'canceled':
                return (
                    <>
                        <FaTimesCircle color='red' className="h-24 w-24 text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Payment Canceled!</h2>
                        <p className="text-gray-600 mb-6">Your payment was canceled. If this was a mistake, please try again.</p>
                    </>
                );
            default:
                return (
                    <>
                        <FaExclamationCircle color='gray' className="h-24 w-24 text-gray-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Payment Status Unknown</h2>
                        <p className="text-gray-600 mb-6">The status of your payment is currently unknown. Please contact support for further assistance.</p>
                    </>
                );
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                {renderStatus()}
                {/* <p className="text-gray-600 mb-6">Payment Intent: {paymentIntent}</p> */}
            </div>
        </div>
    );
};

export default Success;
