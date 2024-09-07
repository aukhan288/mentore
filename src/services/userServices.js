// services/apiService.js

import axios from 'axios';

// Base URL for your API
const BASE_URL = 'http://127.0.0.1:8000/api';
// Function to send a POST request
export const createUser = async (userData) => {
    console.log('Sending data:', JSON.stringify(userData)); // Log the data being sent

    const data = {
            name:userData?.name,
            email:userData?.email,
            contact:userData?.contact,
            country_code:userData?.country_code,
            dob:userData?.dob,
            plate_form:userData?.plate_form,
            password:userData?.password,
            // confirmPassword:userData?.password
    };
    console.log(data)
    return axios.post(`${BASE_URL}/signup`, data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        // console.log('Response received:', response); // Log the response data
        return response.data; // Return response data
    })
    .catch(error => {
        console.log('error: ',error.response.data);
        
        let err = {
            status:error.response.status,
            data:error.response.data
        }
        return err; // Return error details as rejected promise
    });
    
};
export const loginUser = async (userData) => {
    console.log('Sending data:', JSON.stringify(userData)); // Log the data being sent

    const data = {
            email:userData?.email,
            password:userData?.password,
            // confirmPassword:userData?.confirmPassword
    };
    console.log('***********',data)
    return axios.post(`${BASE_URL}/login`, data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        // console.log('Response received:', response); // Log the response data
        return response.data; // Return response data
    })
    .catch(error => {
        let err = {
            status:error.response.status,
            data:error.response.data
        }
        return err; // Return error details as rejected promise
    });
    
};
export const userWallet = async (uid,token) => {
console.log('ggggggg',uid, token);

    return axios.get(`${BASE_URL}/user-wallet/${uid}`,  {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
    .then(response => {
        console.log('Response received:', response?.data); // Log the response data
        return response.data; // Return response data
    })
    .catch(error => {
        console.log('error received:', error);
        let err = {
            status:error.response.status,
            data:error.response.data
        }
        return err; // Return error details as rejected promise
    });
    
};
