import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Post from './Post';

export default function PostsList() {

    // Will remove later - only for display right now
    let testListings = [
        {
            name:'Post 1',
            price: 20,
            desc:'This is the description for Post 1',
            image:'https://via.placeholder.com/150'
        },
        {
            name: 'Post 2',
            price: 30,
            desc: 'This is the description for Post 2',
            image: 'https://via.placeholder.com/150'
        },
        {
            name: 'Post 3',
            price: 40,
            desc: 'This is the description for Post 3',
            image: 'https://via.placeholder.com/150'
        },
        {
            name: 'Post 4',
            price: 5,
            desc: 'This is the description for Post 4',
            image: 'https://via.placeholder.com/150'
        }
    ];

    const [listings, setListings] = useState(testListings);



    return (
        <>
            <Container>
                <Row>
                    {listings.map((post, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3}>
                            <Post post={post} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}