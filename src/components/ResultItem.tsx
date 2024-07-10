import { Component } from 'react';

interface ResultItemProps {
  result: { name: string, image: string, info: string };
}

class ResultItem extends Component<ResultItemProps> {
  render() {
    const { result } = this.props;

    return (
      <div style={{    'display': 'flex',
        'flexDirection': 'column',
        'alignItems': 'center',
        'border': '2px solid #626cff',
        'borderRadius': '10px',
        'paddingBottom': '20px'}}>
        <h2>{result.name}</h2>
        <img src={result.image} alt={result.name} style={{ width: '120px', height: '120px' }} />
      </div>
    );
  }
}

export default ResultItem;
