import { Box, Button, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { BookDto } from "../../models";
import api from "../../services/api";
import { removeBook, setBooks } from "../../store/reducers/BookSlice";
import { bookContainerStyle, createLinkStyle, deleteLinkStyle, getLinkStyle, updateLinkStyle } from "./components";

const BookListComponent = () => {
    const [booksLocal, setBooksLocal] = useState<any[]>([]);
    const dispatch = useAppDispatch();
    const booksRedux = useAppSelector((state: any) => state.bookReducer.books);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.get('/api/Book');
                setBooksLocal(response.data);
                dispatch(setBooks(response.data));
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, [dispatch]);

    const deleteBook = async (bookId: number) => {
        try {
            if (!bookId) {
                console.error('Book ID is required');
                return;
            }

            const authToken = localStorage.getItem('accessToken');
            if (!authToken) {
                console.error('User is not authenticated');
                return;
            }

            const headers = {Authorization: `Bearer ${authToken}`};

            await api.delete(`/api/Book/${bookId}`, {headers});

            dispatch(removeBook(bookId));


        } catch (error) {
            console.error('DeleteBook failed:', error);
        }
    }

    return (
        <Box>
            <Typography variant="h2">Book List</Typography>
            <List>
                {booksRedux.map((book: BookDto) => (
                    <ListItem key={book.id} style={bookContainerStyle}>
                        <Box style={bookContainerStyle}>
                        <Typography variant="h6">{book.title}</Typography>
                        <Typography>Genre: {book.genre}</Typography>
                        <Typography>Author: {book.authorName}</Typography>
                        {book.imagePath ? (
                          <img src={book.imagePath} alt={`Image for ${book.title}`} style={{ maxWidth: '200px' }} />
                        ) : (
                          <Typography>No image</Typography>
                        )}
                        <Link to={`/update-book/${book.id}`} style={updateLinkStyle}>
                            Update Book
                        </Link>
                        <Button onClick={() => deleteBook(book.id)} style={deleteLinkStyle}>
                            Delete Book
                        </Button>
                            </Box>
                    </ListItem>
                ))}
            </List>
            <Link to="/create-book" style={createLinkStyle}>
                Create New Book
            </Link>
        </Box>
    );
}

export default BookListComponent;
