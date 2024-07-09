import { Component } from 'react';
import SearchBar from './components/SearchBar';
import RecentSearches from './components/RecentSearches';
import SearchResults from './components/SearchResults';
import ErrorBoundary from './components/ErrorBoundary';
import { fetchPokemons } from './services/api';


interface AppState {
  results: Array<{ name: string, image: string, info: string }>;
  loading: boolean;
  error: Error | null;
  offset: number;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = { results: [], loading: false, error: null, offset: 0
    };
  }

  componentDidMount() {
    this.fetchData('');
  }

  fetchData = (query: string) => {
    const { offset } = this.state;
    this.setState({ loading: true, error: null });
    fetchPokemons(9, offset)
      .then(data => {
        const filteredResults = data.filter((pokemon: { name: string }) => 
          pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
        this.setState(prevState => ({
          results: [...prevState.results, ...filteredResults],
          loading: false,
          offset: prevState.offset + 9
        }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        this.setState({ error, loading: false });
      });
  }

  handleSearch = (query: string) => {
    let recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    if (!recentSearches.includes(query)) {
      recentSearches = [query, ...recentSearches].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
    this.fetchData(query);
  }

  generateError = () => {
    this.setState(() => {
      throw new Error('Test error');
    });
  }

  render() {
    const {loading, results, error} = this.state;

    if (error) {
      return <div>Произошла ошибка.</div>;
    }

    return (
      <ErrorBoundary>
        <div style={{'display': 'flex', 'flexDirection': 'column', 'alignContent': 'center'}}>
          <div>
            <SearchBar onSearch={this.handleSearch} onGenerateError={this.generateError} />
            <RecentSearches onSearch={this.handleSearch} />
          </div>
          <div>
          {loading ? (
              <div className="spinner"></div>
            ) : (
              <SearchResults results={results} />
            )}
          </div>
          <button onClick={() => this.fetchData('')} style={{'margin': '20px 0'}}>Load More</button>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;