import React, { Component } from 'react';
import { AppWrap } from "./App.styled";

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searhImage: '',
  };

  handleSearch = searhImage => {
    this.setState({ searhImage });
  };

  render() {
    return (
      <AppWrap>
        <Searchbar handleSearch={this.handleSearch} />
        <ImageGallery searhImage={this.state.searhImage} />
      </AppWrap>
    );
  }
}

export default App;
