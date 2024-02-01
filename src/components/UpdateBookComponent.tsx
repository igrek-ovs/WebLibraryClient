import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const UpdateBookComponent: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const [bookToUpdate, setBookToUpdate] = useState({
        title: '',
        genre: '',
        authorId: 0,
        imagePath: '',
    });
    const [authors, setAuthors] = useState<any[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);

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
                        imagePath: bookDetailsFromServer.imagePath,
                    };

                    setBookToUpdate(bookDetails);
                }
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        const fetchAuthors = async () => {
            try {
                const response = await api.get('/api/Book/get-authors');
                setAuthors(response.data);
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        };

        fetchBookDetails();
        fetchAuthors();
    }, [bookId]);

    const handleUpdateBook = async () => {
        try {
            if (bookId && bookToUpdate.title && bookToUpdate.genre && bookToUpdate.authorId) {
                const formData = new FormData();
                formData.append('file', imageFile || '');

                const imageResponse = await api.post('/api/Book/upload-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const updatedBook = { ...bookToUpdate, imagePath: imageResponse.data };
                const response = await api.put(`/api/Book/${parseInt(bookId, 10)}`, updatedBook);

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
                Author:
                <select
                    value={bookToUpdate.authorId}
                    onChange={(e) => setBookToUpdate({ ...bookToUpdate, authorId: parseInt(e.target.value, 10) })}
                >
                    {authors.map((author) => (
                        <option key={author.id} value={author.id}>
                            {author.name}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Image:
                {bookToUpdate.imagePath ? (
                    <img src={bookToUpdate.imagePath} alt="Book Cover" style={{ maxWidth: '200px' }} />
                ) : (
                    <span>No Image</span>
                )}
                <input type="file" accept="image/*" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} />
            </label>
            <br />
            <button onClick={handleUpdateBook}>Update Book</button>
        </div>
    );
};

export default UpdateBookComponent;
