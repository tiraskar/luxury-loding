
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
  async (booking, { getState, rejectWithValue }) => {
    try {
      const { couponCode } = getState().booking;
      const { data } = await axios.post(`${baseUrl}/listing/calculateprice`, { ...booking, couponName: couponCode });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
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
      const response = await axios.get(`${baseUrl}/listing/getdiscountprice?${query}`);
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
    bookingGuests: {
      adults: 1,
      children: 0,
      infants: 0,
      pets: 0,
    },
    isGuestChanged: false,
    bookingInitialValues: {
      checkIn: '',
      checkOut: '',
      guests: '',
    },
    isBooking: false,
    couponCode: null,
    totalDiscountPrice: 0,
    tokenError: '',
    tokenLoading: false,
    isValidToken: false,
    isDateRangedPickedFromBooking: false,
    isDateRangedPickedFromAvailability: false,
    isBookingDetailsChange: false
  },

  reducers: {
    setCheckBookingParams: (state, action) => {
      const { name, value } = action.payload;

      if (name == 'checkIn' || name == 'checkOut') {
        state.isListingBookingAvailable = false;
      }

      if (name === 'checkIn' && value >= state.checkBookingParams.checkOut) {
        state.checkBookingParams.checkIn = value;
        localStorage.setItem('checkIn', value);
      } else {
        state.checkBookingParams[name] = value;
        localStorage.setItem(name, value);
      }
    },
    setIsGuestChange: (state, action) => {
      state.isGuestChanged = action.payload;
    },
    setBookingGuests: (state, action) => {
      const { name, value } = action.payload;
      if (state.bookingGuests[name] + value >= 0) {
        state.bookingGuests[name] += value;
      }
    },

    setBookingInitialValues: (state, action) => {
      state.bookingInitialValues.checkIn = action.payload.checkIn;
      state.bookingInitialValues.checkOut = action.payload.checkOut;
      state.bookingInitialValues.guests = action.payload.guests;
    },

    setIsBookingDetailsChange: (state) => {
      state.isBookingDetailsChange = !state.isBookingDetailsChange;
    },


    setCheckBookingParamsToInitialState: (state) => {
      state.checkBookingParams = {
        checkIn: '',
        checkOut: '',
        listingId: '',
        guests: '',
      };
      state.bookingGuests = {
        adults: 1,
        children: 0,
        infants: 0,
        pets: 0,
      }
    },
    setIsBooking: (state, action) => {
      state.isBooking = action.payload;
    },

    toggleBookingNotAvailableAlertDialog: (state) => {
      state.bookingNotAvailableAlertDialog = false;
    },

    setCouponCode: (state, action) => {
      state.couponCode = action.payload.couponCode;
    },

    toggleTokenState: (state) => {
      state.isValidToken = false;
      state.tokenError = '';
      state.couponCode = null;
      state.totalDiscountPrice = 0;
      state.loading = false;
      state.isListingBookingAvailable = false;
      state.bookingNotAvailableAlertDialog = false;

    },


    toggleDateRangedPickedForBooking: (state, action) => {
      if (action.payload == 'bookingDatePick') {
        state.isDateRangedPickedFromAvailability = false;
        state.isDateRangedPickedFromBooking = true;
      }
      if (action.payload == 'availabilityDatePick') {
        state.isDateRangedPickedFromAvailability = true;
        state.isDateRangedPickedFromBooking = false;

      }
    },


    clearBookingDateSelection: (state) => {
      state.isDateRangedPickedFromAvailability = false;
      state.isDateRangedPickedFromBooking = false;
      state.checkBookingParams.checkIn = '';
      state.checkBookingParams.checkOut = '';
      localStorage.removeItem('checkIn');
      localStorage.removeItem('checkOut');
      state.isListingBookingAvailable = false;
    },

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
        if (state.couponCode !== null) {
          const discountObj = action.payload.components.filter(data => data.name == 'couponDiscount');
          if (discountObj) {
            state.isValidToken = true;
          } else {
            state.isValidToken = false;
          }
        } else {
          state.isValidToken = false;
          state.tokenError = '';
        }
      })
      .addCase(calculateBookingPrice.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload;
        state.tokenError = action.payload.message;
      });

    //get discounted price
    builder
      .addCase(getDiscountedPrice.pending, (state) => {

        state.tokenLoading = true;
        state.isDiscountAmount = false;
        state.tokenError = '';
      })
      .addCase(getDiscountedPrice.fulfilled, (state, action) => {
        state.tokenLoading = false;
        if (action.payload.discountedPrice == null || action.payload.discountedPrice == undefined) {
          state.totalDiscountPrice = 0;
          state.isTokenValid = false;
          state.tokenError = 'Discount not available';
        } else {
          state.isTokenValid = true;
          state.totalDiscountPrice = Number(action.payload.discountedPrice).toFixed(2);
          state.isValidToken = true;
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
    toggleTokenState,
    setCouponCode,
    toggleDateRangedPickedForBooking,
    clearBookingDateSelection,
    setIsBooking,
    setIsBookingDetailsChange,
    setBookingInitialValues,
    setBookingGuests,
    setIsGuestChange
  } = bookingSlice.actions;
export default bookingSlice.reducer;