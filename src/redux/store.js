
import { configureStore } from "@reduxjs/toolkit";
import listingReducer from "./slices/listingSlice";
import bookingReducer from "./slices/bookingSlice";
import paymentReducer from "./slices/paymentSlice";
import contactReducer from "./slices/contactSlice";

export const store = configureStore({
  reducer: {
    listing: listingReducer,
    booking: bookingReducer,
    payment: paymentReducer,
    contact: contactReducer
  }
});