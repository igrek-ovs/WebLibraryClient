import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageState {
    currentPage: number;
    totalPages: number;
}

const initialState: PageState = {
    currentPage: 1,
    totalPages: 1,
};

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
        decrementTotalPages: (state) => {
            state.totalPages = Math.max(state.totalPages - 1, 1);
        },
    },
});

export const { setCurrentPage, setTotalPages, decrementTotalPages } = pageSlice.actions;

export default pageSlice.reducer;