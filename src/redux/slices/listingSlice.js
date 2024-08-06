import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../config/baseurl";

// Thunks
export const syncListing = createAsyncThunk(
  'listing/sync',
  async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/listing/synclisting`);
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchListingList = createAsyncThunk(
  'listing/list',
  async (listing, { getState }) => {
    try {
      const { listingLimit, listingPage } = getState().listing;
      const { data } = await axios.get(`${baseUrl}/listing?limit=${listingLimit}&page=${listingPage}`);
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchListingInfo = createAsyncThunk(
  'listing/getInfo',
  async (listingId) => {
    try {
      const { data } = await axios.get(`${baseUrl}/listing/getlistinginfo/${listingId}`);

      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchAvailableListing = createAsyncThunk(
  'listing/searchAvailable',
  async (listing) => {
    try {
      const query = new URLSearchParams({
        location: listing.location,
        checkIn: listing.checkIn,
        checkOut: listing.checkOut,
        guests: listing.guests || ""
      }).toString();

      const { data } = await axios.get(`${baseUrl}/listing/getavailablelistings?${query}`);
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const loadMoreListing = createAsyncThunk(
  'listing/loadMore',
  async (listing, { getState }) => {
    try {
      const { listingLimit, listingPage } = getState().listing;
      const { data } = await axios.get(`${baseUrl}/listing?limit=${listingLimit}&page=${listingPage + 1}`);
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchOtherListings = createAsyncThunk(
  'listing/other',
  async (listing) => {
    try {
      const { data } = await axios.get(`${baseUrl}/listing?limit=${listing.limit}`);
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchListingTotalCount = createAsyncThunk(
  'listing/count',
  async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/listing/count`);
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const searchListing = createAsyncThunk(
  'listing/search',
  async (listing,) => {
    try {
      const query = new URLSearchParams({
        location: listing.location,
        checkIn: listing.checkIn,
        checkOut: listing.checkOut,
        guests: listing.guests || ""
      }).toString();

      const { data } = await axios.get(`${baseUrl}/listing/getavailablelistings?${query}`);
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
)

// Slice
const listingSlice = createSlice({
  name: 'listing',
  initialState: {
    loading: false,
    error: null,
    listingList: [],
    listingInfo: {},
    availableListing: [],
    mapView: false,
    listingLimit: 8,
    listingPage: 1,
    otherListings: [],
    listingTotalCount: 0,
    searchedListingList: [],
    isFetchListing: false,
    isFetchedAvailableListing: false,
    isLoadMoreListing: false,
    minDate: new Date(),
  },
  reducers: {
    // Any synchronous actions can be added here
  },

  extraReducers: (builder) => {

    // Sync Listing
    builder
      .addCase(syncListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncListing.fulfilled, (state, action) => {
        state.loading = false;
        state.listingList = action.payload;
      })
      .addCase(syncListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Fetch Listing List
    builder
      .addCase(fetchListingList.pending, (state) => {
        state.loading = true;
        state.isFetchListing = true;
        state.error = null;
      })
      .addCase(fetchListingList.fulfilled, (state, action) => {
        state.loading = false;
        state.isFetchListing = false;
        state.listingList = action.payload;
      })
      .addCase(fetchListingList.rejected, (state, action) => {
        state.loading = false;
        state.isFetchListing = false;
        state.error = action.error.message;
      });

    // Fetch Listing Info
    builder
      .addCase(fetchListingInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListingInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.listingInfo = action.payload;
      })
      .addCase(fetchListingInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Fetch Available Listing
    builder
      .addCase(fetchAvailableListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableListing.fulfilled, (state, action) => {
        state.loading = false;
        state.listingList = action.payload;
      })
      .addCase(fetchAvailableListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    //load more listing
    builder
      .addCase(loadMoreListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMoreListing.fulfilled, (state, action) => {
        state.loading = false;
        state.listingList = [...state.listingList, ...action.payload];
        state.listingPage++;
      })
      .addCase(loadMoreListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Other Listing
    builder
      .addCase(fetchOtherListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOtherListings.fulfilled, (state, action) => {
        state.loading = false;
        state.otherListings = action.payload;
      })
      .addCase(fetchOtherListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Listing Count
    builder
      .addCase(fetchListingTotalCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListingTotalCount.fulfilled, (state, action) => {
        state.loading = false;
        state.listingCount = action.payload.count;
      })
      .addCase(fetchListingTotalCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    //search listings 
    builder
      .addCase(searchListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchListing.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedListingList = action.payload;
      })
      .addCase(searchListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default listingSlice.reducer;
