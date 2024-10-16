// services/apiService.js

import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

// Base URL for your API
// const BASE_URL = 'http://127.0.0.1:8000/';
const BASE_URL = 'https://app.assignmentmentor.co.uk/';
const IMAGE_PATH = 'public/';
let token = null;
let udid = null;
let fcmChanelId =null;

export const setToken = (newToken) => {
  token = newToken;
};

export const getToken = () => {
  return token;
};
export const setUdid = (newUdid) => {
  udid = newUdid;
};

export const getUdid = () => {
  return udid;
};
export const setFcmChanelId = (newFcmChanelId) => {
    fcmChanelId = newFcmChanelId;
};

export const getFcmChanelId = () => {
  return fcmChanelId;
};
const API = 'public/api';

// const BASE_URL = 'http://127.0.0.1:8000/api';
export {BASE_URL, IMAGE_PATH, API};
// Function to send a POST request
export const createUser = async (userData) => {
    const fcmToken = await messaging().getToken();


    const data = {
            name:userData?.name,
            email:userData?.email,
            contact:userData?.contact,
            country_code: {
                code: userData?.country_code?.code,
                flag: userData?.country_code?.flag
            },
            dob:userData?.dob,
            plate_form:userData?.plate_form,
            password:userData?.password,
            fcmToken:fcmToken,
            password_confirmation:userData?.password_confirmation
            
    };
    return axios.post(`${BASE_URL+API}/signup`, data, {
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
        console.log('error: ',error);
        
        let err = {
            status:error?.response?.status,
            data:error?.response?.data
        }
        return err; // Return error details as rejected promise
    });
    
};
export const updateUser = async (userData) => {
    const token = getToken();
    const data = new FormData();

    // Append form data
    userData.has('name') && data.append('name', userData?.name || '');
    userData.has('country_code') && data.append('country_code', userData?.countryCode || '');
    userData.has('contact') && data.append('contact', userData?.contact || '');
    userData.has('plate_form') && data.append('plate_form', userData?.plate_form || '');

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
            `${BASE_URL+API}/profile-update/${userData?.id}`,
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


export const attachmentUpload = async (attachment) => {
    const token = getToken();
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
            `${BASE_URL+API}/file-upload`,
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
  
    const fcmToken = await messaging().getToken();
    const data = {
            email:userData?.email,
            password:userData?.password,
            fcmToken:fcmToken,
    };
    console.log('***********',data)
    return axios.post(`${BASE_URL+API}/login`, data, {
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
        console.log('=============',error);
        
        let err = {
            status:error?.response?.status,
            data:error?.response?.data
        }
        return err; // Return error details as rejected promise
    });
    
};
export const userWallet = async (uid) => {
    const token = getToken();

    return axios.get(`${BASE_URL+API}/user-wallet/${uid}`,  {
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
export const serviceList = async () => {
    const token = getToken();
    return axios.get(`${BASE_URL+API}/serviceList`,  {
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
export const getProfile = async () => {
    const token = getToken();
    
    return axios.get(`${BASE_URL+API}/userProfile`,  {
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
export const orderList = async (isCompleted ) => {
    const token = getToken();
console.log(`${BASE_URL+API}/assignmentList/${isCompleted}`);

    return axios.get(`${BASE_URL+API}/assignmentList/${isCompleted}`,  {
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
export const assignmentStatusList = async () => {
    const token = getToken();
    return axios.get(`${BASE_URL+API}/assignmentStatusList`,  {
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
export const policy = async (policy) => {
    const token = getToken();
    console.log(token);
    
    return axios.get(`${BASE_URL+API}/policy/${policy}`,  {
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

export const submitOrder = async (assignmentData) => {
    const token = getToken();
    
    
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
    data.price=assignmentData?.price
    data.specificInstruction=assignmentData?.specificInstruction
    console.log('Sending data:', JSON.stringify(data)); // Log the data being sent
  
    return axios.post(`${BASE_URL+API}/submit-assignment`, data, {
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
export const submitRivision = async (assignmentData) => {
    const token = getToken();
    console.log('&&&&&&&&',assignmentData);
    
    
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
    data.deadline=assignmentData?.deadline
    data.pages=assignmentData?.pages
    data.specificInstruction=assignmentData?.specificInstruction
    console.log('Sending data:', JSON.stringify(data)); // Log the data being sent
  
    return axios.post(`${BASE_URL+API}/submit-revision/${assignmentData?.assignmentId}`, data, {
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
        console.log('error: ',error.response.data);
        
        let err = {
            status:error.response.status,
            data:error.response.data
        }
        return err; // Return error details as rejected promise
    });
    
};

export const getOrdersCounts = async () => {
    const token = getToken();
    
        return axios.get(`${BASE_URL+API}/assignmentCounts`,  {
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

export const getAssignment = async (id) => {
    const token = getToken();
        console.log(token);
        
    return axios.get(`${BASE_URL+API}/assignment/${id}`,  {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
    .then(response => {
        console.log('***************Response received:*************', response?.data); // Log the response data
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

export const rechargeWallet = async (props) => {
    const token = getToken();
    
    
    let data={
        amount:props?.amount,
        cardHolder:props?.cardHolder,
        cvc:props?.cvc,
        cardExpiry:props?.cardExpiry,
        cardNumber:props?.cardNumber
    };
  

    console.log('Sending data:', JSON.stringify(data)); // Log the data being sent
  
    return axios.post(`${BASE_URL+API}/recharge-wallet`, data, {
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

export const assignmentPrice = async (level) => {
    console.log('================$$$$$$$$$$$',level)

    const token = getToken();

    return axios.get(`${BASE_URL+API}/assignment-price/${level?.id}`,  {
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
export const forgotPassword = async (props) => {
    console.log('================$$$$$$$$$$$',props)

    return axios.post(`${BASE_URL+API}/forgot-password`, {email:props?.email}, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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

export const userLogout = async () => {
    console.log('================$$$$$$$$$$$')
    const token = getToken();
    return axios.post(`${BASE_URL+API}/user-logout`,{}, {
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

export const updateProfile = async (props) => {
    const token = getToken();
    

    let data={
        name:props?.name,
        country_code:props?.country_code,
        contact:props?.contact,
        image:props?.image
    };
  

    console.log('Sending data:', JSON.stringify(data)); // Log the data being sent
  
    return axios.post(`${BASE_URL+API}/profile-update/${props?.user_id}`, data, {
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
export const verifyOtp = async (props) => {
  
    return axios.post(`${BASE_URL+API}/verifyOtp`, {email:props?.email,otp:props?.otp}, {
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
export const submitForgotPassword = async (props) => {
    let data ={
        changePassword:props?.changePassword, 
        confirmChangePassword:props?.confirmChangePassword, 
        otp:props?.otp,
        email:props?.email
    }
    console.log(JSON.stringify(data));
    
    return axios.post(`${BASE_URL+API}/changeForgotPassword`, JSON.stringify(data), {
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
export const changePassword = async (props) => {
    const token = getToken();

    let data ={
        current_password:props?.oldPassword, 
        newPassword:props?.newPassword, 
        confirmPassword:props?.newConfirmPassword
    }
    console.log(JSON.stringify(data));
    
    return axios.put(`${BASE_URL+API}/changePassword/${props?.user_id}`, JSON.stringify(data), {
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