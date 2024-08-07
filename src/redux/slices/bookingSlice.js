
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const checkBookingAvailability = createAsyncThunk(
  'booking/check-availability',
  async () => {

  }
);

const bookingSlice = createSlice({

  name: 'booking',

  initialState: {
    loading: false,
    error: null,
    isBookingAvailable: false,
    checkBookingParams: {
      checkIn: new Date(),
      checkOut: new Date(),
      listingId: ''
    }
  },

  reducers: {
    setCheckBookingParams: (state, action) => {
      const { name, value } = action.payload;

      if (name === 'checkIn' && value > state.checkBookingParams.checkOut) {

        state.checkBookingParams.checkIn = value;
        state.checkBookingParams.checkOut = '';

      } else {
        state.checkBookingParams[name] = value;
      }
    }
  },

  extraReducers: (builder) => {

    //check booking availability
    builder
      .addCase(checkBookingAvailability.pending, (state) => {
        state.loading = true;
        state.isBookingAvailable = false;
      })
      .addCase(checkBookingAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.isBookingAvailable = action.payload.isAvailable;
      })
      .addCase(checkBookingAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

  }
});

export const { setCheckBookingParams } = bookingSlice.actions;
export default bookingSlice.reducer;