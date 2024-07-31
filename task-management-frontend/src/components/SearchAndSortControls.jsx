import React from 'react';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const SearchAndSortControls = ({ searchTerm, onSearchChange, sortOrder, onSortChange }) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={onSearchChange}
                fullWidth
            />
            <FormControl fullWidth>
                <InputLabel id="sort-select-label">Sort By</InputLabel>
                <Select
                    labelId="sort-select-label"
                    value={sortOrder || 'asc'} // Default to 'asc' if sortOrder is undefined
                    onChange={onSortChange}
                    label="Sort By"
                >
                    <MenuItem value="asc">Recent</MenuItem>
                    <MenuItem value="desc">Past</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default SearchAndSortControls;
