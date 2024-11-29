import { useState } from "react";
import { TextField,Button,Box,Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth";

/** 
 * create a register function 
 * have [form, setFormData] = usetate {email, username, password, confirmPassword)}
 * 
 * Handle sumbit function  
 * Try and catch 
 * 
 * 
 * 
 * 
*/
 


const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          await register(formData);
          navigate("/login");
        } catch (error) {
          console.error("Registration Failed:", error);
        }
    };
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
          <Typography variant="h4" gutterBottom>Register</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            value={formData.username}
            onChange={e => setFormData({ ...formData, username: e.target.value })}
          />
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
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
          <Button 
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </Box>
      );
};








export default Register








