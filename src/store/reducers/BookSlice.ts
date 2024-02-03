import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookDto } from "../../models";

interface BookState {
    books: BookDto[];
    isLoading: boolean;
    error: string;
}

const initialState: BookState = {
    books: [],
    isLoading: false,
    error: ''
}

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setBooks: (state, action: PayloadAction<BookDto[]>) => {
            state.books = action.payload;
        },
        removeBook: (state, action: PayloadAction<number>) => {
            state.books = state.books.filter(book => book.id !== action.payload);
        }
    },
});

export const { removeBook, setBooks} = bookSlice.actions;

export default bookSlice.reducer;