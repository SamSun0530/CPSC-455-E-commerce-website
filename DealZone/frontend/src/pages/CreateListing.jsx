import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography, Autocomplete, Chip } from '@mui/material';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addToPostsListAsync } from '../thunks/postsListThunk';
import { addTagAsync, getTagsAsync } from '../thunks/tagsThunk';

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const tags = useSelector((state) => state.tags.items);
    const [selectedTags, setSelectedTags] = useState([]);
    const [newTags, setNewTags] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTagsAsync());
    }, [dispatch]);

    const handleTagAddition = (tag) => {
        console.log("tag addition: ", tag);
        setNewTags([...newTags, { tag }]);
        setSelectedTags([...selectedTags, { tag }]);
    };

    const handleTagRemoval = (tagToRemove) => {
        console.log("tag removal: ", tagToRemove);
        setNewTags(newTags.filter(tag => tag.tag !== tagToRemove.tag));
        setSelectedTags(selectedTags.filter(tag => tag.tag !== tagToRemove.tag));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const allSelectedTags = selectedTags.map(tag => tag.tag);
        const finalTags = [...new Set(allSelectedTags)];

        console.log('final tags: ', finalTags);
        if (newTags.length > 0) {
            const newTagsToAdd = newTags.map(tag => tag.tag);
            dispatch(addTagAsync(newTagsToAdd));
        }

        const newListing = {
            title,
            desc,
            image,
            price: parseFloat(price),
            tags: finalTags
        };

        console.log("new: ", newListing);
        dispatch(addToPostsListAsync(newListing));
        setTitle('');
        setDesc('');
        setImage('');
        setPrice('');
        setSelectedTags([]);
        setNewTags([]);
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="sm">
                <Box mt={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Create a new listing
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Image URL"
                            variant="outlined"
                            margin="normal"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Price"
                            variant="outlined"
                            margin="normal"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Container>
        </>
    );
};

export default AddPost;