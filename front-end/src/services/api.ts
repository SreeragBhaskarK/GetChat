import axios from 'axios';
import { useNavigate } from 'react-router-dom';


// Create an instance of Axios with custom configuration
const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1', // Replace with your API base URL
    /* timeout: 5000, */
    withCredentials: true
});
// api.interceptors.response.use(
//     response => response,
//     error => {
//         console.log(error, 'errrhandle');
//         if (error.response) {
//             // Handle error responses
//             return error
//         } else {
//             return error
//             // Handle network errors
//             window.location.href ='/500'
        
//         }
//     }
// )

// Define your API methods
const apiMethods = {
    /* user */
    loginUser: (formData: object) => api.post('/user/login', formData),
    signupUser: (formData: object) => api.post('/user/signup', formData),
    forgotPasswordUser: (formData: object) => api.post('/user/forgot-password', formData),
    logoutUser: () => api.delete('/user/logout'),
    verification: (formData) => api.post('/user/email-verification', formData),
    otpVerification: (formData) => api.post('/user/otp-verification', formData),
    getProfile: (username) => api.post('/user/profile', username),
    updateProfile: (formData) => api.patch('/user/profile', formData),
    userSearch: (key, username) => api.get(`/user/search-user?search=${key}&&username=${username}`),
    followUser: (formData) => api.post('/user/follow', formData),
    unfollowUser: (formData) => api.post('/user/unfollow', formData),
    getMessage: (formData) => api.post('/user/get-message', formData),
    loginGoogle: () => api.get('/user/auth/google'),
    putFollow: (formData) => api.patch('/user/follow', formData),
    deleteFollow: (formData) => api.patch('/user/unfollow', formData),
    removeFollow: (formData) => api.patch('/user/remove-follow', formData),
    chatCreate: (formData) => api.post('/user/chat-create', formData),
    getChats: (userId) => api.get(`/user/find-user-chat/${userId}`),
    changeSeen: (messageId) => api.post('/user/change-seen', messageId),
    getFollowData: (formData) => api.post('/user/get-follows', formData),
    deleteMessage: (id) => api.delete(`/user/delete-message/${id}`),
    deleteChat: (id) => api.delete(`/user/delete-chat/${id}`),
    getNotifications: (username) => api.get(`/user/notifications?username=${username}`),

    /* admin */
    logoutAdmin: () => api.delete('/admin/logout'),
    loginAdmin: (formData: object) => api.post('/admin/login', formData),
    getAudienceAdmin: () => api.get('/admin/audience'),
    deleteAudienceAdmin: (userId) => api.delete(`/admin/audience/${userId}`),
    editAudienceAdmin: (formData) => api.patch('/admin/audience', formData),
    getPostsAdmin: () => api.get('/admin/posts'),
    deletePostsAdmin: (id) => api.delete(`/admin/posts/${id}`),
    sendNotificationAdmin:(formData)=>api.post('/admin/send-notification',formData),
    getNotificationsAdmin:()=>api.get('/admin/notifications'),
    getUserDashboard:(type,target)=>api.get(`/admin/users?type=${type}&&target=${target}`),
    getPostReportsDashboard:(type,target)=>api.get(`/admin/post-reports?type=${type}&&target=${target}`),
    getPopularUsersDashboard:()=>api.get('/admin/popular-users'),
    addAdvertising:(formData)=>api.post('/admin/advertising',formData),
    getAdvertising:()=>api.get('/admin/advertising'),
    updateAdvertising:(formData)=>api.patch('/admin/advertising',formData),
    deleteAdvertising:(id)=>api.delete(`/admin/advertising/'${id}`,),

    /* posts */

    postUpload: (formData: object) => api.post('/post/posts', formData),
    postUrl: (url: object) => api.post('/post/post-url', url),
    postLike: (formData) => api.post('/post/like', formData),
    postUnlike: (formData) => api.post('/post/unlike', formData),
    postReport: (formData) => api.post('/post/report', formData),
    getPosts: (formData) => api.post('/post/post', formData),
    postDelete: (id) => api.delete(`/post/delete-post?id=${id}`),
    getPost: (page, username) => api.get(`/post/post?page=${page}&&username=${username}`),
    addComment: (formData) => api.post('/post/comment', formData),
    deleteComment: (formData) => api.delete('/post/delete-comment', formData),
    editPost: (formData) => api.patch('/post/edit-post', formData),
    getComment: (postId) => api.get(`/post/comment?post_id=${postId}`)

};

export default apiMethods;
