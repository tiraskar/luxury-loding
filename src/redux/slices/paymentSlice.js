
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../config/baseurl";
import { formateDate } from "../../helper/date";

export const createPaymentIntent = createAsyncThunk(
  'payment/intent',
  async (listingId, { getState }) => {

    const bookingCheckIn = localStorage.getItem('checkIn');
    const bookingCheckOut = localStorage.getItem('checkOut');
    const bookingGuest = localStorage.getItem('guests');

    try {
      const paymentIndentData = {
        listingId: listingId,
        checkIn: formateDate(new Date(bookingCheckIn)),
        checkOut: formateDate(new Date(bookingCheckOut)),
        guests: Number(bookingGuest),
        amount: '200',
        currency: 'usd'
      };
      const { data } = await axios.post(`${baseUrl}/payment/createpaymentintent`,
        { ...paymentIndentData }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return data;
    } catch (error) {
      throw error.message;
    }
  }
);


export const createCustomer = createAsyncThunk(
  'payment/customer', async (customer) => {
    try {
      const { data } = await axios.post(`${baseUrl}/payment/createcustomer`, {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
      });
      return data;
    } catch (error) {
      throw error.message;
    }
  }
);

export const savePaymentInfo = createAsyncThunk(
  'payment/savePayment', async (paymentInfo) => {
    try {
      const { data } = await axios.post(`${baseUrl}/payment/savepayment`, {
        customerId: paymentInfo.customerId,
        paymentMethodId: paymentInfo.paymentMethodId,
        billingInfo: paymentInfo.billingInfo
      });
      return data;
    } catch (error) {
      throw error.message;
    }
  });


export const confirmPayment = createAsyncThunk(
  'payment/confirm', async (paymentIntent) => {
    try {
      const { data } = await axios.post(`${baseUrl}/payment/confirm`, {
        clientSecret: paymentIntent.clientSecret,
      });
      return data;
    } catch (error) {
      throw error.message;
    }
  }
);


const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    error: null,
    clientSecret: "",

    paymentType: 'card',

    //personalInfo
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },

    //paymentInfo
    paymentInfo: {

    },

    //
    billingInfo: {
      firstName: '',
      lastName: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US'
    }
  },
  reducers: {
    handlePaymentInput: (state, action) => {

      const { inputTitle, name, value } = action.payload;

      console.log(inputTitle, name, value);

      if (inputTitle == 'personalInfo') {
        state.personalInfo[name] = value;
      }
      if (inputTitle == 'paymentInfo') {
        state.paymentInfo[name] = value;
      }
      if (inputTitle == 'billingInfo') {
        state.billingInfo[name] = value;
      }

    },

    handlePaymentType: (state, action) => {
      state.paymentType = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        console.log('payment intent', action.payload);
        state.clientSecret = action.payload;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});


export const {
  handlePaymentInput,
  handlePaymentType } = paymentSlice.actions;
export default paymentSlice.reducer;