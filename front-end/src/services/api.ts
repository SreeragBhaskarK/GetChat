import axios from 'axios';

// Create an instance of Axios with custom configuration
 const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Replace with your API base URL
    timeout: 5000,
    withCredentials: true
});

// Define your API methods
 const apiMethods = {
    /* user */
    loginUser: (formData:object) => api.post('/auth/login', formData),
    signupUser: (formData:object) => api.post('/auth/signup', formData),
    forgotPasswordUser:(formData:object)=>api.post('/auth/forgot_password',formData),
    logoutUser:()=>api.delete('/auth/logout'),
    /* admin */
    logoutAdmin:()=>api.delete('/auth/admin/logout'),
    loginAdmin: (formData:object) => api.post('/auth/admin/login', formData),
    getAudienceAdmin:()=>api.get('/auth/admin/audience')
};

export default apiMethods;
