import { configureStore } from "@reduxjs/toolkit";
import dialogReducer from "./features/dialogSlice";
import crimeReducer from "./features/crimeSlice";

const store = configureStore({
    reducer: {
        dialog: dialogReducer.reducer,
        crimes: crimeReducer.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
