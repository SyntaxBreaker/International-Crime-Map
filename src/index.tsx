import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import {
    createRoutesFromElements,
    RouterProvider,
    createBrowserRouter,
    Route,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { AddCrime } from "./components/AddCrime";
import { Homepage } from "./components/Homepage";
import { EditCrime } from "./components/EditCrime";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<Homepage />} />
            <Route path="addCrime" element={<AddCrime />} />
            <Route path="editCrime/:crimeId" element={<EditCrime />} />
        </Route>
    )
);

root.render(
    <Provider store={store}>
        <CssBaseline />
        <RouterProvider router={router} />
    </Provider>
);
