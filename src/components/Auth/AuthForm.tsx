import MuiAlert, {AlertProps} from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import api from "../../services/api";
import {AuthPageProps} from "./types";
import {formContainerStyle, inputStyle, registerBbuttonStyle} from "../../styles";

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

    const handleMouseLeave = (e:any) => {
        e.target.style.backgroundColor = "#2196f3";
    };

    const handleMouseEnter = (e:any) => {
        e.target.style.backgroundColor = "#0d47a1";
    };

    return (
        <div style={formContainerStyle}>
            <h1>Login</h1>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" value={loginUser.username} onChange={handleChange} style={inputStyle}/>
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={loginUser.password} onChange={handleChange} style={inputStyle}/>
                </label>
                <br />
                <button type="button" onClick={handleLogin} style={registerBbuttonStyle} onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
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
