import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  GridItem,
  VStack,
  Heading,
  Text,
  Box,
} from '@chakra-ui/react';
import { FaMicrophone, FaRobot, FaTwitter, FaClock, FaChartLine, FaDatabase } from 'react-icons/fa';
import { 
  StatsCard, 
  ActivityFeed, 
  SystemStatus, 
  AnalyticsCard 
} from '../components/DashboardComponents';
import { systemAPI } from '../services/api';

const OverviewPage = () => {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    pendingItems: 0,
    postsToday: 0,
    avgProcessingTime: 0,
  });

  const [systemStatus, setSystemStatus] = useState({
    whisper: true,
    gpt: true,
    twitter: true,
    database: true,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [analytics, setAnalytics] = useState({
    accuracy: 95,
    avgProcessTime: 3.2,
    qualityScore: 8.7,
  });

  // Mock data for development
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Replace with actual API calls
      setStats({
        totalSubmissions: 247,
        pendingItems: 12,
        postsToday: 8,
        avgProcessingTime: 3.2,
      });

      setRecentActivity([
        {
          action: 'Voice message processed from Maple',
          timestamp: '2 minutes ago',
          status: 'success'
        },
        {
          action: 'Tweet posted to @BunnyPupMaple',
          timestamp: '15 minutes ago',
          status: 'success'
        },        {
          action: 'Caption generated with auto tone selection',
          timestamp: '18 minutes ago',
          status: 'success'
        },
        {
          action: 'Audio transcription completed',
          timestamp: '32 minutes ago',
          status: 'success'
        },
        {
          action: 'Text submission approved',
          timestamp: '1 hour ago',
          status: 'success'
        },
      ]);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={2} color="handler.500">
            System Overview
          </Heading>
          <Text color="gray.600">
            Monitor your Handler system performance and activity
          </Text>
        </Box>

        {/* Stats Grid */}
        <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
          <GridItem>
            <StatsCard
              title="Total Submissions"
              value={stats.totalSubmissions}
              subtitle="All time"
              icon={<FaMicrophone />}
              color="blue"
            />
          </GridItem>
          <GridItem>
            <StatsCard
              title="Pending Review"
              value={stats.pendingItems}
              subtitle="Awaiting approval"
              icon={<FaClock />}
              color="yellow"
            />
          </GridItem>
          <GridItem>
            <StatsCard
              title="Posts Today"
              value={stats.postsToday}
              subtitle="Published to Twitter"
              icon={<FaTwitter />}
              color="twitter"
            />
          </GridItem>
          <GridItem>
            <StatsCard
              title="Avg Processing"
              value={`${stats.avgProcessingTime}s`}
              subtitle="Response time"
              icon={<FaRobot />}
              color="green"
            />
          </GridItem>
        </Grid>

        {/* Main Dashboard Grid */}
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          {/* Activity Feed */}
          <GridItem colSpan={{ base: 12, lg: 6 }}>
            <ActivityFeed activities={recentActivity} />
          </GridItem>

          {/* System Status */}
          <GridItem colSpan={{ base: 12, lg: 6 }}>
            <SystemStatus status={systemStatus} />
          </GridItem>

          {/* Analytics */}
          <GridItem colSpan={{ base: 12, lg: 12 }}>
            <AnalyticsCard data={analytics} />
          </GridItem>
        </Grid>
      </VStack>
    </Container>
  );
};

export default OverviewPage;
