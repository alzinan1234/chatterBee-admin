// ============================================
// FILE: config/api.js
// Purpose: Centralized API Configuration & Endpoints
// ============================================

const API_BASE_URL = "https://shoppassport.onrender.com";

export const API_ENDPOINTS = {
  // Authentication Endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login/`,
    SEND_OTP: `${API_BASE_URL}/api/auth/resend-otp/`,
    VERIFY_OTP: `${API_BASE_URL}/api/auth/password/reset-verify-otp/`,
    RESET_PASSWORD: `${API_BASE_URL}/api/auth/password/reset-confirm/`,
    CHANGE_PASSWORD: `${API_BASE_URL}/api/auth/password/change/`,
    VERIFY_EMAIL: `${API_BASE_URL}/api/auth/verify-email/`,
    RESET_PASSWORD_REQUEST: `${API_BASE_URL}/api/auth/password/reset-request/`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout/`,
  },
  

//    // User Management Endpoints
//   USER_MANAGEMENT: {
//     GET_ALL_USERS: `${API_BASE_URL}/api/auth/admin/users/`,
//     GET_USER_DETAILS: `${API_BASE_URL}/api/auth/admin/users/{{USER_ID}}/`,
//     BLOCK_USER: `${API_BASE_URL}/api/auth/admin/users/block/`,
//     UNBLOCK_USER: `${API_BASE_URL}/api/auth/admin/users/unblock/`,
//   },

//   EVENTS: {
//     GET_PROPOSALS: `${API_BASE_URL}/api/shopadmin/admin/events/proposals/`,
//     GET_DETAILS: (id) => `${API_BASE_URL}/api/shopadmin/admin/events/${id}/`,
//     APPROVE_REJECT: (id) => `${API_BASE_URL}/api/shopadmin/admin/events/${id}/approve-reject/`,
//   },

//   USER_PROFILE: {
//   GET: `${API_BASE_URL}/api/auth/profile/`, //
//   UPDATE: `${API_BASE_URL}/api/auth/profile/`, //
// },


// LEGAL: {
//     GET_SETTINGS: `${API_BASE_URL}/api/core/settings/`, //
//     UPDATE_SETTING: (slug) => `${API_BASE_URL}/api/core/settings/${slug}/`, //
//   }


};

export default API_BASE_URL;