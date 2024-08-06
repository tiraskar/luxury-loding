import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import "react-datepicker/dist/react-datepicker.css";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51OsSKpGurTGjjGfhdLcO3WBZDR1UkYvvDWBUFFRnqQU2pSAThq4xfLVHLz11h94g2i4jONlHecSXhcxwkbJNz4a300y43aO1nM');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>,
  </React.StrictMode>,
)
