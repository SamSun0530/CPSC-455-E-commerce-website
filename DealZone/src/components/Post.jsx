import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const Post = ({ post }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="180"
        image={post.image}
        alt={post.name}
      />
      <CardContent>
        <Typography variant="subtitle1" sx={{ color: 'red' }}>
          ${post.price}
        </Typography>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {post.desc}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
