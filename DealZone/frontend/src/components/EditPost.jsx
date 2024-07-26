import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, IconButton, Typography } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import '../css/sellerView.css'

const EditPost = ({ post, onClose, onSave }) => {
    const [editableFields, setEditableFields] = useState({});
    const [editingField, setEditingField] = useState(null);

    useEffect(() => {
        if (post) {
            setEditableFields({
                title: post.title,
                description: post.description,
                image: post.image,
                price: post.price,
            });
        }
    }, [post]);

    const handleChange = (field, value) => {
        setEditableFields((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleEditClick = (field) => {
        setEditingField(field);
    };

    const handleSaveClick = async () => {
        await onSave({ ...post, ...editableFields });
    };

    const handleCancelClick = () => {
        setEditingField(null);
    };

    if (!post) return null;

    return (
        <div className="popup">
            <div className="popup-inner">
                <Box display="flex" flexDirection="column" gap={2}>
                    <Typography variant="h5">Edit Post</Typography>
                    {Object.keys(editableFields).map((field) => (
                        <Box key={field} display="flex" alignItems="center">
                            <TextField
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                value={editableFields[field]}
                                onChange={(e) => handleChange(field, e.target.value)}
                                fullWidth
                                disabled={editingField !== field}
                            />
                            {editingField === field ? (
                                <Box>
                                    <IconButton onClick={handleSaveClick}>
                                        <SaveIcon />
                                    </IconButton>
                                    <IconButton onClick={handleCancelClick}>
                                        <CancelIcon />
                                    </IconButton>
                                </Box>
                            ) : (
                                <IconButton onClick={() => handleEditClick(field)}>
                                    <EditIcon />
                                </IconButton>
                            )}
                        </Box>
                    ))}
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button variant="contained" color="primary" onClick={handleSaveClick}>
                            Save All
                        </Button>
                        <Button variant="contained" color="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </div>
        </div>
    );
};

export default EditPost;