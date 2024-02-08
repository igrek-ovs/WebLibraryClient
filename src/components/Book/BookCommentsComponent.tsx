import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '../../hooks/redux';
import api from '../../services/api';
import { useParams } from 'react-router-dom';

const BookCommentsComponent: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await api.get(`/api/BookComment/get-comments-for-book/${bookId}`);
                const commentsWithUserInfo = await Promise.all(response.data.map(async (comment: any) => {
                    const userInfo = await fetchUserInfo(comment.userId);
                    return { ...comment, ...userInfo };
                }));
                setComments(commentsWithUserInfo);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [bookId]);

    const fetchUserInfo = async (userId: string) => {
        try {
            const userNameResponse = await api.get(`/api/Auth/get-user-name/${userId}`);
            const userAvatarResponse = await api.get(`/api/Auth/get-user-avatar/${userId}`);
            return { userName: userNameResponse.data, userAvatar: userAvatarResponse.data };
        } catch (error) {
            console.error('Error fetching user info:', error);
            return { userName: '', userAvatar: '' };
        }
    };

    const handleAddComment = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('User ID is missing');
                return;
            }

            const authToken = localStorage.getItem('accessToken');
            if (!authToken) {
                console.error('User is not authenticated');
                return;
            }

            const headers = { Authorization: `Bearer ${authToken}` };

            const response = await api.post('/api/BookComment/', {
                bookId: bookId,
                userId: userId,
                comment: newComment,
            }, { headers });

            const userInfo = await fetchUserInfo(userId);
            const commentWithUserInfo = { ...response.data, ...userInfo };
            setComments([...comments, commentWithUserInfo]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = `${padWithZero(date.getDate())}.${padWithZero(date.getMonth() + 1)}.${date.getFullYear()} ${padWithZero(date.getHours())}:${padWithZero(date.getMinutes())}`;
        return formattedDate;
    };

    const padWithZero = (num: number) => {
        return num.toString().padStart(2, '0');
    };

    return (
        <div>
            <Typography variant="h5">Comments for Book {bookId}</Typography>
            {comments.map(comment => (
                <div key={comment.id}>
                    <Typography>{comment.comment}</Typography>
                    <Typography variant="caption">{formatDate(comment.created)}</Typography>
                    <Typography variant="caption"> By: {comment.userName}</Typography>
                    <img src={comment.userAvatar} alt={`${comment.userName}'s Avatar`} style={{ maxWidth: '50px' }} />
                </div>
            ))}
            <TextField
                label="Add Comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
            />
            <Button onClick={handleAddComment} variant="contained" color="primary">Add Comment</Button>
        </div>
    );
};

export default BookCommentsComponent;
