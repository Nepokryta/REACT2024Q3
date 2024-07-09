import { Component } from 'react';
import ResultItem from './ResultItem'

interface SearchResultsProps {
  results: Array<{ name: string, image: string, info: string }>;
}

class SearchResults extends Component<SearchResultsProps> {
  render() {
    const { results } = this.props;
    return (
      <div style={{'display': 'grid',
        'gridTemplateColumns': 'repeat(3, 1fr)',
        'gap': '10px'}}>
        {results.map((result, index) => (
          <ResultItem key={result.name + index} result={result} />
        ))}
      </div>
    );
  }
}

export default SearchResults;