import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../config/baseurl";
import { formateDate } from "../../helper/date";

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
      const { listingLimit, listingPage, listingOrder } = getState().listing;
      const { data } = await axios.get(`${baseUrl}/listing?limit=${listingLimit}&page=${listingPage}&priceOrder=${listingOrder}`);
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
  async (listing, { getState }) => {
    try {
      const { listingOrder, searchListingParams } = getState().listing
      const query = new URLSearchParams({
        location: searchListingParams.location,
        checkIn: formateDate(searchListingParams.checkIn),
        checkOut: formateDate(searchListingParams.checkOut),
        guests: searchListingParams.guests || "",
        priceOrder: listingOrder || ""
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
      const { listingLimit, listingPage, listingOrder } = getState().listing;
      const { data } = await axios.get(`${baseUrl}/listing?limit=${listingLimit}&page=${listingPage + 1}&priceOrder=${listingOrder}`);
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
  async (listing, { getState }) => {
    try {
      const { searchListingParams } = getState().listing
      const query = new URLSearchParams({
        location: searchListingParams.location,
        checkIn: searchListingParams.checkIn,
        checkOut: searchListingParams.checkOut,
        guests: searchListingParams.guests || "",
        priceOrder: ""
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

    //boolean 
    loading: false,
    isSyncListing: false,
    isFetchListing: false,
    isFetchListingInfo: false,
    isFetchOtherListings: false,
    isFetchListingTotalCount: false,
    isFetchAvailableListing: false,
    isLoadMoreListing: false,
    isSearchListing: false,
    mapView: false,
    isSearchedListing: false,

    //error
    error: null,

    //array
    listingList: [],
    otherListings: [],
    availableListing: [],
    searchedListingList: [],

    //object
    listingInfo: {},

    //state values
    listingLimit: 8,
    listingPage: 1,
    listingTotalCount: 0,
    // minDate: new Date(),
    listingOrder: '',

    //form
    searchListingParams: {
      location: '',
      checkIn: '',
      checkOut: '',
      guests: '',
    },
  },

  reducers: {
    toggleMapView: (state) => {
      state.mapView = !state.mapView;
    },
    setListingOrder: (state, action) => {
      state.listingPage = 1;
      state.listingLimit = 8;
      state.listingOrder = action.payload;
    },

    setSearchListingParams: (state, action) => {
      const { name, value } = action.payload;

      if (name === 'guests') {
        //guest value should be 50 or below 50
        const numericValue = Math.min(Math.max(parseInt(value, 10), 0), 50);
        state.searchListingParams[name] = numericValue;

      } else if (name === 'checkIn' && value > state.searchListingParams.checkOut) {

        state.searchListingParams.checkIn = value;
        state.searchListingParams.checkOut = '';

      } else {
        state.searchListingParams[name] = value;
      }
    }
  },

  extraReducers: (builder) => {

    // Sync Listing
    builder
      .addCase(syncListing.pending, (state) => {
        state.isSyncListing = true;
        state.error = null;
      })
      .addCase(syncListing.fulfilled, (state, action) => {
        state.isSyncListing = false;
        state.listingList = action.payload;
      })
      .addCase(syncListing.rejected, (state, action) => {
        state.isSyncListing = false;
        state.error = action.error.message;
      });

    // Fetch Listing List
    builder
      .addCase(fetchListingList.pending, (state) => {
        state.isSearchedListing = false;
        state.isFetchListing = true;
        state.error = null;
      })
      .addCase(fetchListingList.fulfilled, (state, action) => {
        state.isFetchListing = false;
        state.listingList = action.payload;
      })
      .addCase(fetchListingList.rejected, (state, action) => {
        state.isFetchListing = false;
        state.error = action.error.message;
      });

    // Fetch Listing Info
    builder
      .addCase(fetchListingInfo.pending, (state) => {
        state.isFetchListingInfo = true;
        state.error = null;
      })
      .addCase(fetchListingInfo.fulfilled, (state, action) => {
        state.isFetchListingInfo = false;
        state.listingInfo = action.payload;
      })
      .addCase(fetchListingInfo.rejected, (state, action) => {
        state.isFetchListingInfo = false;
        state.error = action.error.message;
      });

    // Fetch Available Listing
    builder
      .addCase(fetchAvailableListing.pending, (state) => {
        state.availableListing = [];
        state.isSearchedListing = true;
        state.isFetchAvailableListing = true;
        state.error = null;
      })
      .addCase(fetchAvailableListing.fulfilled, (state, action) => {
        state.isFetchAvailableListing = false;
        state.availableListing = action.payload;
      })
      .addCase(fetchAvailableListing.rejected, (state, action) => {
        state.isSearchedListing = false;
        state.isFetchAvailableListing = false;
        state.error = action.error.message;
      });

    //load more listing
    builder
      .addCase(loadMoreListing.pending, (state) => {
        state.isLoadMoreListing = true;
        state.error = null;
      })
      .addCase(loadMoreListing.fulfilled, (state, action) => {
        state.isLoadMoreListing = false;
        if (state.isSearchedListing) {
          state.listingList = [...state.searchedListingList, ...action.payload];
        } else {
          state.listingList = [...state.listingList, ...action.payload];
        }

        state.listingPage++;
      })
      .addCase(loadMoreListing.rejected, (state, action) => {
        state.isLoadMoreListing = false;
        state.error = action.error.message;
      });

    // Other Listing
    builder
      .addCase(fetchOtherListings.pending, (state) => {
        state.isFetchOtherListings = true;
        state.error = null;
      })
      .addCase(fetchOtherListings.fulfilled, (state, action) => {
        state.isFetchOtherListings = false;
        state.otherListings = action.payload;
      })
      .addCase(fetchOtherListings.rejected, (state, action) => {
        state.isFetchOtherListings = false;
        state.error = action.error.message;
      });

    // Listing Count
    builder
      .addCase(fetchListingTotalCount.pending, (state) => {
        state.isFetchListingTotalCount = true;
        state.error = null;
      })
      .addCase(fetchListingTotalCount.fulfilled, (state, action) => {
        state.isFetchListingTotalCount = false;
        state.listingCount = action.payload.count;
      })
      .addCase(fetchListingTotalCount.rejected, (state, action) => {
        state.isFetchListingTotalCount = false;
        state.error = action.error.message;
      });

    //search listings 
    builder
      .addCase(searchListing.pending, (state) => {
        state.searchedListingList = [];
        state.isSearchedListing = true;
        state.isSearchListing = true;
        state.error = null;
      })
      .addCase(searchListing.fulfilled, (state, action) => {
        state.isSearchListing = false;
        state.searchedListingList = action.payload;
      })
      .addCase(searchListing.rejected, (state, action) => {
        state.isSearchedListing = false;
        state.isSearchListing = false;
        state.error = action.error.message;
      });
  }
});

export const { setListingOrder, setSearchListingParams } = listingSlice.actions;
export default listingSlice.reducer;
