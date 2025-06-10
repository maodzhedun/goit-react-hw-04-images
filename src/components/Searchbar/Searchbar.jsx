import { useState } from 'react';
import {
  SearchbarEl,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ handleSearch }) => {
  const [search, setSearch] = useState('');

  const handleChange = event => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleSearch(search);
    setSearch('');
  };

  return (
    <SearchbarEl>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton className="button">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={search}
        />
      </SearchForm>
    </SearchbarEl>
  );
};

export default Searchbar;
