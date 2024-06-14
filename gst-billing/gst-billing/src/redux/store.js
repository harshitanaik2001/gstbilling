import { configureStore } from "@reduxjs/toolkit"
import AuthSlice from "./slice/AuthSlice"

const store = configureStore({
    preloadedState: {},
    reducer: {
        Auth: AuthSlice
    }
})

export default store