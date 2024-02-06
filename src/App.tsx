import React, {useEffect, useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import AuthPage from "./components/Auth/AuthForm";
import LogoutComponent from "./components/Auth/LogoutComponent";
import RegisterPage from "./components/Auth/RegisterForm";
import BookListComponent from "./components/Book/BookListComponent";
import CreateBookComponent from "./components/Book/CreateBookComponent";
import DeleteBookComponent from "./components/Book/DeleteBookComponent";
import GetBookByNameComponent from "./components/Book/GetBookByNameComponent";
import GetBooksOnDifPages from "./components/Book/PaginationBookListComponent";
import UpdateBookComponent from "./components/Book/UpdateBookComponent";
import {
    booksLinkStyle,
    booksWithPagesLinkStyle, commonStyle,
    containerStyle,
    linkStyle,
    loginLinkStyle,
    registerLinkStyle,
    userNameStyle,
} from "./styles";
import {TextField} from "@mui/material";
import api from "./services/api";

interface AppProps {
}

const App: React.FC<AppProps> = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('user');
    const [avatarPath, setAvatarPath] = useState<string | null>(null);
    useEffect(() => {
        const getUserName = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await api.get(`/api/Auth/get-user-name/${userId}`);
                setUsername(response.data);

                const avatarResponse = await api.get(`/api/Auth/get-user-avatar/${userId}`);
                setAvatarPath(avatarResponse.data);
            } catch (error) {
                console.log(error);
            }
        };
        const authToken = localStorage.getItem('accessToken');
        setIsAuthenticated(!!authToken);
        if (isAuthenticated) {
            getUserName();
        }
    }, [isAuthenticated]);

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const userId = localStorage.getItem('userId');

        if (userId && event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            console.log(formData);

            try {
                await api.delete(`/api/Auth/delete-user-avatar/${userId}`);

                const imageResponse = await api.post('/api/Book/upload-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(imageResponse.data);
                const imagePath = imageResponse.data;
                await api.post(`/api/Auth/add-avatar/${userId}`, imagePath);


                const avatarResponse = await api.get(`/api/Auth/get-user-avatar/${userId}`);
                setAvatarPath(avatarResponse.data);
            } catch (error) {
                console.error('Avatar upload failed:', error);
            }
        }
    };

    return (
        <div className="App" style={containerStyle}>
            <div style={commonStyle}>
                <p style={userNameStyle}>
                    {username}
                </p>
                {avatarPath ? (
                    <img src={avatarPath} alt="User Avatar" style={{maxWidth: '50px', borderRadius: '20%'}}/>
                ) : (
                    <img src="logo192.png" alt="Default Avatar" style={{maxWidth: '50px', borderRadius: '50%'}}/>
                )}
                <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{marginLeft: '10px'}}/>
            </div>
            <Link to="/register" style={registerLinkStyle}>
                Register
            </Link>
            <Link to="/login" style={loginLinkStyle}>
                Log In
            </Link>
            <Link to="/books" style={booksLinkStyle}>
                List of Books
            </Link>
            <Link to="/get-pages" style={booksWithPagesLinkStyle}>
                List of Books With Pages
            </Link>
            <Link to={`/get-book`} style={booksLinkStyle}>
                Get Book by NAME
            </Link>
            {isAuthenticated ? (
                <Link to="/logout" style={{...linkStyle, backgroundColor: 'purple'}}>
                    Logout
                </Link>
            ) : null}

            <Routes>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route
                    path="/login"
                    element={<AuthPage setIsAuthenticated={setIsAuthenticated}/>}
                />
                <Route path="/books" element={<BookListComponent/>}/>
                <Route path="/create-book" element={<CreateBookComponent/>}/>
                <Route path="/update-book/:bookId" element={<UpdateBookComponent/>}/>
                <Route path="/delete-book/:bookId" element={<DeleteBookComponent/>}/>
                <Route path="/get-book" element={<GetBookByNameComponent/>}/>
                <Route path="/get-pages" element={<GetBooksOnDifPages/>}/>
                <Route path="/logout" element={<LogoutComponent/>}/>
            </Routes>
        </div>
    );
};

export default App;
