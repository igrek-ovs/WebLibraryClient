import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import BookSlice, {removeBook, setBooks} from '../store/reducers/BookSlice'
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {Button} from "@mui/material";


export interface Book {
    id: number;
    title: string;
    genre: string;
    authorId: number;
    author: Author | null;
}

export interface Author {
    id: number;
    name: string;
    description: string;
    books: Book[];
}

interface BookDto extends Book {
    authorName: string;
}


const BookListComponent: React.FC = () => {
    const [books, setBooksLocal] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const dispatch = useAppDispatch();
    const booksRedux = useAppSelector((state: any) => state.bookReducer.books);


    useEffect(() => {
        const fetchPages = async () => {
            try {
                const response = await api.get(`/api/Book/GetNumberOfPages`);
                setTotalPages(response.data);
            } catch (error) {
                console.error('Error fetching pages:', error);
            }
        };

        fetchPages();
    }, [totalPages]);


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.get(`/api/Book/GetBooksOnPage/${currentPage}`);
                setBooksLocal(response.data);
                dispatch(setBooks(response.data));
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, [currentPage]);

    const deleteBook = async (bookId: number) => {
        try {
            if (!bookId) {
                console.error('Book ID is required');
                return;
            }

            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                console.error('User is not authenticated');
                return;
            }

            const headers = { Authorization: `Bearer ${authToken}` };

            await api.delete(`/api/Book/${bookId}`, { headers });

            dispatch(removeBook(bookId));


        } catch (error) {
            console.error('DeleteBook failed:', error);
        }
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const bookContainerStyle: React.CSSProperties = {
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
    };

    const linkStyle: React.CSSProperties = {
        margin: '5px',
        padding: '8px 15px',
        color: 'white',
        textDecoration: 'none',
        fontSize: '14px',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const updateLinkStyle: React.CSSProperties = {
        ...linkStyle,
        backgroundColor: 'green',
    };

    const deleteLinkStyle: React.CSSProperties = {
        ...linkStyle,
        backgroundColor: 'red',
    };

    const getLinkStyle: React.CSSProperties = {
        ...linkStyle,
        backgroundColor: 'blue',
    };

    const createLinkStyle: React.CSSProperties = {
        ...linkStyle,
        backgroundColor: 'gray',
    };

    return (
        <div>
            <h1>Book List</h1>
            <ul>
                {booksRedux.map((book: BookDto) => (
                    <li key={book.id}>
                        <div style={bookContainerStyle}>
                            <strong>{book.title}</strong>
                            <p>Genre: {book.genre}</p>
                            <p>Author: {book.authorName}</p>
                            <Link to={`/update-book/${book.id}`} style={updateLinkStyle}>
                                Update Book
                            </Link>
                            <Button onClick={() => deleteBook(book.id)} style={deleteLinkStyle}>
                                Delete Book
                            </Button>
                            <Link to={`/get-book/${book.id}`} style={getLinkStyle}>
                                Get Book by ID
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
            <Link to="/create-book" style={createLinkStyle}>
                Create New Book
            </Link>
            <div style={{ marginTop: '10px' }}>
                <span>Pages: </span>
                {[...Array(totalPages).keys()].map((pageNumber) => (
                    <Link
                        key={pageNumber + 1}
                        to={`#`}
                        style={{ margin: '5px', textDecoration: 'none' }}
                        onClick={() => handlePageChange(pageNumber + 1)}
                    >
                        {pageNumber + 1}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BookListComponent;
