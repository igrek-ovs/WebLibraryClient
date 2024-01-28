import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';



const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
const RegisterForm: React.FC = () => {
    const [registerUser, setRegisterUser] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterUser((prevUser) => ({ ...prevUser, [name]: value }));
    };



    const handleRegister = async () => {
        try {
            await api.post('api/Auth/register', registerUser);

            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            setErrorSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setErrorSnackbarOpen(false);
    };

    return (
        <div>
            <h1>Register</h1>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" value={registerUser.username} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={registerUser.password} onChange={handleChange} />
                </label>
                <br />
                <button type="button" onClick={handleRegister}>
                    Register
                </button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login now</Link>
            </p>

            <Snackbar open={errorSnackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    Registration failed. Please check your login and password: password example "pAssw0rd@".
                </Alert>
            </Snackbar>
        </div>
    );
};

export default RegisterForm;
