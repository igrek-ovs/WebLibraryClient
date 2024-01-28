import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const DeleteBookComponent: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const deleteBook = async () => {
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

                const headers = { Authorization: `Bearer ${authToken}` };

                const response = await api.delete(`/api/Book/${bookId}`, { headers });
                console.log('DeleteBook response:', response.data);

                navigate('/login');
            } catch (error) {
                console.error('DeleteBook failed:', error);
                // Здесь можно добавить логику обработки ошибок, например, вывод уведомления для пользователя
            }
        };

        // Вызов функции удаления книги только при монтировании компонента
        deleteBook();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookId]); // bookId добавлен в зависимости, чтобы вызывать useEffect только при изменении bookId

    return (
        <div>
            Deleting...
        </div>
    );
};

export default DeleteBookComponent;
