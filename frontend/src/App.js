import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VoiceRecorderPage from './pages/VoiceRecorderPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/voice-recorder" element={<VoiceRecorderPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;