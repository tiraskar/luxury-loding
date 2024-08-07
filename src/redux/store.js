
import { configureStore } from "@reduxjs/toolkit";
import listingReducer from "./slices/listingSlice";
import bookingReducer from "./slices/bookingSlice";

export const store = configureStore({
  reducer: {
    listing: listingReducer,
    booking: bookingReducer,
  }
});