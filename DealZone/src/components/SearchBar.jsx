import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';

const SearchBar = ({ onSearch }) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" my={2}>
        <TextField
            variant="outlined"
            placeholder="Search by Post Heading..."
            fullWidth
            sx={{ maxWidth: 600, mr: 1 }}
        />
        <IconButton color="primary">
            <SearchIcon />
        </IconButton>
        <IconButton color="primary">
            <FilterListIcon />
        </IconButton>
        </Box>
    );
};

export default SearchBar;
