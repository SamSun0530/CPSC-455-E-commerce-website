import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Box, TextField, IconButton } from '@mui/material';
import { Search as SearchIcon, FilterList as FilterListIcon, Clear as ClearIcon } from '@mui/icons-material';
import { queryPostsListAsync } from '../thunks/postsListThunk';
import TagFilterPopup from './TagFilterPopup';

const SearchBar = ({ onSearch }) => {
    const tags = ['Electronics', 'Free', 'Kitchen', 'Toys', 'Clothes', 'Pet Supplies', 'Furniture', 'Footwear', 'Miscellaneous']; // TODO: Remove when there are tags to fetch
    const [query, setQuery] = useState('');
    const [showTagFilterPopup, setShowTagFilterPopup] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const dispatch = useDispatch();

    const handleSearch = () => {
        const searchCriteria = {
            query: query,
            tags: selectedTags
        }
        dispatch(queryPostsListAsync(searchCriteria));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const handleClear = () => {
        setQuery('');
        handleClearTags();
        dispatch(queryPostsListAsync({ query: '', tags: [] }));
    }

    const handleClearTags = () => {
        setSelectedTags([]);
        dispatch(queryPostsListAsync({ query: query, tags: [] }));
    }

    const toggleTagFilterPopup = () => {
        setShowTagFilterPopup(!showTagFilterPopup);
    }

    const handleConfirmTags = (tags) => {
        setSelectedTags(tags);
        const searchCriteria = {
            query: query,
            tags: tags
        }
        dispatch(queryPostsListAsync(searchCriteria));
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" my={2} width="100%">
            <Box display="flex" justifyContent="center" alignItems="center" width="100%" maxWidth={600}>
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
                    <ClearIcon />
                </IconButton>
                <IconButton color="primary" onClick={handleSearch}>
                    <SearchIcon />
                </IconButton>
                <IconButton color="primary" onClick={toggleTagFilterPopup}>
                    <FilterListIcon />
                </IconButton>
            </Box>
            {showTagFilterPopup && <TagFilterPopup tags={tags} selected={selectedTags} onClose={toggleTagFilterPopup} onConfirm={handleConfirmTags} onClearTags={handleClearTags} />}
        </Box>
    );
};

export default SearchBar;
