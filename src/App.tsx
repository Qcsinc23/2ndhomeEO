import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div className="app-container">
                    <Navigation />
                    <div className="main-content">
                      <Dashboard />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/care-plan"
              element={
                <ProtectedRoute requiredGroup="CareProvider">
                  <div className="app-container">
                    <Navigation />
                    <div className="main-content">
                      <CarePlan />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute requiredGroup="CareProvider">
                  <div className="app-container">
                    <Navigation />
                    <div className="main-content">
                      <Appointments />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
