import { useState } from "react";
import { TextField, Button, Box, Typography, CircularProgress, Container, Paper } from "@mui/material";
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
   <Container maxWidth="sm">
     <Box sx={{ 
       mt: 8,
       mb: 8,
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center'
     }}>
       <Paper 
         elevation={3}
         sx={{
           p: 4,
           width: '100%',
           borderRadius: 2,
           backgroundColor: '#ffffff',
           boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
         }}
       >
         <Typography 
           variant="h4" 
           gutterBottom
           sx={{
             textAlign: 'center',
             fontWeight: 600,
             color: 'primary.main',
             mb: 4
           }}
         >
           Login
         </Typography>

         <Box component="form" onSubmit={handleSubmit}>
           <TextField
             margin="normal"
             required
             fullWidth
             label="Email"
             type="email"
             autoComplete="email"
             autoFocus
             value={formData.email}
             onChange={e => setFormData({ ...formData, email: e.target.value })}
             disabled={isLoading}
             sx={{ mb: 3 }}
             variant="outlined"
           />
           <TextField
             margin="normal"
             required
             fullWidth
             label="Password"
             type="password"
             autoComplete="current-password"
             value={formData.password}
             onChange={e => setFormData({ ...formData, password: e.target.value })}
             disabled={isLoading}
             sx={{ mb: 4 }}
             variant="outlined"
           />
           <Button 
             fullWidth 
             variant="contained" 
             type="submit" 
             disabled={isLoading}
             sx={{ 
               py: 1.5,
               fontSize: '1rem',
               fontWeight: 500,
               textTransform: 'none',
               boxShadow: 2
             }}
           >
             {isLoading ? <CircularProgress size={24} /> : 'Login'}
           </Button>
         </Box>

         <ErrorAlert error={error} onClose={() => setError(null)} />
       </Paper>
     </Box>
   </Container>
 );
};

export default Login;