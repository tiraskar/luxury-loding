import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../config/baseurl";
import { formateDate } from "../../helper/date";
import { toast } from "react-toastify";

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
  async (listing, { getState, rejectWithValue }) => {
    try {
      const { listingLimit, listingPage, listingOrder } = getState().listing;
      const response = await axios.get(`${baseUrl}/listing?limit=${listingLimit}&page=${listingPage}&priceOrder=${listingOrder}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
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
      const { listingOrder, searchListingParams, isFilterApply } = getState().listing

      const searchData = {
        location: searchListingParams.location.length > 0 ? searchListingParams.location : "",
        checkIn: formateDate(searchListingParams.checkIn),
        checkOut: formateDate(searchListingParams.checkOut),
        guests: searchListingParams.guests || "",
        priceOrder: listingOrder,
        bedrooms: isFilterApply ? (searchListingParams.bedrooms) : "",
        roomType: isFilterApply ? (searchListingParams.roomType) : "",
        minPrice: isFilterApply ? (searchListingParams.minPrice) : "",
        maxPrice: isFilterApply ? searchListingParams.maxPrice : "",
        amenities: isFilterApply ? (searchListingParams.amenities.length > 1 ? searchListingParams.amenities : "") : ""
      };
      const { data } = await axios.post(`${baseUrl}/listing/searchlistings`, {
        ...searchData
      });

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
  async (listing, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/listing?limit=${listing.limit}&page=1&priceOrder=`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchListingTotalCount = createAsyncThunk(
  'listing/count',
  async (listing, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/listing/count`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const searchListing = createAsyncThunk(
  'listing/search',
  async (listing, { getState }) => {
    try {
      const { searchListingParams } = getState().listing;

      const searchData = {
        location: searchListingParams.location.length > 0 ? searchListingParams.location : '',
        checkIn: formateDate(searchListingParams.checkIn),
        checkOut: formateDate(searchListingParams.checkOut),
        guests: searchListingParams.guests || "",
        priceOrder: "",
        bedrooms: "",
        roomType: "",
        minPrice: "",
        maxPrice: "",
        amenities: ""
      };
      const { data } = await axios.post(`${baseUrl}/listing/searchlistings`, {
        ...searchData
      });

      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
)

export const fetchFeaturedListing = createAsyncThunk(
  'listing/featured',
  async (listing, { getState }) => {
    try {
      const { listingOrder } = getState().listing;
      const { data } = await axios.get(`${baseUrl}/listing?limit=${5}&page=1&priceOrder=${listingOrder}`);
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchListingReviews = createAsyncThunk(
  'listing/reviews',
  async (listingId) => {
    try {
      const query = new URLSearchParams({
        listingId: listingId,
        type: 'guest-to-host'
      });

      const { data } = await axios.get(`${baseUrl}/review/getreviews?${query}`);
      return data;

    } catch (error) {
      return Promise.reject(error.message);
    }
  }
)

export const fetchCountryList = createAsyncThunk(
  'listing/country',
  async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/listing/getcountries`);
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
)

export const fetchAmenitiesList = createAsyncThunk(
  'listing/amenities', async (listing, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/listing/amenities`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const saveListingReview = createAsyncThunk(
  'listing/review/save', async (review, { getState, rejectWithValue }) => {
    try {
      const { listingInfo } = getState().listing;
      const response = await axios.post(`${baseUrl}/review`, {
        listingId: listingInfo.id,
        review: review
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const fetchListingAvailabilityCalender = createAsyncThunk(
  'listing/available-date', async (listing, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/listing/getcalendar/${listing.id}?startDate=${listing.startDate}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const fetchListingLocationList = createAsyncThunk(
  'listing/location', async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/listing/getlocationlist`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
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
    isHomePageSearch: false,
    isMapViewOpen: true,
    isSearchedListing: false,
    isListingAvailableForBooking: false,
    isReviewLoading: false, 
    isFilterApply: false,
    isFetchingAmenities: false,
    isFilterOpen: false,
    isSearchOnSingleListing: false,
    isReviewSaving: false,
    isReviewSent: false,
    isCalenderLoading: false,
    isHomePageLoading: false,
    isFeaturedSearched: false,
    isAllAmenitiesOpen: false,
    isSearchHomePageOpen: false,
    //error
    error: null,

    //array
    listingList: [],
    otherListings: [],
    availableListing: [],
    searchedListingList: [],
    featuredListings: [], 
    listingReviews: [],
    countryList: [],
    amenitiesList: [],
    listingAvailableCalender: [],
    listingLocationList: [],
    listingUnavailableCalender: [],
    listingCheckOutAvailableDate: [],
    //object
    listingInfo: {},

    //state values
    listingLimit: 8,
    listingPage: 1,
    listingTotalCount: 0,
    // minDate: new Date(),
    listingOrder: 'high-to-low',

    //form
    searchListingParams: {
      location: [],
      checkIn: '',
      checkOut: '',
      guests: '',
      bedrooms: '',
      roomType: '',
      minPrice: 50,
      maxPrice: 550,
      amenities: [],
      rooms: '',
      lat: 0,
      lng: 0
    },

  },

  reducers: {
    toggleMapView: (state, action) => {
      state.isMapViewOpen = action.payload;
    },
    setListingOrder: (state, action) => {
      state.listingPage = 1;
      state.listingLimit = 8;
      state.listingOrder = action.payload;
    },

    toggleIsSearchedOnSingleListing: (state, action) => {
      state.isSearchOnSingleListing = action.payload;
    },

    toggleIsSearchHomePageOpen: (state) => {
      state.isSearchHomePageOpen = !state.isSearchHomePageOpen;
    },

    setSearchListingParamsToInitialState: (state) => {
      state.searchListingParams.checkIn = '';
      state.searchListingParams.checkOut = '';
      state.searchListingParams.guests = '';
      state.searchListingParams.location = '';
      state.listingPage = 1;
      state.listingOrder = 'high-to-low';
      state.searchListingParams.minPrice = 50;
      state.searchListingParams.maxPrice = 550;
      state.searchListingParams.amenities = [];
      state.searchListingParams.bedrooms = '';
      state.searchListingParams.roomType = '';
      state.searchListingParams.rooms = '';
      state.isFilterApply = false;
      state.isHomePageSearch = false;
      state.searchListingParams.lng = 0;
      state.searchListingParams.lat = 0;

    },

    setArraysToInitialStateInPageChnage: (state) => {
      state.availableListing = [];
      state.listingList = [];
    },

    toggleApplyFilter: (state, action) => {
      const { minValue, maxValue } = action.payload;
      state.searchListingParams.minPrice = minValue;
      state.searchListingParams.maxPrice = maxValue;
      state.isFilterApply = true;
    },

    toggleFilterOpen: (state) => {
      state.isFilterOpen = !state.isFilterOpen;
    },

    clearSearchCheckInCheckOutDate: (state) => {
      state.searchListingParams.checkIn = '';
      state.searchListingParams.checkOut = '';
    },

    setSearchListingParams: (state, action) => {
      const { name, value } = action.payload;
      if (name === 'guests') {
        const numericValue = Math.min(Math.max(parseInt(value, 10), 0), 50);
        state.searchListingParams[name] = numericValue;
      } else {
        state.searchListingParams[name] = value;
      }
    },

    setAmenitiesListingParams: (state, action) => {
      const item = action.payload;
      const isItemPresent = state.searchListingParams.amenities.includes(item);

      if (isItemPresent) {
        state.searchListingParams.amenities = state.searchListingParams.amenities.filter(a => a !== item);
      } else {
        state.searchListingParams.amenities = [...state.searchListingParams.amenities, item];
      }
    },

    toggleAllAmenitiesOpen: (state) => {
      state.isAllAmenitiesOpen = !state.isAllAmenitiesOpen;
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
        state.isHomePageSearch = false;
        state.availableListing = [];
        state.searchedListingList = [];
      })
      .addCase(fetchListingList.fulfilled, (state, action) => {
        state.isFetchListing = false;
        state.listingList = action.payload;
      })
      .addCase(fetchListingList.rejected, (state, action) => {
        state.isFetchListing = false;
        state.error = action.payload;
      });

    // Fetch Listing Info
    builder
      .addCase(fetchListingInfo.pending, (state) => {
        state.isFetchListingInfo = true;
        state.error = null;
        state.listingReviews = []
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
        state.isSearchOnSingleListing = true;
        state.error = null;
        state.searchedListingList = [];
        state.isHomePageSearch = false;
        state.listingList = [];
        state.searchedListingList = [];
        state.searchListingParams.lng = 0;
        state.searchListingParams.lat = 0;
      })
      .addCase(fetchAvailableListing.fulfilled, (state, action) => {
        state.isFetchAvailableListing = false;
        state.availableListing = action.payload;
      })
      .addCase(fetchAvailableListing.rejected, (state, action) => {
        state.isSearchedListing = false;
        state.isSearchOnSingleListing = false;
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
        state.error = action.payload;
      });

    //search listings 
    builder
      .addCase(searchListing.pending, (state) => {
        state.searchedListingList = [];
        state.isHomePageLoading = true;
        state.isHomePageSearch = true;
        state.error = null;
      })
      .addCase(searchListing.fulfilled, (state, action) => {
        state.isHomePageLoading = false;
        state.isSearchHomePageOpen = false;
        state.searchedListingList = action.payload;
      })
      .addCase(searchListing.rejected, (state, action) => {
        state.isSearchedListing = false;
        state.isHomePageSearch = false;
        state.error = action.error.message;
      });

    //featured listings
    builder
      .addCase(fetchFeaturedListing.pending, (state) => {
        state.isFeaturedSearched = true;
        state.featuredListings = [];
        state.error = null;
      })
      .addCase(fetchFeaturedListing.fulfilled, (state, action) => {
        state.isFeaturedSearched = false;
        state.featuredListings = action.payload;
      })
      .addCase(fetchFeaturedListing.rejected, (state, action) => {
        state.isFeaturedSearched = false;
        state.error = action.error.message;
      });

    //fetch listing reviews 
    builder
      .addCase(fetchListingReviews.pending, (state) => {
        state.isReviewLoading = true;
        state.error = null;
      })
      .addCase(fetchListingReviews.fulfilled, (state, action) => {
        state.isReviewLoading = false;
        state.listingReviews = action.payload;
      })
      .addCase(fetchListingReviews.rejected, (state, action) => {
        state.isReviewLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchCountryList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountryList.fulfilled, (state, action) => {
        state.loading = false;
        state.countryList = action.payload;
      })
      .addCase(fetchCountryList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    //fetch amenities list 
    builder
      .addCase(fetchAmenitiesList.pending, (state) => {
        state.isFetchingAmenities = true;
        state.error = null;
      })
      .addCase(fetchAmenitiesList.fulfilled, (state, action) => {
        state.isFetchingAmenities = false;
        state.amenitiesList = action.payload;
      })
      .addCase(fetchAmenitiesList.rejected, (state, action) => {
        state.isFetchingAmenities = false;
        state.error = action.payload;
      });

    //save listing review

    builder
      .addCase(saveListingReview.pending, (state) => {
        state.isReviewSaving = true;
        state.isReviewSent = false;
        state.error = null;
      })
      .addCase(saveListingReview.fulfilled, (state) => {
        state.isReviewSaving = false;
        state.isReviewSent = true;
        toast.success("Your review has been submitted successfully. Thank you for your feedback.");
      })
      .addCase(saveListingReview.rejected, (state, action) => {
        state.isReviewSaving = false;
        state.isReviewSent = false;
        state.error = action.payload;
      });

    //fetch listing available calender

    builder
      .addCase(fetchListingAvailabilityCalender.pending, (state) => {
        state.isCalenderLoading = true;
        state.error = null;
      })
      .addCase(fetchListingAvailabilityCalender.fulfilled, (state, action) => {
        state.isCalenderLoading = false;
        const availableDate = action.payload.filter(item => item.isAvailable === 1)
          .map(item => new Date(item.date));
        const unAvailableDate = action.payload.filter(item => item.isAvailable === 0)
          .map(item => new Date(item.date));

        const availableCheckOutDate = unAvailableDate.filter(unavailDate =>
          availableDate.some(availDate =>
            availDate.getTime() === new Date(unavailDate.getTime() - 86400000).getTime()
          ));

        const unAvailableDateForBooking = action.payload
          .filter(item => item.isAvailable === 0)
          .map(item => new Date(item.date))
          .filter(unavailDate =>
            !availableDate.some(availDate =>
              availDate.getTime() === new Date(unavailDate.getTime() - 86400000).getTime()
            )
          );

        state.listingUnavailableCalender = unAvailableDateForBooking;
        state.listingAvailableCalender = availableDate;
        state.listingCheckOutAvailableDate = availableCheckOutDate;

      })
      .addCase(fetchListingAvailabilityCalender.rejected, (state, action) => {
        state.isCalenderLoading = false;
        state.error = action.payload;
      });

    //fetch listing location list 

    builder
      .addCase(fetchListingLocationList.pending, (state) => {
        state.isLocationLoading = true;
        state.error = null;
      })
      .addCase(fetchListingLocationList.fulfilled, (state, action) => {
        state.isLocationLoading = false;
        state.listingLocationList = action.payload;
      })
      .addCase(fetchListingLocationList.rejected, (state, action) => {
        state.isLocationLoading = false;
        state.error = action.payload;
      });

  }
});

export const { setListingOrder, setSearchListingParams, setSearchListingParamsToInitialState, toggleApplyFilter, toggleFilterOpen, setAmenitiesListingParams, toggleIsSearchedOnSingleListing, setArraysToInitialStateInPageChnage, toggleAllAmenitiesOpen, toggleIsSearchHomePageOpen, clearSearchCheckInCheckOutDate, toggleMapView } = listingSlice.actions;

export default listingSlice.reducer;
