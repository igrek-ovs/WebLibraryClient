import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider, Typography } from '@mui/material';

interface RatingDialogProps {
    open: boolean;
    onClose: () => void;
    onRatingSubmit: (rating: number) => void;
}

const RatingDialog: React.FC<RatingDialogProps> = ({ open, onClose, onRatingSubmit }) => {
    const [rating, setRating] = useState<number>(1);

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setRating(newValue as number);
    };

    const handleSubmit = () => {
        onRatingSubmit(rating);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Rate the book</DialogTitle>
            <DialogContent>
                <Typography gutterBottom>Choose your rating:</Typography>
                <Slider
                    value={rating}
                    onChange={handleSliderChange}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={5}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Send</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RatingDialog;