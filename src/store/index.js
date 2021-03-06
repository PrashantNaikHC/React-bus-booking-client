import { configureStore } from "@reduxjs/toolkit";
import bookingSlice from "./booking-slice";
import userBookingsSlice from "./user-bookings-slice";

// this is the redux toolkit way of creating the store
const store = configureStore({
  reducer: {
    booking: bookingSlice.reducer,
    userBookings: userBookingsSlice.reducer
  },
});

export default store;
