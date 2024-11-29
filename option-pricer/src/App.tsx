import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import OptionCalculator from './components/calculator/OptionCalculator';
import { AuthProvider } from './components/context/AuthContext'
import { useAuth } from './components/context/hooks';

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Option Calculator
        </Typography>
        {isAuthenticated ? (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Box>
          <NavBar />
          <Routes>
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/calculator"
              element={
                <ProtectedRoute>
                  <OptionCalculator />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </AuthProvider>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default App;