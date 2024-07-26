import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Box, TextField, IconButton } from '@mui/material';
import { Search as SearchIcon, FilterList as FilterListIcon, Clear as ClearIcon} from '@mui/icons-material';
import { queryPostsListAsync } from '../thunks/postsListThunk';
import TagFilterPopup from './TagFilterPopup';

const SearchBar = ({ onSearch }) => {
    const tags = ['Electronics', 'Kitchen', 'Toys', 'Clothes', 'Pet Supplies', 'Furniture', 'Footwear', 'Miscellaneous']; //TODO: Remove when there are tags to fetch
    const [query, setQuery] = useState('');
    const [showTagFilterPopup, setShowTagFilterPopup] = useState(false);
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

    const toggleTagFilterPopup = () => {
        setShowTagFilterPopup(!showTagFilterPopup);
    }

    return (

        <Box display="flex" flexDirection="column" alignItems="center" my={2} position="relative">
            <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
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
                <IconButton color="primary" onClick={toggleTagFilterPopup}>
                    <FilterListIcon />
                </IconButton>
            </Box>
            {showTagFilterPopup && <TagFilterPopup tags={tags} onClose={toggleTagFilterPopup} />}
        </Box>
    );
};

export default SearchBar;
