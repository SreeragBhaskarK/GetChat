import axios from 'axios';

// Create an instance of Axios with custom configuration
const api = axios.create({
    baseURL: 'https://localhost:3000/api', // Replace with your API base URL
    timeout: 5000, // Set a timeout (in milliseconds) for requests
});

// Define your API methods
const apiMethods = {
    /* user */
    loginUser: (formData:object) => api.post('/login', formData),
    signupUser: (formData:object) => api.post('/signup', formData),
    
    /* admin */
    loginAdmin: (formData:object) => api.post('/admin/login', formData),
};

export default apiMethods;
