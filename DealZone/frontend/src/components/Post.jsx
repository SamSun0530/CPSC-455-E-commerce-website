import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const Post = ({ post, onClick }) => {
  return (
    <Card onClick={onClick} sx={{ cursor: 'pointer' }}>
      <CardMedia
        component="img"
        height="180"
        image={post.image}
        alt={post.title}
      />
      <CardContent>
        <Typography variant="subtitle1" sx={{ color: 'red' }}>
          ${post.price}
        </Typography>
        <Typography 
          variant="h6"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {post.title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {post.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
