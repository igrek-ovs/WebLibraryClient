import React, { useState } from 'react';
import api from "../../services/api";
import {BookDto} from "../../models";
import {bookContainerStyle} from "./components";

const GetBookByIdComponent: React.FC = () => {
    const [books, setBooks] = useState<any | null>(null);

    const handleGetBookByName = async (book: string) => {
        try {
            const response = await api.get(`/api/Book/get-book-by-name/${book}`);
            setBooks(response.data);
        } catch (error) {
        }
    };
    const handleSearchTermChange = async (event: any) => {
        setTimeout(() => {
            handleGetBookByName(event.target.value);
        }, 100);
    };

    return (
        <div>
            <h1>Get Book By ID</h1>
            <label>
                Book NAME:
                <input
                    type="text"
                    onChange={handleSearchTermChange}
                />
            </label>
            <br/>
            <ul>
                {books ? (
                    books?.map((book: BookDto) => (
                        <li key={book.id} style={bookContainerStyle}>
                            <strong>{book.title}</strong>
                            <p>Genre: {book.genre}</p>
                            <p>Author: {book.authorName}</p>
                            {book.imagePath ? (
                                <img src={book.imagePath} alt={"Image for ${book.title}"} style={{maxWidth: '200px'}}/>
                            ) : (
                                <p>No image</p>
                            )}
                        </li>
                    ))
                ):(
                    <p>No books </p>
                )}
            </ul>
        </div>
    );
};

export default GetBookByIdComponent;