import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../config/baseurl";
import axios from "axios";
import { notifyToastMessage } from "../../components/ui/CustomToast";

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
    isEmailSent: false
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
        state.loading = true;
        state.error = null;
        state.isEmailSent = false;
      })
      .addCase(emailSubscription.fulfilled, (state) => {
        state.loading = false;
        state.isEmailSent = true;
        notifyToastMessage(`Email subscription done successfully. `);
      })
      .addCase(emailSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isEmailSent = false;

      });
  }
});
// export const { setSubscriptionEmail } = contactSlice.actions;

export default contactSlice.reducer;