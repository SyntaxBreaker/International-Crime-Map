import { createSlice } from "@reduxjs/toolkit";

export interface DialogState {
    isOpen: boolean;
}

const initialState: DialogState = {
    isOpen: false,
};

export const dialogSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        setIsOpen: (state) => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { setIsOpen } = dialogSlice.actions;

export default dialogSlice;
