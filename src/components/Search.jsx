import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const Search = ({ search }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue('');
  };

  const callSearchFunction = e => {
    e.preventDefault();
    search(searchValue);
    resetInputField();
  };
  
  return (
    <TextField
    id='outlined basic'
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