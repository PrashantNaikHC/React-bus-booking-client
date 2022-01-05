import { createAction, createSlice } from "@reduxjs/toolkit";
import { bookSeats } from "../lib/api";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    isLoading: false,
    data: null,
    error: "",
  },
  reducers: {
    startBooking(state, action) {
      state.isLoading = true;
      state.data = null;
      state.error = "";
    },
    bookingSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.error = "";
    },
    bookingError(state, action) {
      state.isLoading = false;
      state.data = "error";
      state.error = action.payload;
    },
  },
});

// async action creator for booking
export const bookSeatsAsync = (bookingDetails) => {
  return async (dispatch) => {
    dispatch(bookingActions.startBooking());
    try {
      console.log("ac", bookingDetails);
      const data = await bookSeats(bookingDetails);
      dispatch(bookingActions.bookingSuccess(data));
    } catch (error) {
      console.log('slice error',error);
      dispatch(bookingActions.bookingError(error));
    }
  };
};

export const bookingActions = bookingSlice.actions;

export default bookingSlice;
