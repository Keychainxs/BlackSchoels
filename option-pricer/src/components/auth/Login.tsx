import { useState } from "react";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import { useAuth } from '../context/hooks';
import { ErrorAlert } from "../common/ErrorAlert";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const token = await login(formData.email, formData.password);

      authLogin(token);
      navigate("/calculator");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        type="email"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        disabled={isLoading}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
        disabled={isLoading}
      />
      <Button 
        fullWidth 
        variant="contained" 
        type="submit" 
        sx={{ mt: 2 }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Login'}
      </Button>

      <ErrorAlert error={error} onClose={() => setError(null)} />
    </Box>
  );
};

export default Login;