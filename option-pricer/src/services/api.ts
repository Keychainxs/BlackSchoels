import axios from 'axios'; 
import { OptionData } from '../types';

const API_URL = 'http://localhost:8000/api';

const api = axios.create ({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

 export const loginUser = async(email: string, password: string) =>{
    const response = await api.post('/login/', {email, password });

    return response;
 };

 
 export const calculateOption = async(data: OptionData) => {
    const token = localStorage.getItem('token');
    console.log('Sending data to server:', data);
    const response = await api.post('/calculate/', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};


export const registerUser = async(userData:{
    email: string;
    user: string;
    password: string; 
    confirmPassword: string;
}) => {
    const response = await api.post('/register/', userData);
    return response.data;
}





