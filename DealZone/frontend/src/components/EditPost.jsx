import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, IconButton, Typography, Autocomplete, Chip } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { addTagAsync, getTagsAsync } from '../thunks/tagsThunk';
import { useDispatch, useSelector } from 'react-redux';
import '../css/sellerView.css';

const EditPost = ({ post, onClose, onSave, onDelete }) => {
    const [editableFields, setEditableFields] = useState({});
    const [editingField, setEditingField] = useState(null);
    const [editingTags, setEditingTags] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [newTags, setNewTags] = useState([]);
    const tags = useSelector((state) => state.tags.items);
    const dispatch = useDispatch();

    if (!post || post.sold) return null;

    useEffect(() => {
        dispatch(getTagsAsync());
    }, []);

    useEffect(() => {
        if (post) {
            setEditableFields({
                title: post.title,
                description: post.description,
                image: post.image,
                price: post.price,
            });
            setSelectedTags(post.tags.map(tag => ({ tag })));
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
        const allSelectedTags = selectedTags.map(tag => tag.tag);
        const finalTags = [...new Set(allSelectedTags)];
        await onSave({ ...post, ...editableFields, tags: finalTags });
        if (newTags.length > 0) {
            const newTagsToAdd = newTags.map(tag => tag.tag);
            dispatch(addTagAsync(newTagsToAdd));
        }
        setEditingField(null);
        setEditingTags(false);
    };

    const handleCancelClick = () => {
        setEditingField(null);
        setEditingTags(false);
    };

    const handleDeleteClick = () => {
        onDelete(post._id);
    };

    const handleTagAddition = (tag) => {
        setNewTags([...newTags, { tag }]);
        setSelectedTags([...selectedTags, { tag }]);
    };

    const handleTagRemoval = (tagToRemove) => {
        setNewTags(newTags.filter(tag => tag.tag !== tagToRemove.tag));
        setSelectedTags(selectedTags.filter(tag => tag.tag !== tagToRemove.tag));
    };

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
                    {!editingTags && <Box display="flex" alignItems="center">
                        <TextField
                            label="Tags"
                            value={selectedTags.map(tag => tag.tag).join(', ')}
                            fullWidth
                            disabled={!editingTags}
                        />
                        <IconButton onClick={() => setEditingTags(!editingTags)}>
                            <EditIcon />
                        </IconButton>
                    </Box>}
                    {editingTags && (
                        <Autocomplete
                            multiple
                            options={tags}
                            getOptionLabel={(option) => option.tag}
                            value={selectedTags}
                            onChange={(event, newValue, reason) => {
                                if (newValue.length <= 3) {
                                    if (reason === 'createOption') {
                                        const lastTag = newValue[newValue.length - 1];
                                        if (lastTag && !tags.some(tag => tag.tag === lastTag)) {
                                            handleTagAddition(lastTag);
                                        } else {
                                            setSelectedTags(newValue);
                                        }
                                    } else {
                                        setSelectedTags(newValue);
                                    }
                                }
                            }}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Tags"
                                    placeholder="Select or add 3 tags"
                                />
                            )}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => {
                                    const { key, ...tagProps } = getTagProps({ index });
                                    return (
                                        <Chip
                                            key={key}
                                            variant="outlined"
                                            label={option.tag}
                                            {...tagProps}
                                            onDelete={() => handleTagRemoval(option)}
                                        />
                                    );
                                })
                            }
                            freeSolo
                        />
                    )}
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button variant="contained" color="primary" onClick={handleSaveClick}>
                            Save All
                        </Button>
                        <Button variant="contained" color="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDeleteClick}
                            startIcon={<DeleteIcon />}
                        >
                            Delete Post
                        </Button>
                    </Box>
                </Box>
            </div>
        </div>
    );
};

export default EditPost;