import { Box, Button, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import api from "../../services/api";
import { removeBook, setBooks } from "../../store/reducers/BookSlice";
import { decrementTotalPages, setCurrentPage, setTotalPages } from "../../store/reducers/PageSlice";
import { bookContainerStyle, createLinkStyle, deleteLinkStyle, updateLinkStyle } from "./components";

const BookListComponent: React.FC = () => {
    const [books, setBooksLocal] = useState<any[]>([]);
    const dispatch = useAppDispatch();
    const booksRedux = useAppSelector((state: any) => state.bookReducer.books);
    const pageRedux = useAppSelector((state: any) => state.pageReducer);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const response = await api.get(`/api/Book/GetNumberOfPages`);
                dispatch(setTotalPages(response.data));
            } catch (error) {
                console.error('Error fetching pages:', error);
            }
        };

        fetchPages();
    }, []);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.get(`/api/Book/GetBooksOnPage/${pageRedux.currentPage}`);
                setBooksLocal(response.data);
                dispatch(setBooks(response.data));
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, [pageRedux.currentPage]);

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

            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                console.error('Refresh token is missing');
                return;
            }

            const headers = { Authorization: `Bearer ${authToken}` };

            await api.delete(`/api/Book/${bookId}`, { headers });

            dispatch(removeBook(bookId));

            const isLastBookOnLastPage = booksRedux.length === 1 && pageRedux.currentPage === pageRedux.totalPages;
            const isLastPageEmpty = booksRedux.length === 0 && pageRedux.totalPages > 1;

            if (isLastBookOnLastPage || isLastPageEmpty) {
                dispatch(decrementTotalPages());
                dispatch(setCurrentPage(pageRedux.currentPage - 1));
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    const userId = localStorage.getItem('userId');
                    const refreshResponse = await api.post('/api/Auth/refresh', { userId: userId,
                        token: refreshToken });

                    localStorage.setItem('accessToken', refreshResponse.data);

                    await deleteBook(bookId);
                } catch (refreshError) {
                    localStorage.removeItem('userId');
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    console.error('Token refresh failed:', refreshError);
                    navigate('/login');
                }
            } else {
                console.error('DeleteBook failed:', error);
            }
        }
    };

    const handlePageChange = (pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber));
    };

    return (
        <Box>
            <Box>
                <Typography variant="h3">Book List</Typography>
                <List>
                    {booksRedux.map((book:any) => (
                      <ListItem key={book.id}>
                          <Box style={bookContainerStyle}>
                              <Typography variant="h5"><strong>{book.title}</strong></Typography>
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
            </Box>

            <Link to="/create-book" style={createLinkStyle}>
                Create New Book
            </Link>
            <Box style={{ marginTop: '10px' }}>
                <span>Pages: </span>
                {[...Array(pageRedux.totalPages).keys()].map((pageNumber) => (
                    <Link
                        key={pageNumber + 1}
                        to={`#`}
                        style={{ margin: '5px', textDecoration: 'none' }}
                        onClick={() => handlePageChange(pageNumber + 1)}
                    >
                        {pageNumber + 1}
                    </Link>
                ))}
            </Box>
        </Box>
    );
};

export default BookListComponent;
