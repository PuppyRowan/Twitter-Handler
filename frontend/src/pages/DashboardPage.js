import React, { useState, useEffect } from 'react';
import {
  Container,
  VStack,
  HStack,
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Button,
  Badge,
  Textarea,
  Grid,
  GridItem,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { 
  FaPlay, 
  FaPause, 
  FaEdit, 
  FaTrash, 
  FaCheck, 
  FaTimes,
  FaClock,
  FaRobot,
  FaTwitter
} from 'react-icons/fa';
import axios from 'axios';

const DashboardPage = () => {
  const [queueItems, setQueueItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editedCaption, setEditedCaption] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Mock data for development - replace with API calls
  useEffect(() => {
    fetchQueueItems();
  }, []);

  const fetchQueueItems = async () => {
    setLoading(true);
    try {
      // Replace with actual API endpoint
      const response = await axios.get('http://localhost:8000/queue');
      setQueueItems(response.data || mockQueueData);
    } catch (error) {
      console.error('Error fetching queue:', error);
      setQueueItems(mockQueueData); // Fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  const mockQueueData = [
    {
      id: 1,
      audio_file: 'recording_001.wav',
      transcription: 'Please Master, I need to be reminded of my place...',
      caption: 'Another needy whimper from @BunnyPupMaple. Such a desperate little thing. 🐾',
      status: 'pending',
      created_at: new Date().toISOString(),
      tone: 'auto'
    },
    {
      id: 2,
      audio_file: 'recording_002.wav',
      transcription: 'I was a good girl today, Master...',
      caption: 'Subject reports compliance. Standard reward protocol pending review. 🎯',
      status: 'approved',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      tone: 'clinical'
    },
    {
      id: 3,
      audio_file: 'recording_003.wav',
      transcription: 'I miss you when you\'re away...',
      caption: 'My little maple leaf misses her Handler. How precious. Soon, pet. 💜',
      status: 'posted',
      created_at: new Date(Date.now() - 7200000).toISOString(),
      tone: 'possessive'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'yellow';
      case 'approved': return 'green';
      case 'rejected': return 'red';
      case 'posted': return 'blue';
      default: return 'gray';
    }
  };
  const getToneColor = (tone) => {
    switch (tone) {
      case 'auto': return 'purple';
      case 'mixed': return 'orange';
      case 'cruel': return 'red';
      case 'clinical': return 'blue';
      case 'teasing': return 'purple';
      case 'possessive': return 'pink';
      default: return 'gray';
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditedCaption(item.caption);
    onOpen();
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:8000/queue/${id}/approve`);
      toast({
        title: "Post approved",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      fetchQueueItems();
    } catch (error) {
      toast({
        title: "Error approving post",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:8000/queue/${id}/reject`);
      toast({
        title: "Post rejected",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      fetchQueueItems();
    } catch (error) {
      toast({
        title: "Error rejecting post",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/queue/${id}`);
      toast({
        title: "Post deleted",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      fetchQueueItems();
    } catch (error) {
      toast({
        title: "Error deleting post",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handlePostNow = async (id) => {
    try {
      await axios.post(`http://localhost:8000/queue/${id}/post`);
      toast({
        title: "Posted to Twitter",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchQueueItems();
    } catch (error) {
      toast({
        title: "Error posting to Twitter",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const saveEdit = async () => {
    try {
      await axios.put(`http://localhost:8000/queue/${selectedItem.id}`, {
        caption: editedCaption
      });
      toast({
        title: "Caption updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
      fetchQueueItems();
    } catch (error) {
      toast({
        title: "Error updating caption",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Flex>
          <Heading size="lg" color="handler.500">
            Handler Dashboard
          </Heading>
          <Spacer />
          <Button onClick={fetchQueueItems} isLoading={loading}>
            Refresh Queue
          </Button>
        </Flex>

        <Tabs>
          <TabList>
            <Tab>Queue ({queueItems.filter(item => item.status === 'pending').length})</Tab>
            <Tab>Approved ({queueItems.filter(item => item.status === 'approved').length})</Tab>
            <Tab>Posted ({queueItems.filter(item => item.status === 'posted').length})</Tab>
            <Tab>All ({queueItems.length})</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <QueueSection 
                items={queueItems.filter(item => item.status === 'pending')}
                onEdit={handleEdit}
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
                onPostNow={handlePostNow}
                formatTime={formatTime}
                getStatusColor={getStatusColor}
                getToneColor={getToneColor}
              />
            </TabPanel>
            <TabPanel>
              <QueueSection 
                items={queueItems.filter(item => item.status === 'approved')}
                onEdit={handleEdit}
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
                onPostNow={handlePostNow}
                formatTime={formatTime}
                getStatusColor={getStatusColor}
                getToneColor={getToneColor}
              />
            </TabPanel>
            <TabPanel>
              <QueueSection 
                items={queueItems.filter(item => item.status === 'posted')}
                onEdit={handleEdit}
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
                onPostNow={handlePostNow}
                formatTime={formatTime}
                getStatusColor={getStatusColor}
                getToneColor={getToneColor}
                readOnly={true}
              />
            </TabPanel>
            <TabPanel>
              <QueueSection 
                items={queueItems}
                onEdit={handleEdit}
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
                onPostNow={handlePostNow}
                formatTime={formatTime}
                getStatusColor={getStatusColor}
                getToneColor={getToneColor}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Caption</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedItem && (
              <VStack spacing={4}>
                <Box w="100%">
                  <Text fontWeight="bold" mb={2}>Original Transcription:</Text>
                  <Text fontSize="sm" color="gray.500" p={3} bg="gray.100" borderRadius="md">
                    {selectedItem.transcription}
                  </Text>
                </Box>
                <Box w="100%">
                  <Text fontWeight="bold" mb={2}>Caption:</Text>
                  <Textarea
                    value={editedCaption}
                    onChange={(e) => setEditedCaption(e.target.value)}
                    rows={4}
                    maxLength={280}
                  />
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    {editedCaption.length}/280 characters
                  </Text>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={saveEdit}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

const QueueSection = ({ 
  items, 
  onEdit, 
  onApprove, 
  onReject, 
  onDelete, 
  onPostNow,
  formatTime,
  getStatusColor,
  getToneColor,
  readOnly = false
}) => {
  if (items.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">No items in this section</Text>
      </Box>
    );
  }

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(400px, 1fr))" gap={4}>
      {items.map((item) => (
        <GridItem key={item.id}>
          <Card>
            <CardHeader>
              <Flex>
                <VStack align="start" spacing={1}>
                  <HStack>
                    <Badge colorScheme={getStatusColor(item.status)}>
                      {item.status.toUpperCase()}
                    </Badge>
                    <Badge colorScheme={getToneColor(item.tone)} variant="outline">
                      {item.tone}
                    </Badge>
                  </HStack>
                  <Text fontSize="xs" color="gray.500">
                    {formatTime(item.created_at)}
                  </Text>
                </VStack>
                <Spacer />
                <Text fontSize="xs" color="gray.400">
                  #{item.id}
                </Text>
              </Flex>
            </CardHeader>
            <CardBody>
              <VStack spacing={3} align="start">
                <Box w="100%">
                  <Text fontSize="sm" fontWeight="bold" mb={1}>Transcription:</Text>
                  <Text fontSize="sm" color="gray.600" bg="gray.50" p={2} borderRadius="md">
                    {item.transcription}
                  </Text>
                </Box>
                
                <Box w="100%">
                  <Text fontSize="sm" fontWeight="bold" mb={1}>Caption:</Text>
                  <Text fontSize="sm" p={2} bg="twitter.50" borderRadius="md">
                    {item.caption}
                  </Text>
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    {item.caption.length}/280 characters
                  </Text>
                </Box>

                {!readOnly && (
                  <HStack spacing={2} w="100%">
                    {item.status === 'pending' && (
                      <>
                        <IconButton
                          icon={<FaCheck />}
                          colorScheme="green"
                          size="sm"
                          onClick={() => onApprove(item.id)}
                          aria-label="Approve"
                        />
                        <IconButton
                          icon={<FaTimes />}
                          colorScheme="red"
                          size="sm"
                          onClick={() => onReject(item.id)}
                          aria-label="Reject"
                        />
                      </>
                    )}
                    
                    {(item.status === 'approved' || item.status === 'pending') && (
                      <IconButton
                        icon={<FaTwitter />}
                        colorScheme="twitter"
                        size="sm"
                        onClick={() => onPostNow(item.id)}
                        aria-label="Post Now"
                      />
                    )}
                    
                    <IconButton
                      icon={<FaEdit />}
                      colorScheme="blue"
                      size="sm"
                      onClick={() => onEdit(item)}
                      aria-label="Edit"
                    />
                    
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme="red"
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(item.id)}
                      aria-label="Delete"
                    />
                  </HStack>
                )}
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
};

export default DashboardPage;
