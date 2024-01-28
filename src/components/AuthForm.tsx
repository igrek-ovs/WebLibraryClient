import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import api from '../services/api';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface AuthPageProps {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const AuthForm: React.FC<AuthPageProps> = ({ setIsAuthenticated }) => {
    const [loginUser, setLoginUser] = useState({
        username: '',
        password: '',
    });

    const [redirectToBooks, setRedirectToBooks] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleLogin = async () => {
        try {
            const response = await api.post('api/Auth/login', loginUser);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken.token);
            localStorage.setItem('userId', response.data.refreshToken.userId);
            //console.log('Successfully logged in:', token);
            setIsAuthenticated(true);
            setRedirectToBooks(true);
        } catch (error) {
            console.error('Login failed:', error);
            setErrorSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setErrorSnackbarOpen(false);
    };

    if (redirectToBooks) {
        return <Navigate to="/books" />;
    }

    return (
        <div>
            <h1>Login</h1>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" value={loginUser.username} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={loginUser.password} onChange={handleChange} />
                </label>
                <br />
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
            <p>
                Or <Link to="/register">Register now</Link>
            </p>

            <Snackbar open={errorSnackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    Login failed. Please check your username and password.
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AuthForm;
