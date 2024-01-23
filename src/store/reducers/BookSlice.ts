import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface Author {
    id: number;
    name: string;
    description: string;
    books: Book[];
}

interface Book {
    id: number;
    title: string;
    genre: string;
    authorId: number;
    author: Author | null;
}

interface BookDto extends Book {
    authorName: string;
}
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
        // ... другие редукторы
    },
});
export const { setBooks} = bookSlice.actions;
export default bookSlice.reducer;