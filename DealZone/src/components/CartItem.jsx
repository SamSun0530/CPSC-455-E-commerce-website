import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import '../css/CartItem.css';

const CartItem = ({ cartItem }) => {
    if (!cartItem) {
        return null; // or some fallback UI
    }

    return (
        <Card className='small-card'>
            <Card.Img variant="top" src={cartItem.image} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            <Card.Body>
                <Card.Title>{cartItem.name}</Card.Title>
                <Card.Text>{cartItem.price}</Card.Text>
                <Button variant="danger">Delete</Button>
                <Button variant="secondary">Move to Wishlist</Button>
            </Card.Body>
        </Card>
    );
};

CartItem.propTypes = {
    cartItem: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        image: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
};

export default CartItem;
