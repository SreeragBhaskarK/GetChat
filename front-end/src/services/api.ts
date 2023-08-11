import axios from 'axios';

// Create an instance of Axios with custom configuration
 const api = axios.create({
    baseURL: 'http://localhost/api/v1', // Replace with your API base URL
    /* timeout: 5000, */
    withCredentials: true
});

// Define your API methods
 const apiMethods = {
    /* user */
    loginUser: (formData:object) => api.post('/user/login', formData),
    signupUser: (formData:object) => api.post('/user/signup', formData),
    forgotPasswordUser:(formData:object)=>api.post('/user/forgot-password',formData),
    logoutUser:()=>api.delete('/user/logout'),
    verification:(formData)=>api.post('/user/email-verification',formData),
    otpVerification:(formData)=>api.post('/user/otp-verification',formData),
    /* admin */
    logoutAdmin:()=>api.delete('/admin/logout'),
    loginAdmin: (formData:object) => api.post('/admin/login', formData),
    getAudienceAdmin:()=>api.get('/admin/audience'),
    deleteAudienceAdmin:(formData)=>api.delete('/admin/audience',formData)
};

export default apiMethods;
