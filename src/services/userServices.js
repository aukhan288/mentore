// services/apiService.js

import axios from 'axios';

// Base URL for your API
const BASE_URL = 'https://app.assignmentmentor.co.uk/public/api';

// const BASE_URL = 'http://127.0.0.1:8000/api';
// Function to send a POST request
export const createUser = async (userData) => {
    console.log('Sending data:', JSON.stringify(userData)); // Log the data being sent

    const data = {
            name:userData?.name,
            email:userData?.email,
            contact:userData?.contact,
            country_code:userData?.country_code,
            country_flag:userData?.country_flag,
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
        console.log('error: ',error?.response?.data);
        
        let err = {
            status:error?.response?.status,
            data:error?.response?.data
        }
        return err; // Return error details as rejected promise
    });
    
};
export const updateUser = async (userData,token) => {
    const data = new FormData();
console.log(userData);

    // Append form data
    data.append('name', userData?.name || '');
    data.append('country_flag', userData?.countryFlag || '');
    data.append('country_code', userData?.countryCode || '');
    data.append('contact', userData?.contact || '');
    data.append('plate_form', userData?.plate_form || '');

    // Check if updatedUserImage is available and append it
    if (userData?.updatedUserImage) {
        // Create a file object for React Native
        const image = {
            uri: userData.updatedUserImage,
            type: 'image/jpeg', // or the actual type of the file
            name: 'image.jpg' // or the actual file name
        };

        data.append('image[0]', image);
    }

    try {
        const response = await axios.put(
            `${BASE_URL}/profile-update/${userData?.id}`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        console.log('Response received:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        let err = {
            status: error.response ? error.response.status : 'Unknown',
            data: error.response ? error.response.data : error.message,
        };
        return Promise.reject(err);
    }
    
};


export const attachmentUpload = async (attachment, token) => {
    const data = new FormData();

    // Check if the attachment is available and append it
    if (attachment) {
        // Ensure `attachment` is a valid object and its properties are available
        const file = {
            uri: attachment.uri,
            type: attachment.type, // Ensure this is the correct MIME type
            name: attachment.name // Ensure this is the correct file name
        };

        data.append('attachment', file);
    } else {
        return Promise.reject({ status: 'No Attachment', data: 'No file provided for upload' });
    }

    try {
        const response = await axios.post(
            `${BASE_URL}/file-upload`,
            data,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        console.log('Response received:', response.data);
        return response.data;
    } catch (error) {
        // Handle and log errors appropriately
        console.error('Error:', error.response ? error.response.data : error.message);
        let err = {
            status: error.response ? error.response.status : 'Unknown',
            data: error.response ? error.response.data : error.message,
        };
        return Promise.reject(err);
    }
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
export const serviceList = async (token) => {

    return axios.get(`${BASE_URL}/serviceList`,  {
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
export const orderList = async (uid,status, token) => {

    return axios.get(`${BASE_URL}/assignmentList/${uid}/${status}`,  {
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
export const assignmentStatusList = async (token) => {

    return axios.get(`${BASE_URL}/assignmentStatusList`,  {
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
export const policy = async (policy, token) => {
console.log(policy, token)

    return axios.get(`${BASE_URL}/policy/${policy}`,  {
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

export const submitOrder = async (assignmentData,token) => {
    console.log(assignmentData);
    
    
    let data={};
    let attachments=[];
    if(assignmentData?.referralCode!='' && assignmentData?.referralCode!=null){
        data.referralCode=assignmentData?.referralCode;
    }
    if(assignmentData?.files?.length>0){
          assignmentData?.files.map(item=>{
            attachments.push(item?.path)
          })
        data.attachments=attachments;
    }
    data.subject=assignmentData?.subject
    data.service=assignmentData?.service?.id
    data.university=assignmentData?.university
    data.referencingStyle=assignmentData?.referencingStyle?.id
    data.educationLevel=assignmentData?.educationLevel?.id
    data.deadline=assignmentData?.deadline
    data.pages=assignmentData?.pages
    data.specificInstruction=assignmentData?.specificInstruction
    console.log('Sending data:', JSON.stringify(data)); // Log the data being sent
  
    return axios.post(`${BASE_URL}/submit-assignment`, data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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