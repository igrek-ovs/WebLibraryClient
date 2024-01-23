import React, { useEffect } from 'react';

const LogoutComponent: React.FC = () => {
    useEffect(() => {
        // Очистка токена и перенаправление пользователя после выхода
        localStorage.removeItem('authToken');
        // Замените '/login' на ваш путь для входа
        window.location.href = '/login';
    }, []);

    return <div>Logging out...</div>;
};

export default LogoutComponent;