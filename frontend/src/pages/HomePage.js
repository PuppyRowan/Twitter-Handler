import React from 'react';
import { 
  Container, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  HStack,
  Box,
  Grid,
  GridItem,
  Card,
  CardBody,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaMicrophone, FaKeyboard, FaChartLine, FaCogs } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const features = [
    {
      title: 'Voice Recording',
      description: 'Submit audio recordings that get transcribed and converted to tweets',
      icon: FaMicrophone,
      path: '/voice-recorder',
      color: 'blue',
    },
    {
      title: 'Text Submission',
      description: 'Submit text directly for AI-powered caption generation',
      icon: FaKeyboard,
      path: '/text-submission',
      color: 'green',
    },
    {
      title: 'Handler Dashboard',
      description: 'Review, edit, and manage all submissions and posts',
      icon: FaCogs,
      path: '/dashboard',
      color: 'handler',
    },
    {
      title: 'System Overview',
      description: 'Monitor system performance and activity analytics',
      icon: FaChartLine,
      path: '/overview',
      color: 'purple',
    },
  ];

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={12}>        {/* Hero Section */}
        <Box textAlign="center" maxW="2xl">
          <Heading 
            size="2xl" 
            mb={4} 
            bgGradient="linear(to-r, handler.500, brand.500)"
            bgClip="text"
            fontWeight="800"
          >
            🐾 Maple's Whimper Stack
          </Heading>
          <Text fontSize="xl" color="gray.600" mb={2} fontWeight="600">
            She whimpers. I post.
          </Text>
          <Text fontSize="lg" color="gray.500">
            A Handler-controlled system for automated voice-to-Twitter posting with AI assistance.
          </Text>
        </Box>        {/* Features Grid */}
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6} w="100%">
          {features.map((feature, index) => (
            <GridItem key={index}>
              <Card
                variant="elevated"
                h="100%"
                cursor="pointer"
                onClick={() => navigate(feature.path)}
                role="group"
              >
                <CardBody>
                  <VStack spacing={4} align="center" textAlign="center">
                    <Box
                      p={4}
                      borderRadius="2xl"
                      bg={`${feature.color}.100`}
                      color={`${feature.color}.500`}
                      _groupHover={{
                        transform: 'scale(1.1)',
                        bg: `${feature.color}.200`,
                      }}
                      transition="all 0.2s"
                    >
                      <Icon as={feature.icon} boxSize={8} />
                    </Box>
                    <Heading size="md" fontWeight="700">{feature.title}</Heading>
                    <Text color="gray.600" fontSize="sm" lineHeight="1.6">
                      {feature.description}
                    </Text>
                    <Button
                      colorScheme={feature.color}
                      size="sm"
                      variant="solid"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(feature.path);
                      }}
                      _groupHover={{
                        transform: 'translateY(-1px)',
                      }}
                    >
                      Access {feature.title}
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>        {/* Quick Actions */}
        <Box w="100%" textAlign="center">
          <Text fontSize="lg" fontWeight="700" mb={6} color="gray.700">
            Quick Actions
          </Text>
          <HStack spacing={6} justify="center" wrap="wrap">
            <Button
              variant="handler"
              size="lg"
              leftIcon={<FaMicrophone />}
              onClick={() => navigate('/voice-recorder')}
              px={8}
            >
              Start Recording
            </Button>
            <Button
              variant="twitter"
              size="lg"
              leftIcon={<FaCogs />}
              onClick={() => navigate('/dashboard')}
              px={8}
            >
              Open Dashboard
            </Button>
          </HStack>
        </Box>

        {/* Footer Info */}
        <Box textAlign="center" maxW="lg">
          <Text fontSize="sm" color="gray.500" fontStyle="italic">
            Built for @BunnyPupMaple • Handler-controlled system • Not a toy, but a tool of ownership
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default HomePage;