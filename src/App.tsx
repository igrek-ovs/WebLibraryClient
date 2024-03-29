import React, {useEffect, useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import AuthPage from "./components/Auth/AuthForm";
import LogoutComponent from "./components/Auth/LogoutComponent";
import RegisterPage from "./components/Auth/RegisterForm";
import CreateBookComponent from "./components/Book/CreateBookComponent";
import DeleteBookComponent from "./components/Book/DeleteBookComponent";
import GetBookByNameComponent from "./components/Book/GetBookByNameComponent";
import GetBooksOnDifPages from "./components/Book/PaginationBookListComponent";
import UpdateBookComponent from "./components/Book/UpdateBookComponent";
import BookCommentsComponent from "./components/Book/BookCommentsComponent";
import StripePaymentComponent from "./components/Auth/StripePaymentComponent";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {AppBar, Toolbar} from "@mui/material"; // Добавлены компоненты для навбара
import api from "./services/api";
import {avatarStyle, commonStyle, containerStyle, inputLabelHoverStyle, linkStyle, userNameStyle,} from "./styles";

const stripePromise = loadStripe(
    "pk_test_51OigUNE8ymFyMa1QLWG6BzRzddxwPKYY26sWaEnA52imRxytlbOB4Edd6tOBa5RehKeHhDcYV8tybSx0hL6VYZgI00ZOJUyex4"
);

interface AppProps {}

const App: React.FC<AppProps> = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("user");
    const [avatarPath, setAvatarPath] = useState<string | null>(null);

    useEffect(() => {
        const getUserName = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const response = await api.get(`/api/Auth/get-user-name/${userId}`);
                setUsername(response.data);

                const avatarResponse = await api.get(
                    `/api/Auth/get-user-avatar/${userId}`
                );
                setAvatarPath(avatarResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        const authToken = localStorage.getItem("accessToken");
        setIsAuthenticated(!!authToken);
        if (isAuthenticated) {
            getUserName();
        }
    }, [isAuthenticated]);

    const handleAvatarUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const userId = localStorage.getItem("userId");

        if (userId && event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append("file", file);
            console.log(formData);

            try {
                await api.delete(`/api/Auth/delete-user-avatar/${userId}`);

                const imageResponse = await api.post(
                    "/api/Book/upload-image",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log(imageResponse.data);
                const imagePath = imageResponse.data;
                await api.post(`/api/Auth/add-avatar/${userId}`, imagePath);

                const avatarResponse = await api.get(
                    `/api/Auth/get-user-avatar/${userId}`
                );
                setAvatarPath(avatarResponse.data);
            } catch (error) {
                console.error("Avatar upload failed:", error);
            }
        }
    };

    const options = {
        // passing the client secret obtained from the server
        clientSecret:
            "sk_test_51OigUNE8ymFyMa1Qfq2bOob0RIRGBx4g0ROqM5WNxrwW38z7Bm9pPQK13F7hMFndGCLSGoQA2nG9RdqLYIGu5MM100bU4PBA9L",
    };

    return (
        <div className="App" style={containerStyle}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/get-pages" style={linkStyle} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#000080'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; }}>
                        List of Books With Pages
                    </Link>
                    <Link to="/payment" style={linkStyle} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#000080'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; }}>
                        Payment
                    </Link>
                    <Link to="/get-book" style={linkStyle} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#000080'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; }}>
                        Get Book by NAME
                    </Link>
                    {!isAuthenticated ? (
                        <>
                            <Link to="/register" style={linkStyle} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#000080'; }}
                                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; }}>
                                Register
                            </Link>
                            <Link to="/login" style={linkStyle} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#000080'; }}
                                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; }}>
                                Log In
                            </Link>
                        </>
                    ) : null}
                    {isAuthenticated ? (
                        <Link to="/logout" style={linkStyle} onClick={() => setIsAuthenticated(false)} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#000080'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; }}>
                            Logout
                        </Link>
                    ) : null}

                </Toolbar>
            </AppBar>

            {isAuthenticated && (
                <div style={commonStyle}>
                    <p style={userNameStyle}>{username}</p>
                    {avatarPath && (
                        <img
                            src={avatarPath}
                            alt="User Avatar"
                            style={avatarStyle}
                        />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        style={inputLabelHoverStyle}
                    />
                </div>
            )}

            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/login"
                    element={<AuthPage setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route path="/create-book" element={<CreateBookComponent />} />
                <Route path="/update-book/:bookId" element={<UpdateBookComponent />} />
                <Route path="/delete-book/:bookId" element={<DeleteBookComponent />} />
                <Route path="/get-book" element={<GetBookByNameComponent />} />
                <Route path="/get-pages" element={<GetBooksOnDifPages />} />
                <Route path="/logout" element={<LogoutComponent />} />
                <Route path="/comments/:bookId" element={<BookCommentsComponent />} />
                <Route
                    path="/payment"
                    element={
                        <Elements stripe={stripePromise}>
                            <StripePaymentComponent />
                        </Elements>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
