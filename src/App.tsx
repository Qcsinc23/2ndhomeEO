import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import CarePlan from './components/CarePlan';
import Appointments from './components/Appointments';
import '@aws-amplify/ui-react/styles.css';
import './App.css';

function App() {
  return (
    <Authenticator.Provider>
      <AuthProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <div className="app-container">
                      <Navigation />
                      <div className="main-content">
                        <Routes>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route
                            path="/care-plan"
                            element={
                              <ProtectedRoute requiredGroup="CareProvider">
                                <CarePlan />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/appointments"
                            element={
                              <ProtectedRoute requiredGroup="CareProvider">
                                <Appointments />
                              </ProtectedRoute>
                            }
                          />
                          <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </Authenticator.Provider>
  );
}

export default App;
