import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const UpdateBookComponent: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    console.log('BookID', bookId);
    const [bookToUpdate, setBookToUpdate] = useState({
        title: '',
        genre: '',
        authorId: 0,
    });

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                if (bookId) {
                    const response = await api.get(`/api/Book/${parseInt(bookId, 10)}`);
                    const bookDetailsFromServer = response.data;

                    const bookDetails = {
                        id: bookDetailsFromServer.id,
                        title: bookDetailsFromServer.title,
                        genre: bookDetailsFromServer.genre,
                        authorId: bookDetailsFromServer.authorId,
                    };

                    setBookToUpdate(bookDetails);
                }
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [bookId]);

    const handleUpdateBook = async () => {
        try {
            if (bookId && bookToUpdate.title && bookToUpdate.genre && bookToUpdate.authorId) {

                console.log('Updating with data:', bookToUpdate);
                const response = await api.put(`/api/Book/${parseInt(bookId, 10)}`, bookToUpdate);
                console.log('UpdateBook response:', response.data);
            } else {
                console.error('UpdateBook failed: Invalid data');
            }
        } catch (error) {
            console.error('UpdateBook failed:', error);
        }
    };

    return (
        <div>
            <h1>Update Book</h1>
            <label>
                Title:
                <input
                    type="text"
                    value={bookToUpdate.title}
                    onChange={(e) => setBookToUpdate({ ...bookToUpdate, title: e.target.value })}
                />
            </label>
            <br />
            <label>
                Genre:
                <input
                    type="text"
                    value={bookToUpdate.genre}
                    onChange={(e) => setBookToUpdate({ ...bookToUpdate, genre: e.target.value })}
                />
            </label>
            <br />
            <label>
                Author ID:
                <input
                    type="number"
                    value={bookToUpdate.authorId || 0}
                    onChange={(e) => setBookToUpdate({ ...bookToUpdate, authorId: parseInt(e.target.value, 10) })}
                />
            </label>
            <br />
            <button onClick={handleUpdateBook}>Update Book</button>
        </div>
    );
};

export default UpdateBookComponent;
