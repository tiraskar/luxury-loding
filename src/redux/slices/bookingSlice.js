
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../config/baseurl";
import { formateDate } from "../../helper/date";

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
      const { data } = await axios.post(`${baseUrl}/listing/calculateprice`, booking);
      return data;
    } catch (error) {
      return Promise.reject(error.message);
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
      listingId: ''
    }
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

      } else {
        state.checkBookingParams[name] = value;
      }
    },

    toggleBookingNotAvailableAlertDialog: (state) => {
      state.bookingNotAvailableAlertDialog = false;
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

  }
});

export const { setCheckBookingParams, toggleBookingNotAvailableAlertDialog } = bookingSlice.actions;
export default bookingSlice.reducer;