import { Box, List, ListItem, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import api from "../../services/api";
import { bookContainerStyle } from "./components";

const GetBookByNameComponent: React.FC = () => {
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
    <Box>
      <Typography variant="h1">Get Book By ID</Typography>
      <label>
        Book NAME:
        <TextField
          type="text"
          onChange={handleSearchTermChange}
        />
      </label>
      <br/>
      <List>
        {books ? (
          books.map((book:any) => (
            <ListItem key={book.id} style={bookContainerStyle}>
              <Typography variant="h6">{book.title}</Typography>
              <Typography>Genre: {book.genre}</Typography>
              <Typography>Author: {book.authorName}</Typography>
              {book.imagePath ? (
                <img src={book.imagePath} alt={`Image for ${book.title}`} style={{maxWidth: '200px'}}/>
              ) : (
                <Typography>No image</Typography>
              )}
            </ListItem>
          ))
        ) : (
          <Typography>No books </Typography>
        )}
      </List>
    </Box>
  );
};

export default GetBookByNameComponent;