import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { signIn } from 'aws-amplify/auth';
import { Flex, Heading, Button, TextField, Text, Card } from '@aws-amplify/ui-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await signIn({ username, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign in');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Card variation="elevated">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="1rem">
            <Heading level={3}>Care Management System</Heading>

            {error && (
              <Text variation="error">
                {error}
              </Text>
            )}

            <TextField
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variation="primary"
              isLoading={isSubmitting}
              loadingText="Signing in..."
              size="large"
            >
              Sign in
            </Button>
          </Flex>
        </form>
      </Card>
    </Flex>
  );
};

export default Login;
