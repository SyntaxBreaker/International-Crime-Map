import { createSlice } from "@reduxjs/toolkit";

export interface Crime {
    id: string;
    title: string;
    description: string;
    latitude: string;
    longitude: string;
}

export interface Crimes {
    crimeList: Crime[]
}

const initialState: Crimes = {
    crimeList: []
};

export const crimeSlice = createSlice({
    name: "crimes",
    initialState,
    reducers: {
        setCrimes: (state, action) => {
            state.crimeList = [];
            action.payload.forEach((crime: Crime) => {
                state.crimeList = [...state.crimeList, crime]
            });
        },
        remove: (state, action) => {
            const id = action.payload;
            state.crimeList.splice(state.crimeList.findIndex(crime => crime.id === id), 1);
        },
    },
});

export const { setCrimes, remove } = crimeSlice.actions;

export default crimeSlice;
