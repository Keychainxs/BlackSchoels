import { useState } from "react";
import { TextField,Button,Box,Typography } from "@mui/material";



const Login = () => {
    const [formData, setFormData] = useState ({
        email: ' ',
        password: ' ',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Call your login API here
            console.log('Login attempt:', formData);
          } catch (error) {
            console.error('Login failed:', error);
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
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
          />
          <Button 
            fullWidth 
            variant="contained" 
            type="submit" 
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
    );
};
export default Login