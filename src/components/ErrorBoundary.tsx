import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}


interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ hasError: true });
  }

  handleRefresh = () => {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return <>
        <h1>Something went wrong.</h1>
        <button onClick={this.handleRefresh}>Refresh Page</button>
      </>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
