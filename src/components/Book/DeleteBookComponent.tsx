import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const DeleteBookComponent: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const deleteBook = async () => {
            try {
                if (!bookId) {
                    console.error('Book ID is required');
                    return;
                }

                const authToken = localStorage.getItem('accessToken');
                if (!authToken) {
                    console.error('User is not authenticated');
                    return;
                }

                const headers = { Authorization: `Bearer ${authToken}` };

                const response = await api.delete(`/api/Book/${bookId}`, { headers });
                console.log('DeleteBook response:', response.data);

                navigate('/login');
            } catch (error) {
                console.error('DeleteBook failed:', error);
            }
        };

        deleteBook();
    }, [bookId]);

    return (
        <Box>
            Deleting...
        </Box>
    );
};

export default DeleteBookComponent;
