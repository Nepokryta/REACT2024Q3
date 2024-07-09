import { Component, ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onGenerateError: () => void;
}

interface SearchBarState {
  query: string;
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    const savedQuery = localStorage.getItem('searchQuery') || '';
    this.state = { query: savedQuery };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  }

  handleSearch = () => {
    const trimmedQuery = this.state.query.trim();
    localStorage.setItem('searchQuery', trimmedQuery);
    this.props.onSearch(trimmedQuery);
  }

  render() {
    return (
      <div style={{'display': 'flex', 'gap': '8px'}}>
        <input 
          type="text" 
          value={this.state.query} 
          onChange={this.handleChange} 
          style={{'width': '450px'}}
        />
        <button onClick={this.handleSearch}>Search</button>
        <button onClick={this.props.onGenerateError}>Generate Error</button>
      </div>
    );
  }
}

export default SearchBar;