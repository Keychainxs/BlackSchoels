import axios from 'axios'; 
import { OptionData } from '../types';

const API_URL = 'http://localhost:8000/api';

const api = axios.create ({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'applicatoin/json'
    }
});


 /** 
  * export the login user = async (email and passwords with type string)
  *     create a object repsonse that sends await api post request to ('/login/', {email, passwords})
  *        return response
  * 
  * export const calcuate option = async (data: Optiondata) 
  *     const token  call localStorage.getItem on 'token'
  *     const response  = await api post('/calculate/', data {
  *         headers: {Authorization: `Bearer ${token}`}
  * 
  *         })
  * return response. data
  *
  * 
 */


 export const loginUser = async(email: string, password: string) =>{
    const response = await api.post('/login/', {email, password });

    return response;
 };

 export const calculateOption = async(data: OptionData) => {
    const token = localStorage.getItem('token');
    const response = await api.post('/calculate/', data, {
        headers: {Authorization: `Bearer ${token}`}
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





