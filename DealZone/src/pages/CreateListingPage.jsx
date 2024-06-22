import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import { useDispatch } from 'react-redux';
import { addListing } from '../slices/home';

const CreateListingPage = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newListing = {
            name,
            desc,
            image,
            price: parseFloat(price)
        };
        dispatch(addListing(newListing));
        setName('');
        setDesc('');
        setImage('');
        setPrice('');
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="sm">
                <Box mt={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Create a New Listing
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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

export default CreateListingPage;
