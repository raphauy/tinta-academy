"use client"

import { createSlice } from "@reduxjs/toolkit"

export interface SectionSelected {
    courseId: string
    moduleKey: string
    sectionKey: string
}

const initialState: SectionSelected= {
    courseId: "",
    moduleKey: "",
    sectionKey: ""
}

export const sectionSelectedSlice= createSlice({
    name: "sectionSelected",
    initialState,
    reducers: {
        setCourseId: (state, action) => { state.courseId= action.payload },
        setModuleKey: (state, action) => { state.moduleKey= action.payload },
        setSectionKey: (state, action) => { state.sectionKey= action.payload },
    }
})

export const { setCourseId, setModuleKey, setSectionKey }= sectionSelectedSlice.actions

export default sectionSelectedSlice.reducer