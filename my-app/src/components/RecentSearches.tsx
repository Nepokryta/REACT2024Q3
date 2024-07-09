import { Component } from 'react';

interface RecentSearchesProps {
  onSearch: (query: string) => void;
}

class RecentSearches extends Component<RecentSearchesProps> {
  handleSearchClick = (query: string) => {
    this.props.onSearch(query);
  }

  render() {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    return (
      <div>
        <h3>Recent Searches</h3>
        <ul style={{'display': 'flex', 'gap': '20px', 'padding': '0 0 10px'}}>
          {recentSearches.map((query: string, index: number) => (
            <li key={index} onClick={() => this.handleSearchClick(query)} style={{'display': 'block'}}>
              {query}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default RecentSearches;