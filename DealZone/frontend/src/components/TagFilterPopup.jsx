import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import { IconButton } from '@mui/material';
import { Clear as ClearIcon, Check as CheckIcon } from '@mui/icons-material';
import '../css/TagFilterPopup.css';

const TagFilterPopup = ({ tags, selected, onClose, onConfirm, onClearTags }) => {
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
        onClearTags();
        onClose();
    };

    return (
        <Box className="tag-filter-popup" p={2} boxShadow={3} position="absolute" top="100%" zIndex="modal" bgcolor="background.paper">
            <Box display="flex" justifyContent="space-between" mb={2}>
                <IconButton onClick={handleConfirm} className="confirm-btn">
                    <CheckIcon/>
                </IconButton>
                <IconButton onClick={handleClear} className="close-btn">
                    <ClearIcon />
                </IconButton>
            </Box>
            <Box>
                {tags.map((tagObject, index) => (
                    <FormControlLabel
                        key={index}
                        control={<Checkbox checked={selectedTags.includes(tagObject.tag)} onChange={() => toggleTag(tagObject.tag)} />}
                        label={tagObject.tag}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default TagFilterPopup;
