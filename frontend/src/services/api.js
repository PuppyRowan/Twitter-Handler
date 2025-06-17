import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth and logging
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const audioAPI = {
  // Submit audio file for processing
  submitAudio: (audioFile) => {
    const formData = new FormData();
    formData.append('file', audioFile);
    return api.post('/submit/audio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Submit text for processing
  submitText: (text) => {
    return api.post('/submit/text', { text });
  },
};

export const queueAPI = {
  // Get all queue items
  getQueue: () => api.get('/queue'),

  // Get specific queue item
  getQueueItem: (id) => api.get(`/queue/${id}`),

  // Update queue item
  updateQueueItem: (id, data) => api.put(`/queue/${id}`, data),

  // Approve queue item
  approveItem: (id) => api.post(`/queue/${id}/approve`),

  // Reject queue item
  rejectItem: (id) => api.post(`/queue/${id}/reject`),

  // Delete queue item
  deleteItem: (id) => api.delete(`/queue/${id}`),

  // Post to Twitter immediately
  postNow: (id) => api.post(`/queue/${id}/post`),
};

export const systemAPI = {
  // Get system status
  getStatus: () => api.get('/status'),

  // Get analytics
  getAnalytics: () => api.get('/analytics'),

  // Get recent activity
  getActivity: () => api.get('/activity'),
};

export const settingsAPI = {
  // Get settings
  getSettings: () => api.get('/settings'),

  // Update settings
  updateSettings: (settings) => api.put('/settings', settings),
};

// Utility functions
export const handleApiError = (error, toast) => {
  const message = error.response?.data?.message || error.message || 'An error occurred';
  
  toast({
    title: "API Error",
    description: message,
    status: "error",
    duration: 5000,
    isClosable: true,
  });
};

export const uploadProgress = (onProgress) => ({
  onUploadProgress: (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    onProgress(percentCompleted);
  },
});

export default api;
