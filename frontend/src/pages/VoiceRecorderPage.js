import React, { useState } from 'react';
import { 
  Container, 
  VStack, 
  Button, 
  Text, 
  Box,
  Textarea,
  useToast,
  Card,
  CardBody,
  HStack,
  Select,
  Badge,
  Progress,
  Divider,
} from '@chakra-ui/react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { audioAPI, handleApiError, uploadProgress } from '../services/api';

const VoiceRecorderPage = () => {
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [twitterPost, setTwitterPost] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [tone, setTone] = useState('auto');
  const toast = useToast();

  const recorderControls = useAudioRecorder();  const toneOptions = [
    { value: 'auto', label: 'Auto', description: 'Switches between cruel, teasing, and possessive (30% chance mixed)' },
    { value: 'mixed', label: 'Mixed', description: 'Combine multiple tones' },
    { value: 'cruel', label: 'Cruel', description: 'Sharp, degrading, humiliating' },
    { value: 'clinical', label: 'Clinical', description: 'Cold, analytical, detached' },
    { value: 'teasing', label: 'Teasing', description: 'Playful, taunting, mischievous' },
    { value: 'possessive', label: 'Possessive', description: 'Claiming, protective, intense' },
  ];

  const getToneColor = (toneValue) => {
    switch (toneValue) {
      case 'cruel': return 'red';
      case 'clinical': return 'blue';
      case 'teasing': return 'purple';
      case 'possessive': return 'pink';
      default: return 'gray';
    }
  };

  const addAudioElement = (blob) => {
    setAudioBlob(blob);
    toast({
      title: "Recording saved",
      description: "Your audio has been recorded and is ready to process",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const processAudio = async () => {
    if (!audioBlob) {
      toast({
        title: "No recording found",
        description: "Please record audio first",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsProcessing(true);
    setUploadPercent(0);
    
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.wav');
      formData.append('tone', tone);

      const response = await audioAPI.submitAudio(audioBlob, {
        ...uploadProgress(setUploadPercent),
      });

      setTranscription(response.data.transcription || 'Audio received and being processed');
      setTwitterPost(response.data.caption || 'Caption will be generated');
      
      toast({
        title: "Audio processed successfully",
        description: "Transcription and caption have been generated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      handleApiError(error, toast);
    } finally {
      setIsProcessing(false);
      setUploadPercent(0);
    }
  };

  const handleClear = () => {
    setAudioBlob(null);
    setTranscription('');
    setTwitterPost('');
    setUploadPercent(0);
  };
  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Text 
            fontSize="3xl" 
            fontWeight="800" 
            mb={3}
            bgGradient="linear(to-r, handler.500, accent.purple.500)"
            bgClip="text"
          >
            🎤 Voice Recorder
          </Text>
          <Text color="gray.600" fontSize="lg">
            Record your voice and convert it to Twitter-ready posts
          </Text>
        </Box>

        <Card variant="elevated">
          <CardBody>
            <VStack spacing={6}>
              {/* Tone Selection */}
              <Box w="100%">
                <Text fontWeight="700" mb={3} fontSize="lg">Caption Tone:</Text>
                <Select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  size="lg"
                  borderRadius="xl"
                >
                  {toneOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} - {option.description}
                    </option>
                  ))}
                </Select>
                <Badge 
                  colorScheme={getToneColor(tone)} 
                  mt={3}
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                >
                  Selected: {toneOptions.find(t => t.value === tone)?.label}
                </Badge>
              </Box>

              <Divider />

              {/* Audio Recorder */}
              <Box textAlign="center" w="100%">
                <Text fontWeight="700" mb={6} fontSize="lg">Record Your Message:</Text>
                <AudioRecorder 
                  onRecordingComplete={addAudioElement}
                  recorderControls={recorderControls}
                  audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                  }}
                  downloadOnSavePress={false}
                  downloadFileExtension="wav"
                />
              </Box>              {/* Processing Controls */}
              {audioBlob && (
                <VStack spacing={6} w="100%">
                  {isProcessing && uploadPercent > 0 && (
                    <Box w="100%" p={4} bg="gray.50" borderRadius="xl">
                      <Text fontSize="sm" mb={3} fontWeight="600">
                        Uploading... {uploadPercent}%
                      </Text>
                      <Progress 
                        value={uploadPercent} 
                        colorScheme="handler" 
                        borderRadius="full"
                        size="lg"
                      />
                    </Box>
                  )}
                  
                  <HStack spacing={4} w="100%">
                    <Button
                      variant="handler"
                      onClick={processAudio}
                      isLoading={isProcessing}
                      loadingText="Processing..."
                      flex={1}
                      size="lg"
                    >
                      🚀 Process Audio
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleClear}
                      disabled={isProcessing}
                      size="lg"
                      colorScheme="gray"
                    >
                      Clear
                    </Button>
                  </HStack>
                </VStack>
              )}
            </VStack>
          </CardBody>
        </Card>        {/* Results */}
        {transcription && (
          <Card variant="elevated">
            <CardBody>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Text fontWeight="700" mb={3} fontSize="lg" color="gray.700">
                    📝 Transcription:
                  </Text>
                  <Textarea
                    value={transcription}
                    onChange={(e) => setTranscription(e.target.value)}
                    rows={4}
                    borderRadius="xl"
                    fontFamily="mono"
                    fontSize="sm"
                  />
                </Box>

                {twitterPost && (
                  <Box>
                    <Text fontWeight="700" mb={3} fontSize="lg" color="twitter.600">
                      🐦 Generated Tweet:
                    </Text>
                    <Textarea
                      value={twitterPost}
                      onChange={(e) => setTwitterPost(e.target.value)}
                      rows={4}
                      bg="twitter.50"
                      borderColor="twitter.200"
                      borderRadius="xl"
                      fontSize="md"
                      _focus={{
                        borderColor: "twitter.400",
                        boxShadow: "twitter-glow",
                      }}
                    />
                    <HStack justify="space-between" mt={3}>
                      <Text fontSize="sm" color="gray.500" fontWeight="600">
                        {twitterPost.length}/280 characters
                      </Text>
                      <Badge 
                        colorScheme={getToneColor(tone)}
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontWeight="600"
                      >
                        {tone} tone
                      </Badge>
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
                      navigator.clipboard.writeText(twitterPost);
                      toast({
                        title: "Copied to clipboard",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                      });
                    }}
                  >
                    Copy Tweet
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

export default VoiceRecorderPage;