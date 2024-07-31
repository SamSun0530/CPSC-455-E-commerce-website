import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, IconButton } from '@mui/material';
import { Search as SearchIcon, FilterList as FilterListIcon, Clear as ClearIcon, SwapVert as SwapVertIcon } from '@mui/icons-material';
import { queryPostsListAsync } from '../thunks/postsListThunk';
import TagFilterPopup from './TagFilterPopup';
import SortPopup from './SortPopup';
import { getTagsAsync } from '../thunks/tagsThunk';

const SearchBar = () => {
    const INITIAL_SORT = { sortMethod: 'posted_on', sortOrder: 'descending' }
    const tags = useSelector((state) => state.tags.items);    
    const [query, setQuery] = useState('');
    const [showTagFilterPopup, setShowTagFilterPopup] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [showSortPopup, setShowSortPopup] = useState(false);
    const [sortCriteria, setSortCriteria] = useState(INITIAL_SORT);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTagsAsync());
    }, [dispatch]);

    const handleSearch = () => {
        dispatch(queryPostsListAsync({
            query: query,
            tags: selectedTags,
            sortMethod: sortCriteria.sortMethod,
            sortOrder: sortCriteria.sortOrder
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleClear = () => {
        setQuery('');
        setSelectedTags([]);
        setSortCriteria(INITIAL_SORT)
        dispatch(queryPostsListAsync({ query: '', tags: [], sortMethod: INITIAL_SORT.sortMethod, sortOrder: INITIAL_SORT.sortOrder }));
    };

    const handleClearTags = () => {
        setSelectedTags([]);
        dispatch(queryPostsListAsync({ query: query, tags: [], sortMethod: sortCriteria.sortMethod, sortOrder: sortCriteria.sortOrder }));
    };

    const toggleTagFilterPopup = () => {
        setShowTagFilterPopup(!showTagFilterPopup);
    };

    const toggleSortPopup = () => {
        setShowSortPopup(!showSortPopup);
    };

    const handleConfirmTags = (tags) => {
        setSelectedTags(tags);
        dispatch(queryPostsListAsync({query: query, tags: tags, sortMethod: sortCriteria.sortMethod, sortOrder: sortCriteria.sortOrder}))
    };

    const handleConfirmSort = (sortCriteria) => {
        setSortCriteria(sortCriteria);
        dispatch(queryPostsListAsync({query: query, tags: selectedTags, sortMethod: sortCriteria.sortMethod, sortOrder: sortCriteria.sortOrder}))
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" my={2} position="relative">
            <Box display="flex" justifyContent="center" alignItems="center" mb={2} width="100%" maxWidth={1000}>
                <TextField
                    variant="outlined"
                    placeholder="Search by Post Heading..."
                    fullWidth
                    sx={{ maxWidth: 700, mr: 1 }}
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
                <IconButton color="primary" onClick={toggleSortPopup}>
                    <SwapVertIcon />
                </IconButton>
            </Box>
            {showTagFilterPopup && <TagFilterPopup tags={tags} selected={selectedTags} onClose={toggleTagFilterPopup} onConfirm={handleConfirmTags} onClearTags={handleClearTags} />}
            {showSortPopup && <SortPopup selectedMethod={sortCriteria.sortMethod} selectedOrder={sortCriteria.sortOrder} open={showSortPopup} onClose={toggleSortPopup} onConfirm={handleConfirmSort} />}
        </Box>
    );
};

export default SearchBar;
