import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import { ThemeProvider, createTheme } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import App from './App';
import './index.css';
import config from './aws-exports';
import { AuthProvider } from './contexts/AuthContext';
import { Authenticator } from '@aws-amplify/ui-react';

Amplify.configure(config);

const theme = createTheme({
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
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Authenticator.Provider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Authenticator.Provider>
    </ThemeProvider>
  </React.StrictMode>
);
