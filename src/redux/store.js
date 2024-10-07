
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import persistReducer from "redux-persist/es/persistReducer";
// import persistStore from "redux-persist/es/persistStore";
// import storage from "redux-persist/lib/storage";
// import listingReducer from "./slices/listingSlice";
// import bookingReducer from "./slices/bookingSlice";
// import paymentReducer from "./slices/paymentSlice";
// import contactReducer from "./slices/contactSlice";
// import otherReducer from "./slices/otherSlice";

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['booking', 'payment', 'contact', 'other']
// };

// const reducer = persistReducer(persistConfig);



// const store = configureStore({
//   reducer: {
//     listing: listingReducer,
//     booking: bookingReducer,
//     payment: paymentReducer,
//     contact: contactReducer,
//     other: otherReducer
//   }
// });


// const persistor = persistStore(store);

// export { store, persistor };

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import listingReducer from "./slices/listingSlice";
import bookingReducer from "./slices/bookingSlice";
import paymentReducer from "./slices/paymentSlice";
import contactReducer from "./slices/contactSlice";
import otherReducer from "./slices/otherSlice";


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['booking']
};

// Combine all the reducers
const rootReducer = combineReducers({
  listing: listingReducer,
  booking: bookingReducer,
  payment: paymentReducer,
  contact: contactReducer,
  other: otherReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,  // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

const persistor = persistStore(store);

export { store, persistor };
