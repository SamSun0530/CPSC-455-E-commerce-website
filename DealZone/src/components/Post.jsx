import React from 'react';
import { Card } from 'react-bootstrap';
import '../css/Posts.css';

const Post = ({ post }) => {
    return (
        <Card className='small-card'>
            <Card.Img variant="top" src={post.image} />
            <Card.Body>
                <Card.Title>{post.name}</Card.Title>
                <Card.Text>{post.desc}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Post;
