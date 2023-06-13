"use client"

import { createSlice } from "@reduxjs/toolkit"

export interface SideBarState {
    value: boolean
}

const initialState: SideBarState = {
    value: true
}

export const sideBarSlice= createSlice({
    name: "sideBarOpen",
    initialState,
    reducers: {
        change: (state) => { state.value= !state.value },
    }
})

export const { change }= sideBarSlice.actions

export default sideBarSlice.reducer