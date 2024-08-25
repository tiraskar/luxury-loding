
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../config/baseurl";
import { formateDate } from "../../helper/date";


const bookingCheckIn = localStorage.getItem('checkIn');
const bookingCheckOut = localStorage.getItem('checkOut');
const bookingGuest = localStorage.getItem('guests');

export const fetchStripPromiseKey = createAsyncThunk(
  'stripe/key', async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/payment/stripepublishablekey`);
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const createPaymentIntent = createAsyncThunk(
  'payment/intent',
  async (listing, { rejectWithValue }) => {


    try {
      const paymentIndentData = {
        listingId: listing.id,
        checkIn: formateDate(new Date(bookingCheckIn)),
        checkOut: formateDate(new Date(bookingCheckOut)),
        guests: Number(bookingGuest),
        amount: Math.round(Number(listing.amount) * 100),
        currency: 'usd'
      };
      const response = await axios.post(`${baseUrl}/payment/createpaymentintent`,
        { ...paymentIndentData }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const createCustomer = createAsyncThunk(

  'payment/customer', async (payment, { getState, rejectWithValue }) => {
    try {
      const { personalInfo } = getState().payment;

      const response = await axios.post(`${baseUrl}/payment/createcustomer`, {
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        email: personalInfo.email,
        phone: personalInfo.phone,
      });
      return response.data;

    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const savePaymentInfo = createAsyncThunk(
  'payment/savePayment', async (customerId, { getState, rejectWithValue }) => {
    try {
      const { personalInfo, paymentType, paymentIntentId
      } = getState().payment;
      const { listingInfo } = getState().listing;
      const { bookingPrice } = getState().booking;

      const response = await axios.post(`${baseUrl}/payment/savepaymentinfo`, {
        customerId: customerId,
        guestName: `${personalInfo.firstName} ${personalInfo.lastName}`,
        guestEmail: personalInfo.email,
        guestPhone: `${personalInfo.countryDialCode} ${personalInfo.phone}`,
        listingId: listingInfo.id,
        checkInDate: formateDate(new Date(bookingCheckIn)),
        checkOutDate: formateDate(new Date(bookingCheckOut)),
        guests: Number(bookingGuest),
        paymentIntentId: paymentIntentId,
        paymentMethod: paymentType,
        amount: (Number(bookingPrice.totalPrice) * 100),
        currency: "usd",
        paymentStatus: "initiated",
      });

      return response.data;

    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
});


const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    error: null,
    clientSecret: "",
    paymentIntentId: "",
    stripPUblishAbleKey: '',
    isFetchingStripKey: false,
    confirmPayment: false,
    paymentType: 'card',
    customerId: '',

    //personalInfo
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      countryCode: 'us',
      countryDialCode: '+1'
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

    //fetch strip loading key

    builder
      .addCase(fetchStripPromiseKey.pending, (state) => {
        state.loading = true;
        state.isFetchingStripKey = true;
        state.error = null;
      })
      .addCase(fetchStripPromiseKey.fulfilled, (state, action) => {
        state.loading = false;
        state.isFetchingStripKey = false;
        state.stripPUblishAbleKey = action.payload.publishableKey;
      })
      .addCase(fetchStripPromiseKey.rejected, (state, action) => {
        state.loading = false;
        state.isFetchingStripKey = false;
        state.error = action.error.message;
      });


    //create payment intent
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.clientSecret = action.payload.clientSecret;
        state.paymentIntentId = action.payload.paymentIntentId;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    //create customer
    builder
      .addCase(createCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.customerId = '';
        state.confirmPayment = false;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        const { customerId } = action.payload;
        state.loading = false;
        state.customerId = customerId;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //save payment info
    builder
      .addCase(savePaymentInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savePaymentInfo.fulfilled, (state) => {
        state.loading = false;
        state.confirmPayment = true;
      })
      .addCase(savePaymentInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  }
});


export const {
  handlePaymentInput,
  handlePaymentType } = paymentSlice.actions;
export default paymentSlice.reducer;