import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'
// import { LoadScript } from '@react-google-maps/api';

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Elements stripe={stripePromise} >
    </Elements> */}
    {/* <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_KEY}>
    </LoadScript> */}
    <App />
  </React.StrictMode>
)
