import { createSlice } from "@reduxjs/toolkit";

const userBookingsSlice = createSlice({
    name: "userBookings",
    initialState: {
        userBookings: []
    },
    reducers: {
        addToBookings(state, action) {
            state.userBookings = action.payload
        }
    }
});

export const userBookingActions =  userBookingsSlice.actions;

export default userBookingsSlice;