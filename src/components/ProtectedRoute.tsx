import React from 'react';
import { Navigate } from 'react-router-dom';
import { View, Loader } from '@aws-amplify/ui-react';
import { useAuth } from '../contexts/AuthContext';
import { flexStyles } from '../styles/customStyles';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredGroup?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredGroup }) => {
  const { isAuthenticated, isLoading, hasPermission } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Loader size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredGroup && !hasPermission(requiredGroup)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
