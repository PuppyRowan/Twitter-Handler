import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  VStack,
  Text,
  Code,
} from '@chakra-ui/react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box p={8} maxW="container.md" mx="auto">
          <Alert status="error" flexDirection="column" alignItems="center" textAlign="center">
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Something went wrong!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              <VStack spacing={4}>
                <Text>
                  An error occurred in the application. Please try refreshing the page.
                </Text>
                <Button
                  colorScheme="red"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </Button>
                {process.env.NODE_ENV === 'development' && (
                  <Box textAlign="left" w="100%">
                    <Text fontWeight="bold" mb={2}>Error Details:</Text>
                    <Code p={2} borderRadius="md" fontSize="xs" whiteSpace="pre-wrap">
                      {this.state.error && this.state.error.toString()}
                      {this.state.errorInfo.componentStack}
                    </Code>
                  </Box>
                )}
              </VStack>
            </AlertDescription>
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
