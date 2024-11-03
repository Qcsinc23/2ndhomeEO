import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

interface AuthUser {
  username: string;
  email: string;
  groups: string[];
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  hasPermission: (group?: string) => boolean;
}

// Type for Amplify's user object
interface AmplifyAuthUser {
  username: string;
  attributes?: {
    email?: string;
    [key: string]: any;
  };
  getSignInUserSession?: () => {
    getAccessToken: () => {
      payload: {
        'cognito:groups'?: string[];
        [key: string]: any;
      };
    };
  };
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  signOut: async () => {},
  isAuthenticated: false,
  hasPermission: () => false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { signOut: amplifySignOut, authStatus, user: amplifyUser } = useAuthenticator((context) => [
    context.authStatus,
    context.user
  ]);

  const loadUser = async () => {
    try {
      if (authStatus === 'authenticated' && amplifyUser) {
        const authUser = amplifyUser as AmplifyAuthUser;
        
        // Get user groups from the access token
        const groups = authUser.getSignInUserSession?.()
          ?.getAccessToken()
          ?.payload['cognito:groups'] || [];

        // Get user attributes
        const email = authUser.attributes?.email || '';
        
        setUser({
          username: authUser.username,
          email,
          groups: Array.isArray(groups) ? groups : []
        });
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [authStatus, amplifyUser]);

  const signOut = async () => {
    try {
      await amplifySignOut();
      setUser(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    }
  };

  const hasPermission = (requiredGroup?: string): boolean => {
    if (!user) return false;
    if (!requiredGroup) return true;
    return user.groups.includes(requiredGroup);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      error,
      signOut,
      isAuthenticated: authStatus === 'authenticated',
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};
