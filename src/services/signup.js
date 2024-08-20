// services/apiService.js

import axios from 'axios';

// Base URL for your API
const BASE_URL = 'http://127.0.0.1:8000/api';

// Function to send a POST request
export const createUser = (userData) => {
    console.log('Sending data:', userData); // Log the data being sent

    const data = {
        name: userData?.name,
        email: userData?.email
    };

    return axios.post(`${BASE_URL}/signup`, data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        console.log('Response received:', response.data); // Log the response data
        return response.data; // Return response data
    })
    .catch(error => {
        // console.error('Error creating user:', error.message); // Log error message
        if (error.response) {
            // console.error('Response data:', error.response.data);
            // console.error('Response status:', error.response.status);
            // console.error('Response headers:', error.response.headers);
            if (error?.response?.data?.errors.hasOwnProperty('email')) {
                console.error('Specific property exists :', error.response.data.errors.email[0]);
            }
        } else if (error.request) {
            console.error('Request data:', error.request);
        }
        // throw error; // Rethrow the error for further handling
        return error.response.data.errors
    });
};
