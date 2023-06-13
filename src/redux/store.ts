"use client"

import { configureStore } from "@reduxjs/toolkit"
import sideBarReducer from "./Features/sideBarOpenSlice"
import sectionSelectedReducer from "./Features/sectionSelectedSlice"
import courseSelectedReducer  from "./Features/courseSelectedSlice"

export const store= configureStore({
    reducer: {
        sideBarOpen: sideBarReducer,
        sectionSelected: sectionSelectedReducer,
        courseSelected: courseSelectedReducer,
    }
})

export type RootState= ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch