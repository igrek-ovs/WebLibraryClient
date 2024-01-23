import React, {useEffect, useState} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AuthPage from './components/AuthForm';
import RegisterPage from './components/RegisterForm';
import BookListComponent from './components/BookListComponent';
import CreateBookComponent from './components/CreateBookComponent';
import UpdateBookComponent from './components/UpdateBookComponent';
import DeleteBookComponent from './components/DeleteBookComponent';
import GetBookByIdComponent from './components/GetBookByIdComponent';
import GetBooksOnDifPages from './components/PaginationBookListComponent'
import LogoutComponent from './components/LogoutComponent'
interface AppProps {}

const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
};

const linkStyle: React.CSSProperties = {
    margin: '10px',
    padding: '10px 20px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    borderRadius: '5px',
    cursor: 'pointer',
};

const registerLinkStyle: React.CSSProperties = {
    ...linkStyle,
    backgroundColor: 'blue',
};

const loginLinkStyle: React.CSSProperties = {
    ...linkStyle,
    backgroundColor: 'green',
};

const booksLinkStyle: React.CSSProperties = {
    ...linkStyle,
    backgroundColor: 'orange',
};
const booksWithPagesLinkStyle: React.CSSProperties = {
    ...linkStyle,
    backgroundColor: 'red',
};

const App: React.FC<AppProps> = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        setIsAuthenticated(!!authToken);
    }, []);


    return (
        <div className="App" style={containerStyle}>
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
            {isAuthenticated ? (
                <Link to="/logout" style={{ ...linkStyle, backgroundColor: 'purple' }}>
                    Logout
                </Link>
            ) : null}

            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/login"
                    element={<AuthPage setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route path="/books" element={<BookListComponent />} />
                <Route path="/create-book" element={<CreateBookComponent />} />
                <Route path="/update-book/:bookId" element={<UpdateBookComponent />} />
                <Route path="/delete-book/:bookId" element={<DeleteBookComponent />} />
                <Route path="/get-book/:id" element={<GetBookByIdComponent />} />
                <Route path="/get-pages" element={<GetBooksOnDifPages />} />
                <Route path="/logout" element={<LogoutComponent />} />
            </Routes>
        </div>
    );
};

export default App;
