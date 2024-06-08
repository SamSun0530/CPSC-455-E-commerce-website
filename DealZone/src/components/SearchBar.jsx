import React from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaSearch, FaFilter } from 'react-icons/fa';
import '../css/SearchBar.css';

const SearchBar = ({ onSearch }) => {
    return (
        <Form className="search-bar">
            <InputGroup>
            {/* Bootstrap input */}
                <FormControl
                    placeholder="Search by Post Heading..."
                    aria-label="Search"
                />
                <Button variant="outline-secondary" id="searchBtm">
                    <FaSearch />
                </Button>
                <Button variant="outline-secondary" id="filterBtn">
                    <FaFilter />
                </Button>
            </InputGroup>
        </Form>
    );
};

export default SearchBar;
