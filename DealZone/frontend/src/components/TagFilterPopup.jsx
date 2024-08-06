import React, { useState, useEffect } from 'react';
import { Box, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button } from '@mui/material';
import '../css/TagFilterPopup.css';

const TagFilterPopup = ({ tags, selected, onClose, onConfirm, open }) => {
    const [selectedTags, setSelectedTags] = useState(selected);

    useEffect(() => {
        setSelectedTags(selected);
    }, [selected]);

    const toggleTag = (tag) => {
        setSelectedTags((prevSelectedTags) =>
            prevSelectedTags.includes(tag)
                ? prevSelectedTags.filter((t) => t !== tag)
                : [...prevSelectedTags, tag]
        );
    };

    const handleConfirm = () => {
        onConfirm(selectedTags);
        onClose();
    };

    const handleClear = () => {
        setSelectedTags([]);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Filter by</DialogTitle>
            <DialogContent>
                <Box>
                    {tags.map((tagObject, index) => (
                        <FormControlLabel
                            key={index}
                            control={<Checkbox checked={selectedTags.includes(tagObject.tag)} onChange={() => toggleTag(tagObject.tag)} />}
                            label={tagObject.tag}
                        />
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClear}>Clear Tags</Button>
                <Button onClick={handleConfirm} color="primary">Confirm</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TagFilterPopup;
