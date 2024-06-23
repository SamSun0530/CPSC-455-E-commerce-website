import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography, Card, CardContent, CardActions, Button, CardMedia } from '@mui/material';
import { removeItemFromWishlist } from '../slices/wishlist';
import Navbar from '../components/Navbar';

const WishlistPage = () => {
    const wishlistItems = useSelector((state) => state.wishlist.items);

    const dispatch = useDispatch();

    const handleRemoveFromWishlist = (id) => {
        dispatch(removeItemFromWishlist(id));
    };

    return (
        <>
        <Navbar />
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Wishlist
            </Typography>
            <Grid container spacing={3}>
                {wishlistItems.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={item.image}
                                alt={item.name}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {item.desc}
                                </Typography>
                                <Typography variant="h6" color="textPrimary" sx={{ mt: 2 }}>
                                    ${item.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Move to cart
                                </Button>
                                <Button size="small" color="secondary">
                                    Remove
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
        </>
    );
};

export default WishlistPage;
