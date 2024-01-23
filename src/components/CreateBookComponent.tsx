import React, { useState } from 'react';
import api from '../services/api';

const CreateBookComponent: React.FC = () => {
    const [newBook, setNewBook] = useState({
        title: '',
        genre: '',
        authorId: 0,
    });

    const handleCreateBook = async () => {
        try {
            const response = await api.post('/api/Book', newBook);
            console.log('CreateBook response:', response.data);

            setNewBook({
                title: '',
                genre: '',
                authorId: 0,
            });
        } catch (error) {
            console.error('CreateBook failed:', error);
        }
    };

    return (
        <div>
            <h1>Create Book</h1>
            <label>
                Title:
                <input
                    type="text"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                />
            </label>
            <br />
            <label>
                Genre:
                <input
                    type="text"
                    value={newBook.genre}
                    onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                />
            </label>
            <br />
            <label>
                Author ID:
                <input
                    type="number"
                    value={newBook.authorId || ''}
                    onChange={(e) => setNewBook({ ...newBook, authorId: Number(e.target.value) })}
                />
            </label>
            <br />
            <button onClick={handleCreateBook}>Create Book</button>
        </div>
    );
};

export default CreateBookComponent;