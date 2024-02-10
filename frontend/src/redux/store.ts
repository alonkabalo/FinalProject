import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { spotifySearchSlice } from "./spotifySearchSlice";
import { adminSlice } from "./adminSlice";



export const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer,
        adminSlice: adminSlice.reducer,
        spotifySearchSlice: spotifySearchSlice.reducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
