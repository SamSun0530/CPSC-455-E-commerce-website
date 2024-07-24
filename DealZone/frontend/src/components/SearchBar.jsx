import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Box, TextField, IconButton } from '@mui/material';
import { Search as SearchIcon, FilterList as FilterListIcon, Clear as ClearIcon} from '@mui/icons-material';
import { queryPostsListAsync } from '../thunks/postsListThunk';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(queryPostsListAsync(query));
    };


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const handleClear = () => {
        setQuery('');
        dispatch(queryPostsListAsync(''));
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" my={2}>
            <TextField
                variant="outlined"
                placeholder="Search by Post Heading..."
                fullWidth
                sx={{ maxWidth: 600, mr: 1 }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <IconButton onClick={handleClear}>
                <ClearIcon/>
            </IconButton>
            <IconButton color="primary" onClick={handleSearch}>
                <SearchIcon />
            </IconButton>
            <IconButton color="primary">
                <FilterListIcon />
            </IconButton>
        </Box>
    );
};

export default SearchBar;
