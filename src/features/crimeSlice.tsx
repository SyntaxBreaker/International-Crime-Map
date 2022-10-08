import { createSlice } from "@reduxjs/toolkit";

export interface Crimes {
    id?: string;
    title?: string;
    description?: string;
    location?: string;
}

const initialState: Crimes[] = [];

export const crimeSlice = createSlice({
    name: "crimes",
    initialState,
    reducers: {
        setCrimes: (state, action) => {
            state.length = 0;
            action.payload.forEach((crime: Crimes) => {
                state.push(crime);
            });
        },
        remove: (state, action) => {
            const id = action.payload;
            state = state.filter((crime) => crime.id !== id);
        },
    },
});

export const { setCrimes, remove } = crimeSlice.actions;

export default crimeSlice;
