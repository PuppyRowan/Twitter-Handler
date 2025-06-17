import React from 'react';
import {
  Box,
  Card,
  CardBody,
  Text,
  Badge,
  HStack,
  VStack,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { FaMicrophone, FaRobot, FaTwitter, FaClock } from 'react-icons/fa';

const StatsCard = ({ title, value, subtitle, icon, color = 'blue' }) => {
  return (
    <Card variant="elevated">
      <CardBody>
        <HStack spacing={4}>
          <Box 
            color={`${color}.500`} 
            fontSize="3xl"
            p={2}
            borderRadius="lg"
            bg={`${color}.50`}
          >
            {icon}
          </Box>
          <Stat>
            <StatLabel fontSize="sm" fontWeight="600" color="gray.600">
              {title}
            </StatLabel>
            <StatNumber fontSize="2xl" fontWeight="800" color={`${color}.600`}>
              {value}
            </StatNumber>
            {subtitle && (
              <StatHelpText fontSize="xs" color="gray.500">
                {subtitle}
              </StatHelpText>
            )}
          </Stat>
        </HStack>
      </CardBody>
    </Card>
  );
};

const ActivityFeed = ({ activities }) => {
  return (
    <Card variant="elevated">
      <CardBody>
        <Text fontSize="xl" fontWeight="700" mb={6} color="gray.700">
          📊 Recent Activity
        </Text>
        <VStack spacing={4} align="stretch">
          {activities.map((activity, index) => (
            <Box 
              key={index} 
              p={4} 
              bg="gray.50" 
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
              _hover={{
                transform: "translateY(-1px)",
                boxShadow: "elegant",
              }}
              transition="all 0.2s"
            >
              <HStack justify="space-between">
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" fontWeight="600" color="gray.800">
                    {activity.action}
                  </Text>
                  <Text fontSize="xs" color="gray.500" fontWeight="500">
                    {activity.timestamp}
                  </Text>
                </VStack>
                <Badge 
                  colorScheme={activity.status === 'success' ? 'green' : 'red'}
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontWeight="600"
                >
                  {activity.status}
                </Badge>
              </HStack>
            </Box>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
};

const SystemStatus = ({ status }) => {
  const getStatusColor = (service) => {
    return status[service] ? 'green' : 'red';
  };

  const getStatusIcon = (service) => {
    return status[service] ? '🟢' : '🔴';
  };

  return (
    <Card variant="elevated">
      <CardBody>
        <Text fontSize="xl" fontWeight="700" mb={6} color="gray.700">
          ⚡ System Status
        </Text>
        <VStack spacing={4} align="stretch">
          <HStack justify="space-between" p={3} bg="gray.50" borderRadius="lg">
            <HStack>
              <Text fontSize="lg">{getStatusIcon('whisper')}</Text>
              <Text fontWeight="600">Whisper API</Text>
            </HStack>
            <Badge 
              colorScheme={getStatusColor('whisper')}
              px={3}
              py={1}
              borderRadius="full"
              fontWeight="600"
            >
              {status.whisper ? 'Online' : 'Offline'}
            </Badge>
          </HStack>
          <HStack justify="space-between" p={3} bg="gray.50" borderRadius="lg">
            <HStack>
              <Text fontSize="lg">{getStatusIcon('gpt')}</Text>
              <Text fontWeight="600">GPT-4 API</Text>
            </HStack>
            <Badge 
              colorScheme={getStatusColor('gpt')}
              px={3}
              py={1}
              borderRadius="full"
              fontWeight="600"            >
              {status.gpt ? 'Online' : 'Offline'}
            </Badge>
          </HStack>
          <HStack justify="space-between" p={3} bg="gray.50" borderRadius="lg">
            <HStack>
              <Text fontSize="lg">{getStatusIcon('twitter')}</Text>
              <Text fontWeight="600">Twitter API</Text>
            </HStack>
            <Badge 
              colorScheme={getStatusColor('twitter')}
              px={3}
              py={1}
              borderRadius="full"
              fontWeight="600"
            >
              {status.twitter ? 'Online' : 'Offline'}
            </Badge>
          </HStack>
          <HStack justify="space-between" p={3} bg="gray.50" borderRadius="lg">
            <HStack>
              <Text fontSize="lg">{getStatusIcon('database')}</Text>
              <Text fontWeight="600">Database</Text>
            </HStack>
            <Badge 
              colorScheme={getStatusColor('database')}
              px={3}
              py={1}
              borderRadius="full"
              fontWeight="600"
            >
              {status.database ? 'Online' : 'Offline'}
            </Badge>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

const AnalyticsCard = ({ data }) => {
  return (
    <Card variant="elevated">
      <CardBody>
        <Text fontSize="xl" fontWeight="700" mb={6} color="gray.700">
          📈 Processing Analytics
        </Text>
        <VStack spacing={6} align="stretch">
          <Box p={4} bg="green.50" borderRadius="xl" border="1px solid" borderColor="green.200">
            <HStack justify="space-between" mb={3}>
              <Text fontSize="sm" fontWeight="600" color="green.800">
                🎯 Voice Recognition Accuracy
              </Text>
              <Text fontSize="lg" fontWeight="800" color="green.600">
                {data.accuracy}%
              </Text>
            </HStack>
            <Progress 
              value={data.accuracy} 
              colorScheme="green" 
              borderRadius="full"
              size="lg"
              bg="green.100"
            />
          </Box>
          
          <Box p={4} bg="blue.50" borderRadius="xl" border="1px solid" borderColor="blue.200">
            <HStack justify="space-between" mb={3}>
              <Text fontSize="sm" fontWeight="600" color="blue.800">
                ⚡ Average Processing Time
              </Text>
              <Text fontSize="lg" fontWeight="800" color="blue.600">
                {data.avgProcessTime}s
              </Text>
            </HStack>
            <Progress 
              value={(10 - data.avgProcessTime) * 10} 
              colorScheme="blue" 
              borderRadius="full"
              size="lg"
              bg="blue.100"
            />          </Box>
          
          <Box p={4} bg="purple.50" borderRadius="xl" border="1px solid" borderColor="purple.200">
            <HStack justify="space-between" mb={3}>
              <Text fontSize="sm" fontWeight="600" color="purple.800">
                ✨ Caption Quality Score
              </Text>
              <Text fontSize="lg" fontWeight="800" color="purple.600">
                {data.qualityScore}/10
              </Text>
            </HStack>
            <Progress 
              value={data.qualityScore * 10} 
              colorScheme="purple" 
              borderRadius="full"
              size="lg"
              bg="purple.100"
            />
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export { StatsCard, ActivityFeed, SystemStatus, AnalyticsCard };
