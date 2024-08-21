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
            country:userData?.country,
            dob:userData?.dob,
            password:userData?.password,
            // confirmPassword:userData?.confirmPassword
    };
    console.log(data)
    return axios.post(`${BASE_URL}/signup`, data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        console.log('Response received:', response); // Log the response data
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
        console.log('Response received:', response); // Log the response data
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
