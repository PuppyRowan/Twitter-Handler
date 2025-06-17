import React, { useState } from 'react';
import {
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Textarea,
  Button,
  Card,
  CardBody,
  Select,
  useToast,
  Box,
  Badge,
} from '@chakra-ui/react';
import { audioAPI, handleApiError } from '../services/api';

const TextSubmissionPage = () => {
  const [text, setText] = useState('');
  const [tone, setTone] = useState('auto');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const toast = useToast();  const toneOptions = [
    { value: 'auto', label: 'Auto', description: 'Switches between cruel, teasing, and possessive (30% chance mixed)' },
    { value: 'mixed', label: 'Mixed', description: 'Combine multiple tones' },
    { value: 'cruel', label: 'Cruel', description: 'Sharp, degrading, humiliating' },
    { value: 'clinical', label: 'Clinical', description: 'Cold, analytical, detached' },
    { value: 'teasing', label: 'Teasing', description: 'Playful, taunting, mischievous' },
    { value: 'possessive', label: 'Possessive', description: 'Claiming, protective, intense' },
  ];

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast({
        title: "No text provided",
        description: "Please enter some text to process",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsProcessing(true);
    try {
      const response = await audioAPI.submitText({
        text: text.trim(),
        tone,
      });

      setResult(response.data);
      toast({
        title: "Text processed successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      handleApiError(error, toast);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setText('');
    setResult(null);
  };

  const getToneColor = (toneValue) => {
    switch (toneValue) {
      case 'cruel': return 'red';
      case 'clinical': return 'blue';
      case 'teasing': return 'purple';
      case 'possessive': return 'pink';
      default: return 'gray';
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Heading size="lg" mb={2}>Text Submission</Heading>
          <Text color="gray.600">
            Submit text directly for caption generation
          </Text>
        </Box>

        <Card>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="bold" mb={2}>Input Text:</Text>
                <Textarea
                  placeholder="Enter the text you want to process..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={6}
                  resize="vertical"
                />
                <Text fontSize="xs" color="gray.500" mt={1}>
                  {text.length} characters
                </Text>
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>Tone Selection:</Text>
                <Select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  bg="white"
                >
                  {toneOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} - {option.description}
                    </option>
                  ))}
                </Select>
                <Badge colorScheme={getToneColor(tone)} mt={2}>
                  Selected: {toneOptions.find(t => t.value === tone)?.label}
                </Badge>
              </Box>

              <HStack spacing={3}>
                <Button
                  colorScheme="blue"
                  onClick={handleSubmit}
                  isLoading={isProcessing}
                  loadingText="Processing..."
                  disabled={!text.trim()}
                  flex={1}
                >
                  Generate Caption
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClear}
                  disabled={!text && !result}
                >
                  Clear
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {result && (
          <Card>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontWeight="bold" mb={2}>Generated Caption:</Text>
                  <Box
                    p={4}
                    bg="twitter.50"
                    borderRadius="md"
                    border="1px solid"
                    borderColor="twitter.200"
                  >
                    <Text>{result.caption}</Text>
                  </Box>
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    {result.caption?.length || 0}/280 characters
                  </Text>
                </Box>

                {result.metadata && (
                  <Box>
                    <Text fontWeight="bold" mb={2}>Processing Info:</Text>
                    <HStack spacing={4} fontSize="sm" color="gray.600">
                      <Text>Tone: <Badge colorScheme={getToneColor(result.metadata.tone)}>{result.metadata.tone}</Badge></Text>
                      <Text>Processing Time: {result.metadata.processing_time}s</Text>
                      <Text>Queue ID: #{result.metadata.queue_id}</Text>
                    </HStack>
                  </Box>
                )}

                <HStack spacing={3}>
                  <Button
                    colorScheme="green"
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Feature coming soon",
                        description: "Direct posting will be available in the next update",
                        status: "info",
                        duration: 3000,
                        isClosable: true,
                      });
                    }}
                  >
                    Post to Twitter
                  </Button>
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(result.caption);
                      toast({
                        title: "Copied to clipboard",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                      });
                    }}
                  >
                    Copy Caption
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        )}
      </VStack>
    </Container>
  );
};

export default TextSubmissionPage;
