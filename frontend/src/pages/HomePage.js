import React from 'react';
import { Container, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6}>
        <Heading>Welcome to Twitter Handler</Heading>
        <Text fontSize="lg" textAlign="center">
          Convert your voice recordings to Twitter-ready posts with AI assistance.
        </Text>
        <Button 
          colorScheme="blue" 
          size="lg" 
          onClick={() => navigate('/voice-recorder')}
        >
          Start Recording
        </Button>
      </VStack>
    </Container>
  );
};

export default HomePage;