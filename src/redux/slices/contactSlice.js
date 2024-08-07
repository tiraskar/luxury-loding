import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../config/baseurl";
import axios from "axios";

const submitContactForm = createAsyncThunk(
  'contact/submit',
  async () => {
    const { data, message } = await axios.post(`${baseUrl}/contact`);
  }
);


const contactSlice = createSlice({

  name: 'contact',
  initialState: {

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
  }
});