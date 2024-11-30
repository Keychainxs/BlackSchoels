import { useState } from "react";
import { TextField, Button, Box, Typography, Container, Paper, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth";

const Register = () => {
   const [formData, setFormData] = useState({
       username: '',
       email: '',
       password: '',
       confirmPassword: '',
   });
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const navigate = useNavigate();

   const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
       setIsLoading(true);
       setError(null);
   
       try {
           await register(formData);
           navigate("/login");
       } catch (error) {
           setError("Registration failed. Please try again.");
           console.error("Registration Failed:", error);
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
                       Register
                   </Typography>

                   <Box component="form" onSubmit={handleSubmit}>
                       <TextField
                           margin="normal"
                           required
                           fullWidth
                           label="Username"
                           autoFocus
                           value={formData.username}
                           onChange={e => setFormData({ ...formData, username: e.target.value })}
                           disabled={isLoading}
                           sx={{ mb: 3 }}
                           variant="outlined"
                       />
                       <TextField
                           margin="normal"
                           required
                           fullWidth
                           label="Email"
                           type="email"
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
                           value={formData.password}
                           onChange={e => setFormData({ ...formData, password: e.target.value })}
                           disabled={isLoading}
                           sx={{ mb: 3 }}
                           variant="outlined"
                       />
                       <TextField
                           margin="normal"
                           required
                           fullWidth
                           label="Confirm Password"
                           type="password"
                           value={formData.confirmPassword}
                           onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                           {isLoading ? <CircularProgress size={24} /> : 'Register'}
                       </Button>

                       {error && (
                           <Typography 
                               color="error" 
                               sx={{ 
                                   mt: 2,
                                   textAlign: 'center',
                                   fontWeight: 500 
                               }}
                           >
                               {error}
                           </Typography>
                       )}
                   </Box>
               </Paper>
           </Box>
       </Container>
   );
};

export default Register;