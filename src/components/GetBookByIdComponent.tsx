import React, { useState } from 'react';
import api from '../services/api';

const GetBookByIdComponent: React.FC = () => {
    const [bookId, setBookId] = useState<number | undefined>(undefined);
    const [book, setBook] = useState<any | null>(null);

    const handleGetBookById = async () => {
        try {
            if (!bookId) {
                console.error('Book ID is required');
                return;
            }

            const response = await api.get(`/api/Book/${bookId}`);
            console.log('GetBookById response:', response.data);

            setBook(response.data);
        } catch (error) {
            console.error('GetBookById failed:', error);
        }
    };

    return (
        <div>
            <h1>Get Book By ID</h1>
            <label>
                Book ID:
                <input
                    type="number"
                    value={bookId || ''}
                    onChange={(e) => setBookId(Number(e.target.value))}
                />
            </label>
            <br />
            <button onClick={handleGetBookById}>Get Book By ID</button>

            {book && (
                <div>
                    <h2>Book Details</h2>
                    <p>ID: {book.id}</p>
                    <p>Title: {book.title}</p>
                    <p>Genre: {book.genre}</p>
                    <p>Author: {book.author ? book.author.name : 'Unknown Author'}</p>
                </div>
            )}
        </div>
    );
};

export default GetBookByIdComponent;