import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const BookListComponent: React.FC = () => {
    const [books, setBooks] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);


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
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, [currentPage]);

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
                {books.map((book) => (
                    <li key={book.id}>
                        <div style={bookContainerStyle}>
                            <strong>{book.title}</strong>
                            <p>Genre: {book.genre}</p>
                            <p>Author: {book.authorName}</p>
                            <Link to={`/update-book/${book.id}`} style={updateLinkStyle}>
                                Update Book
                            </Link>
                            <Link to={`/delete-book/${book.id}`} style={deleteLinkStyle}>
                                Delete Book
                            </Link>
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
