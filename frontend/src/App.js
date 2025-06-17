import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import VoiceRecorderPage from './pages/VoiceRecorderPage';
import TextSubmissionPage from './pages/TextSubmissionPage';
import DashboardPage from './pages/DashboardPage';
import OverviewPage from './pages/OverviewPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <ErrorBoundary>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/voice-recorder" element={<VoiceRecorderPage />} />
              <Route path="/text-submission" element={<TextSubmissionPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/overview" element={<OverviewPage />} />
            </Routes>
          </Router>
        </ErrorBoundary>
      </ChakraProvider>
    </>
  );
}

export default App;