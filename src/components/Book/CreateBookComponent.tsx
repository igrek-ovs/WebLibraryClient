import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import api from "../../services/api";

const CreateBookComponent: React.FC = () => {
    const [newBook, setNewBook] = useState({
        title: '',
        genre: '',
        authorId: 0,
        image: '',
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleCreateBook = async () => {
        try {
            if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
                const response = await api.post('/api/Book', {
                    title: newBook.title,
                    genre: newBook.genre,
                    authorId: newBook.authorId,
                });
                const formData = new FormData();
                formData.append('file', fileInputRef.current.files[0]);

                const imageResponse = await api.post('/api/Book/upload-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const updatedBook = {
                    ...newBook,
                    imagePath: imageResponse.data,
                    id: response.data.id,
                };
                await api.put(`/api/Book/${response.data.id}`, updatedBook);

                console.log('CreateBook response:', response.data);

                setNewBook({
                    title: '',
                    genre: '',
                    authorId: 0,
                    image: '',
                });
            } else {
                console.error('No file selected');
            }
        } catch (error) {
            console.error('CreateBook failed:', error);
        }
    };

    return (
      <Box>
          <Typography variant="h1">Create Book</Typography>
          <label>
              Image:
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
              />
          </label>
          <br />
          <label>
              Title:
              <TextField
                type="text"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              />
          </label>
          <br />
          <label>
              Genre:
              <TextField
                type="text"
                value={newBook.genre}
                onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
              />
          </label>
          <br />
          <label>
              Author ID:
              <TextField
                type="number"
                value={newBook.authorId || ''}
                onChange={(e) => setNewBook({ ...newBook, authorId: Number(e.target.value) })}
              />
          </label>
          <br />
          <Button variant="contained" color="primary" onClick={handleCreateBook}>
              Create Book
          </Button>
      </Box>
    );
};

export default CreateBookComponent;
