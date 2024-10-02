
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../config/baseurl";
import { formateDate } from "../../helper/date";

export const bookingCheckIn = localStorage.getItem('checkIn');
export const bookingCheckOut = localStorage.getItem('checkOut');
export const bookingGuest = localStorage.getItem('guests');

export const checkListingBookingAvailability = createAsyncThunk(
  'listing/booking/availability',
  async (listing, { getState }) => {
    try {
      const { checkBookingParams } = getState().booking;

      const query = new URLSearchParams({
        checkIn: formateDate(checkBookingParams.checkIn),
        checkOut: formateDate(checkBookingParams.checkOut),
        listingId: checkBookingParams.listingId
      }).toString();

      const { data } = await axios.get(`${baseUrl}/listing/checkavailability?${query}`);
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const calculateBookingPrice = createAsyncThunk(
  'booking/price-calculate',
  async (booking) => {
    try {
      const { data } = await axios.post(`${baseUrl}/listing/calculateprice`, { ...booking });
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const getDiscountedPrice = createAsyncThunk(
  'booking/discount-price',
  async (booking, { rejectWithValue }) => {
    const query = new URLSearchParams({
      couponCode: booking.couponCode,
      listingId: booking.listingId,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      totalPrice: booking.totalPrice
    });
    try {
      const response = await axios.get(`${baseUrl}/listing/getdiscountedprice?${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

const bookingSlice = createSlice({

  name: 'booking',

  initialState: {
    loading: false,
    error: null,
    isListingBookingAvailable: false,
    bookingNotAvailableAlertDialog: false,
    bookingPrice: {},
    checkBookingParams: {
      checkIn: '',
      checkOut: '',
      listingId: '',
      guests: '',
    },

    discountPrice: '',
    tokenError: '',
    tokenLoading: false
  },

  reducers: {
    setCheckBookingParams: (state, action) => {
      const { name, value } = action.payload;

      if (name == 'checkIn' || name == 'checkOut') {
        state.isListingBookingAvailable = false;
      }

      if (name === 'checkIn' && value >= state.checkBookingParams.checkOut) {
        const minDateCheckOut = new Date(value);
        minDateCheckOut.setDate(value.getDate() + 1);
        state.checkBookingParams.checkIn = value;
        state.checkBookingParams.checkOut = minDateCheckOut;
        localStorage.setItem('checkIn', value);
        localStorage.setItem('checkOut', minDateCheckOut);
      } else {
        state.checkBookingParams[name] = value;
        localStorage.setItem(name, value);
      }
    },

    setCheckBookingParamsToInitialState: (state) => {
      state.checkBookingParams = {
        checkIn: '',
        checkOut: '',
        listingId: '',
        guests: '',
      };
    },

    toggleBookingNotAvailableAlertDialog: (state) => {
      state.bookingNotAvailableAlertDialog = false;
    },

    handleTokenStateChange: (state) => {
      state.tokenError = '';
      localStorage.removeItem('coupon');
    }


  },

  extraReducers: (builder) => {

    //check booking availability
    builder
      .addCase(checkListingBookingAvailability.pending, (state) => {
        state.loading = true;
        state.isListingBookingAvailable = false;
      })
      .addCase(checkListingBookingAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.isListingBookingAvailable = action.payload.isAvailable;
        if (action.payload.isAvailable == false) {
          state.bookingNotAvailableAlertDialog = true;
        }
      })
      .addCase(checkListingBookingAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    //calculate booking price
    builder
      .addCase(calculateBookingPrice.pending, (state) => {
        state.loading = true;
      })
      .addCase(calculateBookingPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingPrice = action.payload;
      })
      .addCase(calculateBookingPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    //get discounted price
    builder
      .addCase(getDiscountedPrice.pending, (state) => {

        state.tokenLoading = true;
        state.isDiscountAmount = false;
        localStorage.setItem('isTokenValid', false);
        state.tokenError = '';
      })
      .addCase(getDiscountedPrice.fulfilled, (state, action) => {
        state.tokenLoading = false;
        if (action.payload.discountedPrice == null || action.payload.discountedPrice == undefined) {
          state.discountPrice = 0;
          state.isTokenValid = false;
          localStorage.setItem('discountPrice', 0);
          state.tokenError = 'Discount not available';
        } else {
          state.isTokenValid = true;
          state.discountPrice = action.payload.discountedPrice;
          localStorage.setItem('discountPrice', action.payload.discountedPrice);
          localStorage.setItem('isTokenValid', true);
        }

      })
      .addCase(getDiscountedPrice.rejected, (state, action) => {
        state.tokenLoading = false;
        state.error = action.payload.message;
        state.tokenError = action.payload.message;
      });
  }
});

export const
  { setCheckBookingParams,
    toggleBookingNotAvailableAlertDialog,
    setCheckBookingParamsToInitialState,
    handleTokenStateChange
  } = bookingSlice.actions;
export default bookingSlice.reducer;