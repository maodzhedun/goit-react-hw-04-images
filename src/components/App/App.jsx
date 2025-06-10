import { useState } from 'react';
import { AppWrap } from './App.styled';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';

const App = () => {
  const [search, setSearch] = useState('');

  const handleSearch = search => {
    setSearch(search);
  };

  return (
    <AppWrap>
      <Searchbar handleSearch={handleSearch} />
      <ImageGallery searhImage={search} />
    </AppWrap>
  );
};

export default App;
