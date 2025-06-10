import { Component } from 'react';
import { SearchbarEl, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "./Searchbar.styled";

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSearch(this.state.value);
    this.setState({value: ''})
  };

  render() {
    return (
      <>
        <SearchbarEl>
          <SearchForm onSubmit={this.handleSubmit}>
            <SearchFormButton className="button">
              <SearchFormButtonLabel>Search</SearchFormButtonLabel>
            </SearchFormButton>
            <SearchFormInput
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleChange}
              value={this.state.value}
            />
          </SearchForm>
        </SearchbarEl>
      </>
    );
  }
}

export default Searchbar;
