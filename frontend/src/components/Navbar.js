import React from 'react';
import { 
  Box, 
  Flex, 
  Link, 
  Spacer, 
  Heading, 
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FaMoon, FaSun, FaChevronDown, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/overview', label: 'Overview' },
    { path: '/voice-recorder', label: 'Voice Recorder' },
    { path: '/text-submission', label: 'Text Submission' },
    { path: '/dashboard', label: 'Dashboard' },
  ];
  return (
    <Box 
      bg={bg}
      px={6} 
      borderBottom="1px" 
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={1000}
      backdropFilter="blur(10px)"
      boxShadow="sm"
    >
      <Flex h={16} alignItems="center">
        <Heading 
          size="lg" 
          bgGradient="linear(to-r, handler.500, brand.500)"
          bgClip="text"
          fontWeight="800"
        >
          🐾 Twitter Handler
        </Heading>
        <Spacer />
        
        {/* Desktop Navigation */}
        <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              as={RouterLink}
              to={link.path}
              fontWeight={isActive(link.path) ? 'bold' : 'normal'}
              color={isActive(link.path) ? 'handler.500' : 'gray.600'}
              _hover={{ color: 'handler.400' }}
              transition="color 0.2s"
            >
              {link.label}
            </Link>
          ))}
        </HStack>

        <HStack spacing={2} ml={4}>
          <IconButton
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle color mode"
            size="sm"
          />

          {/* Mobile Navigation Menu */}
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              leftIcon={<FaBars />}
              display={{ base: 'flex', md: 'none' }}
              size="sm"
            >
              Menu
            </MenuButton>
            <MenuList>
              {navLinks.map((link) => (
                <MenuItem
                  key={link.path}
                  as={RouterLink}
                  to={link.path}
                  fontWeight={isActive(link.path) ? 'bold' : 'normal'}
                  color={isActive(link.path) ? 'handler.500' : undefined}
                >
                  {link.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;