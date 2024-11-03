import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { fetchAuthSession } from 'aws-amplify/auth';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        const session = await fetchAuthSession();
        
        if (currentUser && session.tokens) {
          const groups = session.tokens.accessToken.payload['cognito:groups'] as string[] || [];
          
          setUser({
            username: currentUser.username,
            email: currentUser.signInDetails?.loginId || '',
            groups
          });
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setIsAuthenticated(false);
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
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        signOut: handleSignOut,
        isAuthenticated,
        hasPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
