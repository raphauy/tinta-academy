"use client"

import { DataCourse } from "@/types/dataTypes"
import { createSlice } from "@reduxjs/toolkit"

export interface CourseSelected {
    value: DataCourse
}

const initialState: CourseSelected= {
    value: {
        id: "",
        title: "",
        slug: "",
        thumbnail: "",
        shortContent: "",
        longContent: "",
        userId: ""
    }
}

export const courseSelectedSlice= createSlice({
    name: "courseSelected",
    initialState,
    reducers: {
        set: (state, action) => { state.value= action.payload }
    }
})

export const { set }= courseSelectedSlice.actions

export default courseSelectedSlice.reducer