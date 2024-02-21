import React, {useEffect} from "react";

const LogoutComponent: React.FC = () => {
    useEffect(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        window.location.href = '/login';
    }, []);

    return <div>Logging out...</div>;
};

export default LogoutComponent;