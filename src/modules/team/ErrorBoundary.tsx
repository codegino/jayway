import React, {ReactNode} from 'react';
import styled from '@emotion/styled';
import {ReactComponent as ErrorImage} from '../../icons/confused-man.svg';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

// Alternatively we can use `react-error-boundary` package

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
  };

  static getDerivedStateFromError(error: Error): State {
    return {hasError: true, errorMessage: error.message};
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Container role="alert" aria-label="error boundary">
          <div className="content">
            <h2>Ooops!!! Something went wrong.</h2>
            <pre>{this.state.errorMessage}</pre>
          </div>
          <ErrorImage className="error-image" viewBox="0 0 1500 1200" />
        </Container>
      );
    }

    return this.props.children;
  }
}

// Another way to use emotion
const Container = styled.div`
  position: relative;
  height: 100%;
  text-align: center;
  width: 100%;
  height: 100%;
  max-height: 40rem;
  min-width: 20rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .content {
    background-color: #fff;
    width: 100%;
    text-align: center;
  }

  .error-image {
    background-color: #fff;
    position: relative;
    top: 0;
    height: 70%;
    width: 100%;
  }
`;
