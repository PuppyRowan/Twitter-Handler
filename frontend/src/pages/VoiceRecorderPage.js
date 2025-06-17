import React, { useState } from 'react';
import { 
  Container, 
  VStack, 
  Button, 
  Text, 
  Box,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import axios from 'axios';

const VoiceRecorderPage = () => {
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [twitterPost, setTwitterPost] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useToast();

  const recorderControls = useAudioRecorder();

  const addAudioElement = (blob) => {
    setAudioBlob(blob);
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
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.wav');

      // Update API endpoint to match your backend
      const response = await axios.post('http://localhost:8000/submit/audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setTranscription(response.data.transcription || 'Audio received and being processed');
      setTwitterPost(response.data.caption || 'Caption will be generated');
      
      toast({
        title: "Audio processed successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error processing audio",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6}>
        <Text fontSize="2xl" fontWeight="bold">Voice Recorder</Text>
        
        <Box>
          <AudioRecorder 
            onRecordingComplete={addAudioElement}
            recorderControls={recorderControls}
          />
        </Box>

        {audioBlob && (
          <Button
            colorScheme="blue"
            onClick={processAudio}
            isLoading={isProcessing}
            loadingText="Processing..."
          >
            Process Audio
          </Button>
        )}

        {transcription && (
          <Box w="100%">
            <Text fontWeight="bold" mb={2}>Transcription:</Text>
            <Textarea
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
              rows={4}
            />
          </Box>
        )}

        {twitterPost && (
          <Box w="100%">
            <Text fontWeight="bold" mb={2}>Twitter Post:</Text>
            <Textarea
              value={twitterPost}
              onChange={(e) => setTwitterPost(e.target.value)}
              rows={4}
              bg="twitter.50"
            />
            <Text fontSize="sm" color="gray.500" mt={1}>
              {twitterPost.length}/280 characters
            </Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default VoiceRecorderPage;