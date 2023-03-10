import React, { useState } from 'react';
import { TextField } from '@mui/material';

const Search = ({ search }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue('');
  };
  
  return (
    <TextField
    id='outlined basic'
    sx={{ label: { color: '#dca09f' } }}
    label='Search...'
    value={searchValue}
    onChange={handleSearchInputChanges}
    onKeyPress= {(e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        search(searchValue);
        resetInputField();
      }
}}
  />
  );
};

export default Search