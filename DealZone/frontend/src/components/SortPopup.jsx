import React, { useState, useEffect } from 'react';
import { Button, Radio, RadioGroup, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const SortPopup = ({ selectedMethod, selectedOrder, open, onClose, onConfirm }) => {
    const [sortCriteria, setSortCriteria] = useState({ sortMethod: selectedMethod, sortOrder: selectedOrder });

    useEffect(() => {
        setSortCriteria({ sortMethod: selectedMethod, sortOrder: selectedOrder });
    }, [selectedMethod, selectedOrder]);

    const handleSortChange = (event) => {
        const [sortMethod, sortOrder] = event.target.value.split('-');
        setSortCriteria({ sortMethod, sortOrder });
    };

    const handleConfirm = () => {
        onConfirm(sortCriteria);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Sort by</DialogTitle>
            <DialogContent>
                <RadioGroup value={`${sortCriteria.sortMethod}-${sortCriteria.sortOrder}`} onChange={handleSortChange}>
                    <FormControlLabel value="posted_on-descending" control={<Radio />} label="Most Recent" />
                    <FormControlLabel value="posted_on-ascending" control={<Radio />} label="Oldest" />
                    <FormControlLabel value="price-ascending" control={<Radio />} label="Price: Low to High" />
                    <FormControlLabel value="price-descending" control={<Radio />} label="Price: High to Low" />
                    <FormControlLabel value="title-ascending" control={<Radio />} label="Name: A → Z" />
                    <FormControlLabel value="title-descending" control={<Radio />} label="Name: Z → A" />
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleConfirm} color="primary">Confirm</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SortPopup;
