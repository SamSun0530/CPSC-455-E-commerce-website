import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { truncateTitle } from '../utils/length';

const maxLength = 20;

const Post = ({ post, onClick }) => {
  return (
    <Card onClick={onClick} sx={{ cursor: 'pointer', position: 'relative' }}>
      <Box
        sx={{
          position: 'relative',
          height: 180,
          backgroundImage: `url(${post.image})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#f0f0f0',
        }}
      >
        {post.sold && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'red',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
            }}
          >
            SOLD
          </Box>
        )}
      </Box>
      <CardContent>
        <Typography variant="subtitle1" sx={{ color: post.sold ? 'grey' : 'green' }}>
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
          {truncateTitle(post.title, maxLength)}
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