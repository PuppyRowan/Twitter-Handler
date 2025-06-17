import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    // Enhanced brand palette with better contrast and harmony
    brand: {
      50: '#e8f4fd',
      100: '#bee3fa',
      200: '#90d1f7',
      300: '#62bef4',
      400: '#3facf1',
      500: '#1c9aee', // Primary brand blue
      600: '#1582d1',
      700: '#0f6bb4',
      800: '#0a5497',
      900: '#053d7a',
    },
    
    // Sophisticated handler colors (pink/rose palette)
    handler: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899', // Primary handler pink
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
    },
    
    // Twitter brand colors
    twitter: {
      50: '#e8f5fd',
      100: '#bee3fa',
      200: '#8dd0f7',
      300: '#5bbdf4',
      400: '#2eaaf1',
      500: '#1da1f2', // Official Twitter blue
      600: '#1a8cd8',
      700: '#1677be',
      800: '#1362a4',
      900: '#0f4d8a',
    },
    
    // Enhanced accent colors
    accent: {
      purple: {
        50: '#f3e8ff',
        100: '#e9d5ff',
        200: '#d8b4fe',
        300: '#c084fc',
        400: '#a855f7',
        500: '#9333ea',
        600: '#7c3aed',
        700: '#6d28d9',
        800: '#5b21b6',
        900: '#4c1d95',
      },
      green: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
      },
      orange: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12',
      },
    },
    
    // Semantic colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  fonts: {
    heading: '"Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"Fira Code", "SF Mono", Monaco, Consolas, monospace',
  },
  
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  
  shadows: {
    outline: '0 0 0 3px rgba(236, 72, 153, 0.1)',
    'handler-glow': '0 0 20px rgba(236, 72, 153, 0.3)',
    'brand-glow': '0 0 20px rgba(28, 154, 238, 0.3)',
    'twitter-glow': '0 0 20px rgba(29, 161, 242, 0.3)',
    elegant: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    'elegant-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' 
          ? 'linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%)' 
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
        minHeight: '100vh',
      },
      '*': {
        scrollBehavior: 'smooth',
      },
      '*::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '*::-webkit-scrollbar-track': {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
        borderRadius: 'full',
      },
      '*::-webkit-scrollbar-thumb': {
        bg: props.colorMode === 'dark' ? 'gray.600' : 'gray.400',
        borderRadius: 'full',
        _hover: {
          bg: props.colorMode === 'dark' ? 'gray.500' : 'gray.500',
        },
      },
    }),
  },
  
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'xl',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        _focus: {
          boxShadow: 'outline',
        },
      },
      variants: {
        solid: (props) => ({
          bg: `${props.colorScheme}.500`,
          color: 'white',
          _hover: {
            bg: `${props.colorScheme}.600`,
            transform: 'translateY(-1px)',
            boxShadow: 'elegant',
          },
          _active: {
            transform: 'translateY(0)',
            bg: `${props.colorScheme}.700`,
          },
        }),
        ghost: (props) => ({
          _hover: {
            bg: `${props.colorScheme}.50`,
            transform: 'translateY(-1px)',
          },
          _active: {
            transform: 'translateY(0)',
            bg: `${props.colorScheme}.100`,
          },
        }),
        outline: (props) => ({
          borderColor: `${props.colorScheme}.500`,
          color: `${props.colorScheme}.500`,
          _hover: {
            bg: `${props.colorScheme}.50`,
            transform: 'translateY(-1px)',
            boxShadow: 'elegant',
          },
          _active: {
            transform: 'translateY(0)',
            bg: `${props.colorScheme}.100`,
          },
        }),
        handler: {
          bg: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
          color: 'white',
          _hover: {
            bg: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
            transform: 'translateY(-2px)',
            boxShadow: 'handler-glow',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
        twitter: {
          bg: 'linear-gradient(135deg, #1da1f2 0%, #1677be 100%)',
          color: 'white',
          _hover: {
            bg: 'linear-gradient(135deg, #1677be 0%, #1362a4 100%)',
            transform: 'translateY(-2px)',
            boxShadow: 'twitter-glow',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
      },
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    
    Card: {
      baseStyle: (props) => ({
        container: {
          bg: props.colorMode === 'dark' 
            ? 'whiteAlpha.50' 
            : 'white',
          border: '1px solid',
          borderColor: props.colorMode === 'dark' 
            ? 'whiteAlpha.100' 
            : 'gray.200',
          borderRadius: '2xl',
          p: 6,
          backdropFilter: 'blur(10px)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: 'elegant-lg',
            borderColor: props.colorMode === 'dark' 
              ? 'whiteAlpha.200' 
              : 'gray.300',
          },
        },
      }),
      variants: {
        elevated: (props) => ({
          container: {
            bg: props.colorMode === 'dark' 
              ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)' 
              : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
            boxShadow: 'elegant-lg',
            border: '1px solid',
            borderColor: props.colorMode === 'dark' 
              ? 'whiteAlpha.200' 
              : 'gray.200',
          },
        }),
        handler: (props) => ({
          container: {
            bg: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(219, 39, 119, 0.05) 100%)',
            border: '1px solid',
            borderColor: 'handler.200',
            _hover: {
              borderColor: 'handler.300',
              boxShadow: 'handler-glow',
            },
          },
        }),
      },
    },
    
    Badge: {
      baseStyle: {
        fontWeight: '600',
        fontSize: 'xs',
        borderRadius: 'full',
        px: 3,
        py: 1,
      },
      variants: {
        solid: (props) => ({
          bg: `${props.colorScheme}.500`,
          color: 'white',
        }),
        subtle: (props) => ({
          bg: `${props.colorScheme}.100`,
          color: `${props.colorScheme}.800`,
        }),
        outline: (props) => ({
          color: `${props.colorScheme}.500`,
          border: '1px solid',
          borderColor: `${props.colorScheme}.500`,
        }),
      },
    },
    
    Input: {
      variants: {
        filled: (props) => ({
          field: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.100' : 'gray.50',
            _hover: {
              bg: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.100',
            },
            _focus: {
              bg: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'white',
              borderColor: 'brand.500',
              boxShadow: 'outline',
            },
          },
        }),
      },
      defaultProps: {
        variant: 'filled',
      },
    },
    
    Textarea: {
      variants: {
        filled: (props) => ({
          bg: props.colorMode === 'dark' ? 'whiteAlpha.100' : 'gray.50',
          _hover: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.100',
          },
          _focus: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'white',
            borderColor: 'brand.500',
            boxShadow: 'outline',
          },
        }),
      },
      defaultProps: {
        variant: 'filled',
      },
    },
    
    Tabs: {
      variants: {
        'soft-rounded': (props) => ({
          tab: {
            borderRadius: 'full',
            fontWeight: '600',
            _selected: {
              bg: 'brand.500',
              color: 'white',
            },
            _hover: {
              bg: props.colorMode === 'dark' ? 'whiteAlpha.100' : 'gray.100',
            },
          },
        }),
      },
    },
    
    Progress: {
      baseStyle: (props) => ({
        track: {
          bg: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.200',
        },
        filledTrack: {
          bg: 'linear-gradient(90deg, #ec4899 0%, #1da1f2 100%)',
        },
      }),
    },
    
    Stat: {
      baseStyle: (props) => ({
        container: {
          bg: props.colorMode === 'dark' 
            ? 'whiteAlpha.50' 
            : 'white',
          p: 4,
          borderRadius: 'xl',
          border: '1px solid',
          borderColor: props.colorMode === 'dark' 
            ? 'whiteAlpha.100' 
            : 'gray.200',
        },
      }),
    },
  },
});

export default theme;
