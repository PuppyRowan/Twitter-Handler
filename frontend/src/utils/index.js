// Utility functions for the Twitter Handler frontend

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = (now - date) / 1000;
  
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
};

export const formatTime = (dateString) => {
  return new Date(dateString).toLocaleString();
};

export const getToneConfig = (tone) => {
  const configs = {    auto: {
      color: 'purple',
      label: 'Auto',
      description: 'Switches between cruel, teasing, and possessive (30% chance mixed)',
      bgColor: 'purple.50',
      borderColor: 'purple.200',
    },
    mixed: {
      color: 'orange',
      label: 'Mixed',
      description: 'Combine multiple tones',
      bgColor: 'orange.50',
      borderColor: 'orange.200',
    },
    cruel: {
      color: 'red',
      label: 'Cruel',
      description: 'Sharp, degrading, humiliating',
      bgColor: 'red.50',
      borderColor: 'red.200',
    },
    clinical: {
      color: 'blue',
      label: 'Clinical', 
      description: 'Cold, analytical, detached',
      bgColor: 'blue.50',
      borderColor: 'blue.200',
    },
    teasing: {
      color: 'purple',
      label: 'Teasing',
      description: 'Playful, taunting, mischievous',
      bgColor: 'purple.50',
      borderColor: 'purple.200',
    },
    possessive: {
      color: 'pink',
      label: 'Possessive',
      description: 'Claiming, protective, intense',
      bgColor: 'pink.50',
      borderColor: 'pink.200',
    },
  };
  
  return configs[tone] || configs.auto;
};

export const getStatusConfig = (status) => {
  const configs = {
    pending: {
      color: 'yellow',
      label: 'Pending',
      description: 'Awaiting review',
    },
    approved: {
      color: 'green',
      label: 'Approved',
      description: 'Ready to post',
    },
    rejected: {
      color: 'red',
      label: 'Rejected',  
      description: 'Will not be posted',
    },
    posted: {
      color: 'blue',
      label: 'Posted',
      description: 'Published to Twitter',
    },
    processing: {
      color: 'orange',
      label: 'Processing',
      description: 'Being processed',
    },
  };
  
  return configs[status] || configs.pending;
};

export const validateTwitterText = (text) => {
  const errors = [];
  
  if (!text || text.trim().length === 0) {
    errors.push('Text cannot be empty');
  }
  
  if (text.length > 280) {
    errors.push(`Text is too long (${text.length}/280 characters)`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  }
};

export const downloadFile = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getAudioDuration = (file) => {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.addEventListener('loadedmetadata', () => {
      resolve(audio.duration);
    });
    audio.addEventListener('error', () => {
      resolve(0);
    });
    audio.src = URL.createObjectURL(file);
  });
};

export const isValidAudioFile = (file) => {
  const validTypes = [
    'audio/wav',
    'audio/mp3', 
    'audio/mpeg',
    'audio/ogg',
    'audio/webm',
    'audio/m4a',
  ];
  
  return validTypes.includes(file.type);
};

export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

export const localStorage = {
  get: (key, defaultValue = null) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },
};

export const sessionStorage = {
  get: (key, defaultValue = null) => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to sessionStorage:', error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from sessionStorage:', error);
      return false;
    }
  },
};
