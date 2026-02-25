// ============================================
// FILE: lib/api.js
// Purpose: Centralized API Configuration & Endpoints
// ============================================

const API_BASE_URL = "https://solve-lined-worker-guards.trycloudflare.com";

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
  // Category Endpoints
  // ============================================
  CATEGORIES: {
    // Get all root categories
    GET_ALL_ROOT_CATEGORIES: `${API_BASE_URL}/api/dashboard/admin/categories/`,

    // Create root category
    CREATE_ROOT_CATEGORY: `${API_BASE_URL}/api/dashboard/admin/categories/`,

    // Get single category
    GET_SINGLE_CATEGORY: (categoryId) => `${API_BASE_URL}/api/dashboard/admin/categories/${categoryId}/`,

    // Update category
    UPDATE_CATEGORY: (categoryId) => `${API_BASE_URL}/api/dashboard/admin/categories/${categoryId}/`,

    // Delete category (soft delete)
    DELETE_CATEGORY: (categoryId) => `${API_BASE_URL}/api/dashboard/admin/categories/${categoryId}/`,
  },

  // ============================================
  // Sub-Category Endpoints
  // ============================================
  SUB_CATEGORIES: {
    // Get all sub-categories for a root category
    GET_BY_PARENT: (categoryId) => `${API_BASE_URL}/api/dashboard/admin/categories/${categoryId}/subcategories/`,

    // Create sub-category under a root category
    CREATE: (categoryId) => `${API_BASE_URL}/api/dashboard/admin/categories/${categoryId}/subcategories/`,

    // Get single sub-category
    GET_SINGLE: (subCategoryId) => `${API_BASE_URL}/api/dashboard/admin/subcategories/${subCategoryId}/`,

    // Update sub-category
    UPDATE: (subCategoryId) => `${API_BASE_URL}/api/dashboard/admin/subcategories/${subCategoryId}/`,

    // Delete sub-category (soft delete)
    DELETE: (subCategoryId) => `${API_BASE_URL}/api/dashboard/admin/subcategories/${subCategoryId}/`,
  },

  // ============================================
  // Category Items / Buttons Endpoints
  // ============================================
  CATEGORY_ITEMS: {
    // Get all items/buttons for a sub-category
    GET_BY_SUB_CATEGORY: (subCategoryId) => `${API_BASE_URL}/api/dashboard/admin/subcategories/${subCategoryId}/items/`,

    // Create item/button under a sub-category
    CREATE: (subCategoryId) => `${API_BASE_URL}/api/dashboard/admin/subcategories/${subCategoryId}/items/`,

    // Get single item/button
    GET_SINGLE: (itemId) => `${API_BASE_URL}/api/dashboard/admin/items/${itemId}/`,

    // Update item/button
    UPDATE: (itemId) => `${API_BASE_URL}/api/dashboard/admin/items/${itemId}/`,

    // Delete item/button (soft delete)
    DELETE: (itemId) => `${API_BASE_URL}/api/dashboard/admin/items/${itemId}/`,
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
  UNPROCESSABLE_ENTITY: 422,
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
  NO_TOKEN: "No authentication token found. Please login.",
  FILE_TOO_LARGE: "File size exceeds the limit.",
  INVALID_FILE_TYPE: "Invalid file type. Please check the supported formats.",
};

// ============================================
// Export Base URL
// ============================================
export default API_BASE_URL;