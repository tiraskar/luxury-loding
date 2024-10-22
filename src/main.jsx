import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Elements stripe={stripePromise} >
      <App />
    </Elements>
  </React.StrictMode>
)
