import React from 'react';
import { Box, Flex, Link, Spacer, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box bg="blue.500" px={4}>
      <Flex h={16} alignItems="center">
        <Heading size="md" color="white">
          Twitter Handler
        </Heading>
        <Spacer />
        <Link as={RouterLink} to="/" color="white" mr={4}>
          Home
        </Link>
        <Link as={RouterLink} to="/voice-recorder" color="white">
          Voice Recorder
        </Link>
      </Flex>
    </Box>
  );
};

export default Navbar;