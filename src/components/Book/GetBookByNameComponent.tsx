import React, {useState} from 'react';
import api from "../../services/api";
import {BookDto} from "../../models";
import {booksContainerStyle, genreAuthorStyle, imageStyle} from "../../styles";
import {Box, List, ListItem, Typography} from "@mui/material";


const GetBookByIdComponent: React.FC = () => {
    const [books, setBooks] = useState<any | null>(null);

    const handleGetBookByName = async (book: string) => {
        try {
            const response = await api.get(`/api/Book/get-book-by-name/${book}`);
            setBooks(response.data);
        } catch (error) {
        }
    };
    const handleSearchTermChange = async (event: any) => {
        setTimeout(() => {
            handleGetBookByName(event.target.value);
        }, 100);
    };

    return (
        <div>
            <h1>Get Book By Name</h1>
            <label>
                Book Name:
                <input
                    type="text"
                    onChange={handleSearchTermChange}
                />
            </label>
            <br/>
            <Box>
                <List>
                    {books ? (
                        books?.map((book: BookDto) => (
                        <ListItem key={book.id}>
                            <Box style={booksContainerStyle}>
                                <Typography variant="h5"><strong>{book.title}</strong></Typography>
                                <Box style={genreAuthorStyle}>
                                    <Typography>Genre: {book.genre}</Typography>
                                    <Typography>Author: {book.authorName}</Typography>
                                </Box>
                                {book.imagePath ? (
                                    <img src={book.imagePath} alt={`Image for ${book.title}`} style={imageStyle} />
                                ) : (
                                    <Typography>No image</Typography>
                                )}
                            </Box>
                        </ListItem>
                    ))):(
                    <p>No books </p>
                    )}
                </List>
            </Box>
        </div>
    );
};

export default GetBookByIdComponent;