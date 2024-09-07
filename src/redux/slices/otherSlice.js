import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../config/baseurl";

export const fetchUserReviews = createAsyncThunk(
  'user/reviews',
  async (review, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/review/gettopreviews`);
      return data;

    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



const otherSlice = createSlice({

  name: 'other',

  initialState: {
    loading: false,
    error: null,
    reviewList: []
  },

  reducers: {
  },

  extraReducers: (builder) => {

    //check booking availability
    builder
      .addCase(fetchUserReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewList = action.payload;
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }
});

export default otherSlice.reducer;