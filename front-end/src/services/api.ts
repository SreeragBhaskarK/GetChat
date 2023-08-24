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
    getProfile: (username) => api.post('/user/profile', username),
    updateProfile: (formData) => api.patch('/user/profile', formData),
    userSearch:(key)=>api.get(`/user/search-user?search=${key}`),
    followUser:(formData)=>api.post('/user/follow',formData),
    unfollowUser:(formData)=>api.post('/user/unfollow',formData),
    getMessage:(formData)=>api.post('/user/get-message',formData),  
    
    /* admin */
    logoutAdmin:()=>api.delete('/admin/logout'),
    loginAdmin: (formData:object) => api.post('/admin/login', formData),
    getAudienceAdmin:()=>api.get('/admin/audience'),
    deleteAudienceAdmin:(formData)=>api.delete('/admin/audience',formData),
    editAudienceAdmin:(formData)=>api.patch('/admin/audience',formData),
    getPostsAdmin:()=>api.get('/admin/posts'),
    deletePostsAdmin:(formData)=>api.delete('/admin/posts',formData),

    /* posts */

    postUpload:(formData:object)=> api.post('/post/posts',formData),
    postUrl:(url:object)=>api.post('/post/post-url',url),
    postLike:(formData)=>api.post('/post/like',formData),
    postUnlike:(formData)=>api.post('/post/unlike',formData),
    postReport:(formData)=>api.post('/post/report',formData),
    getPosts:(formData)=>api.post('/post/post',formData),
    postDelete:(formData)=>api.delete('/post/delete-post',formData),
    getPost:(page,username)=>api.get(`/post/post?page=${page}&&username=${username}`),
    addComment:(formData)=>api.post('/post/comment',formData),
    deleteComment:(formData)=>api.delete('/post/delete-comment',formData),
    editPost:(formData)=>api.post('/post/edit-post',formData)
   
};

export default apiMethods;
