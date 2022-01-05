import { configureStore } from "@reduxjs/toolkit";
import bookingSlice from "./booking-slice";

// this is the redux toolkit way of creating the store
const store = configureStore({
  reducer: {
    booking: bookingSlice.reducer,
  },
});

export default store;
