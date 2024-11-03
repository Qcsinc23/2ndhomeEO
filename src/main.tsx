import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import { ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import App from './App';
import './index.css';
import config from './aws-exports';

// Configure Amplify
const updatedConfig = {
  ...config,
  ssr: true
};

Amplify.configure(updatedConfig);

const theme = {
  name: 'care-management-theme',
  tokens: {
    colors: {
      background: {
        primary: { value: '#ffffff' },
        secondary: { value: '#f5f5f5' }
      },
      font: {
        interactive: { value: '#2563eb' }
      }
    }
  }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
