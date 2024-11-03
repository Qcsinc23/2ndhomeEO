import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Authenticator,
  View,
  Image,
  Heading,
  useAuthenticator
} from '@aws-amplify/ui-react';
import { useAuth } from '../contexts/AuthContext';
import { flexStyles } from '../styles/customStyles';

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  useEffect(() => {
    if (authStatus === 'authenticated' && user) {
      navigate('/dashboard');
    }
  }, [authStatus, user, navigate]);

  const formFields = {
    signIn: {
      username: {
        placeholder: 'Enter your username',
        isRequired: true,
        label: 'Username'
      },
      password: {
        placeholder: 'Enter your password',
        isRequired: true,
        label: 'Password'
      }
    },
    signUp: {
      username: {
        placeholder: 'Choose a username',
        isRequired: true,
        label: 'Username'
      },
      password: {
        placeholder: 'Create a password',
        isRequired: true,
        label: 'Password'
      },
      confirm_password: {
        placeholder: 'Confirm your password',
        isRequired: true,
        label: 'Confirm Password'
      },
      email: {
        placeholder: 'Enter your email',
        isRequired: true,
        label: 'Email'
      }
    },
    resetPassword: {
      username: {
        placeholder: 'Enter your username',
        isRequired: true,
        label: 'Username'
      }
    },
    confirmResetPassword: {
      confirmation_code: {
        placeholder: 'Enter your code',
        isRequired: true,
        label: 'Confirmation Code'
      },
      password: {
        placeholder: 'Enter your new password',
        isRequired: true,
        label: 'New Password'
      }
    }
  };

  return (
    <View {...flexStyles.centerContainer} height="100vh">
      <View maxWidth="400px" width="90%" padding="medium">
        <View marginBottom="large" textAlign="center">
          <Image
            alt="Logo"
            src="/logo.png"
            height="60px"
            marginBottom="medium"
          />
          <Heading level={3}>Care Management System</Heading>
        </View>

        <Authenticator
          initialState="signIn"
          formFields={formFields}
          hideSignUp={true}
        />
      </View>
    </View>
  );
};

export default Login;
