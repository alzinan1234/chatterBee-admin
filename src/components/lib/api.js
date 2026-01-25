// ============================================
// FILE: lib/api.js
// Purpose: Centralized API Configuration & Endpoints
// ============================================

const API_BASE_URL = "https://musicians-celebs-wing-indicates.trycloudflare.com";

export const API_ENDPOINTS = {
  // ============================================
  // Authentication Endpoints
  // ============================================
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

  // ============================================
  // User Management Endpoints
  // ============================================
  USER_MANAGEMENT: {
    // Get all users with filters
    GET_ALL_USERS: `${API_BASE_URL}/api/dashboard/admin/users/`,

    // Get specific user details
    GET_USER_DETAILS: (userId) => `${API_BASE_URL}/api/dashboard/admin/users/${userId}/`,

    // Block user
    BLOCK_USER: `${API_BASE_URL}/api/dashboard/admin/users/block/`,

    // Unblock user
    UNBLOCK_USER: `${API_BASE_URL}/api/dashboard/admin/users/unblock/`,

    // Soft delete user
    DELETE_USER: `${API_BASE_URL}/api/dashboard/admin/users/delete/`,

    // Restore user
    RESTORE_USER: `${API_BASE_URL}/api/dashboard/admin/users/restore/`,
  },

  // ============================================
  // Dashboard Statistics Endpoints
  // ============================================
  DASHBOARD: {
    // Get admin dashboard statistics
    GET_ADMIN_STATS: `${API_BASE_URL}/api/dashboard/admin/dashboard/stats/`,
    
    // Get user statistics
    GET_USER_STATS: `${API_BASE_URL}/api/dashboard/admin/users/stats/`,
  },

  // ============================================
  // Subscription Endpoints
  // ============================================
  SUBSCRIPTION: {
    // Get all subscriptions (list)
    GET_ALL_SUBSCRIPTIONS: `${API_BASE_URL}/api/dashboard/admin/subscriptions/`,

    // Get subscription by ID
    GET_SUBSCRIPTION_DETAILS: (subscriptionId) => `${API_BASE_URL}/api/dashboard/admin/subscriptions/${subscriptionId}/`,
  },

  // ============================================
  // User Profile Endpoints
  // ============================================
  USER_PROFILE: {
    // Get user profile
    GET: `${API_BASE_URL}/api/auth/profile/`,

    // Update user profile
    UPDATE: `${API_BASE_URL}/api/auth/profile/`,
  },

  // ============================================
  // Events Management Endpoints
  // ============================================
  EVENTS: {
    // Get event proposals
    GET_PROPOSALS: `${API_BASE_URL}/api/shopadmin/admin/events/proposals/`,

    // Get event details
    GET_DETAILS: (eventId) => `${API_BASE_URL}/api/shopadmin/admin/events/${eventId}/`,

    // Approve or reject event
    APPROVE_REJECT: (eventId) => `${API_BASE_URL}/api/shopadmin/admin/events/${eventId}/approve-reject/`,
  },

  // ============================================
  // Legal/Settings Endpoints
  // ============================================
  LEGAL: {
    // Get all settings
    GET_SETTINGS: `${API_BASE_URL}/api/core/settings/`,

    // Update specific setting
    UPDATE_SETTING: (slug) => `${API_BASE_URL}/api/core/settings/${slug}/`,
  },
};

// ============================================
// API Response Status Codes
// ============================================
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// ============================================
// API Error Messages
// ============================================
export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "Session expired. Please login again.",
  FORBIDDEN: "You don't have permission to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "Server error. Please try again later.",
  VALIDATION_ERROR: "Please check your input and try again.",
};

// ============================================
// Export Base URL
// ============================================
export default API_BASE_URL;