import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../config/baseurl";
import axios from "axios";

import { toast } from "react-toastify";

const submitContactForm = createAsyncThunk(
  'contact/submit',
  async (contact, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/contact`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }

  }
);

export const emailSubscription = createAsyncThunk(
  'contact/emailSubscription',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/contact/createsubscription`, { email: email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)


const contactSlice = createSlice({

  name: 'contact',
  initialState: {
    loading: false,
    error: null,
    isEmailSent: false,
    isEmailSubscriptionLoading: false,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    //email subscription
    builder
      .addCase(emailSubscription.pending, (state) => {
        state.isEmailSubscriptionLoading = true;
        state.error = null;
        state.isEmailSent = false;
      })
      .addCase(emailSubscription.fulfilled, (state) => {
        state.isEmailSubscriptionLoading = false;
        state.isEmailSent = true;
        toast.success(`You have successfully subscribed to our email updates.`);
      })
      .addCase(emailSubscription.rejected, (state, action) => {
        state.isEmailSubscriptionLoading = false;
        state.error = action.payload;
        state.isEmailSent = false;

      });
  }
});
// export const { setSubscriptionEmail } = contactSlice.actions;

export default contactSlice.reducer;