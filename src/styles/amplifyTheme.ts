import { Theme } from '@aws-amplify/ui-react';

export const theme: Theme = {
  name: 'care-management-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: { value: '#f0f9ff' },
          20: { value: '#e0f2fe' },
          40: { value: '#38bdf8' },
          60: { value: '#0284c7' },
          80: { value: '#075985' },
          90: { value: '#0c4a6e' },
          100: { value: '#082f49' }
        }
      },
      neutral: {
        10: { value: '#f9fafb' },
        20: { value: '#f3f4f6' },
        40: { value: '#9ca3af' },
        60: { value: '#4b5563' },
        80: { value: '#1f2937' },
        90: { value: '#111827' },
        100: { value: '#030712' }
      }
    },
    components: {
      button: {
        borderRadius: { value: '0.375rem' },
        primary: {
          backgroundColor: { value: '{colors.brand.primary.60}' },
          color: { value: 'white' },
          _hover: {
            backgroundColor: { value: '{colors.brand.primary.80}' }
          },
          _active: {
            backgroundColor: { value: '{colors.brand.primary.90}' }
          },
          _disabled: {
            backgroundColor: { value: '{colors.brand.primary.20}' }
          }
        }
      },
      card: {
        backgroundColor: { value: 'white' },
        borderRadius: { value: '0.5rem' }
      },
      text: {
        color: { value: '{colors.neutral.100}' }
      },
      badge: {
        borderRadius: { value: '9999px' }
      }
    }
  }
};
