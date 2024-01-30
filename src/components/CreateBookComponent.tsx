import React, { useState, useRef } from 'react';
import api from '../services/api';

const CreateBookComponent: React.FC = () => {
    const [newBook, setNewBook] = useState({
        title: '',
        genre: '',
        authorId: 0,
        image: '',
    });

    // Создайте реф для элемента input типа "file"
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleCreateBook = async () => {
        try {
            // Проверяем, что файл загружен перед отправкой запроса
            if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
                // Создаем книгу без изображения
                const response = await api.post('/api/Book', {
                    title: newBook.title,
                    genre: newBook.genre,
                    authorId: newBook.authorId,
                });
                console.log('ended resp');
                // Загружаем изображение в BlobStorage
                const formData = new FormData();
                formData.append('file', fileInputRef.current.files[0]);

                const imageResponse = await api.post('/api/Book/upload-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const updatedBook = {
                    ...newBook,
                    imagePath: imageResponse.data,
                    id: response.data.id,
                };
                // Обновляем книгу с новым путем к изображению
                await api.put(`/api/Book/${response.data.id}`, updatedBook);

                console.log('CreateBook response:', response.data);

                setNewBook({
                    title: '',
                    genre: '',
                    authorId: 0,
                    image: '',
                });
            } else {
                console.error('No file selected');
            }
        } catch (error) {
            console.error('CreateBook failed:', error);
        }
    };

    const handleImageChange = () => {
        // Обработчик события для изменения изображения, если это необходимо
    };

    return (
        <div>
            <h1>Create Book</h1>
            {/* Привяжите реф к элементу input типа "file" */}
            <label>
                Image:
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </label>
            <br />
            {/* Остальные поля остаются неизменными */}
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
