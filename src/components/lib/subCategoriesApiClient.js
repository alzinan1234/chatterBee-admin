// ============================================
// FILE: lib/subCategoriesApiClient.js
// Purpose: Sub-Categories API client functions
// ============================================

import { API_ENDPOINTS } from "./api";

/**
 * Helper function to get token from cookie
 * @returns {string|null} Token string or null if not found
 */
const getToken = () => {
  if (typeof document === "undefined") return null;
  const tokenCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='));
  return tokenCookie ? tokenCookie.substring(6) : null;
};

/**
 * Helper function to safely parse JSON response
 * Handles HTML responses, malformed JSON, and other errors
 * @param {Response} response - Fetch response object
 * @returns {Promise<Object>} Parsed JSON or error object
 */
const parseResponseSafely = async (response) => {
  try {
    // Get content type
    const contentType = response.headers.get("content-type");
    
    // Check if it's JSON
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error(`[API Error] Non-JSON response (${contentType || 'unknown'}):`);
      console.error(text);
      
      return {
        success: false,
        message: `Invalid response format. Got: ${contentType || 'unknown'}`,
        data: null,
        isNetworkError: true
      };
    }

    // Try to parse JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[API Error] Failed to parse response:", error.message);
    
    return {
      success: false,
      message: `Failed to parse server response: ${error.message}`,
      data: null,
      isNetworkError: true
    };
  }
};

/**
 * Get all sub-categories for a root category
 * @param {number} categoryId - The root category ID (required)
 * @returns {Promise} Response with success status and sub-categories data
 */
export const getSubCategoriesByParent = async (categoryId) => {
  const token = getToken();
  
  if (!token) {
    return {
      success: false,
      data: [],
      message: "No authentication token found. Please login first.",
      isAuthError: true
    };
  }

  if (!categoryId) {
    return {
      success: false,
      data: [],
      message: "Category ID is required"
    };
  }

  try {
    const response = await fetch(
      API_ENDPOINTS.SUB_CATEGORIES.GET_BY_PARENT(categoryId),
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Parse response safely
    const data = await parseResponseSafely(response);

    if (!response.ok) {
      return {
        success: false,
        data: [],
        message: data.message || `Failed to fetch sub-categories (${response.status})`,
        statusCode: response.status
      };
    }

    return {
      success: true,
      data: data.data || [],
      message: data.message || "Sub-categories fetched successfully"
    };
  } catch (error) {
    console.error(`Error fetching sub-categories for category ${categoryId}:`, error);
    return {
      success: false,
      data: [],
      message: `Network error: ${error.message}`,
      isNetworkError: true
    };
  }
};

/**
 * Get single sub-category by ID
 * @param {number} subCategoryId - The sub-category ID to fetch
 * @returns {Promise} Response with success status and sub-category data
 */
export const getSingleSubCategory = async (subCategoryId) => {
  const token = getToken();
  
  if (!token) {
    return {
      success: false,
      data: null,
      message: "No authentication token found",
      isAuthError: true
    };
  }

  if (!subCategoryId) {
    return {
      success: false,
      data: null,
      message: "Sub-Category ID is required"
    };
  }

  try {
    const response = await fetch(
      API_ENDPOINTS.SUB_CATEGORIES.GET_SINGLE(subCategoryId),
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    const data = await parseResponseSafely(response);

    if (!response.ok) {
      return {
        success: false,
        data: null,
        message: data.message || `Failed to fetch sub-category (${response.status})`,
        statusCode: response.status
      };
    }

    return {
      success: true,
      data: data.data || null,
      message: data.message || "Sub-category fetched successfully"
    };
  } catch (error) {
    console.error(`Error fetching sub-category ${subCategoryId}:`, error);
    return {
      success: false,
      data: null,
      message: `Network error: ${error.message}`,
      isNetworkError: true
    };
  }
};

/**
 * Create new sub-category under a root category
 * @param {number} categoryId - The parent category ID (required)
 * @param {string} name - Sub-category name (required)
 * @param {string} color - Hex color code (optional)
 * @param {File} imageFile - Image file for sub-category icon (optional)
 * @param {File} audioFile - Audio file for text-to-speech (optional)
 * @param {boolean} isActive - Whether sub-category is active (optional, default: true)
 * @returns {Promise} Response with success status and created sub-category data
 */
export const createSubCategory = async (
  categoryId,
  name,
  color = "#FF5733",
  imageFile = null,
  audioFile = null,
  isActive = true
) => {
  const token = getToken();
  
  if (!token) {
    return {
      success: false,
      data: null,
      message: "No authentication token found",
      isAuthError: true
    };
  }

  if (!categoryId) {
    return {
      success: false,
      data: null,
      message: "Category ID is required"
    };
  }

  if (!name || !name.trim()) {
    return {
      success: false,
      data: null,
      message: "Sub-category name is required"
    };
  }

  try {
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("color", color);
    formData.append("is_active", isActive);

    if (imageFile) {
      if (imageFile.size > 5 * 1024 * 1024) {
        return {
          success: false,
          data: null,
          message: "Image file size must be less than 5MB"
        };
      }
      formData.append("image_icon", imageFile);
    }

    if (audioFile) {
      if (audioFile.size > 10 * 1024 * 1024) {
        return {
          success: false,
          data: null,
          message: "Audio file size must be less than 10MB"
        };
      }
      formData.append("speak", audioFile);
    }

    const response = await fetch(
      API_ENDPOINTS.SUB_CATEGORIES.CREATE(categoryId),
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      }
    );

    const data = await parseResponseSafely(response);

    if (!response.ok) {
      return {
        success: false,
        data: null,
        message: data.message || `Failed to create sub-category (${response.status})`,
        statusCode: response.status
      };
    }

    return {
      success: true,
      data: data.data || null,
      message: data.message || "Sub-category created successfully"
    };
  } catch (error) {
    console.error("Error creating sub-category:", error);
    return {
      success: false,
      data: null,
      message: `Network error: ${error.message}`,
      isNetworkError: true
    };
  }
};

/**
 * Update existing sub-category
 * @param {number} subCategoryId - The sub-category ID to update (required)
 * @param {string} name - Updated sub-category name
 * @param {string} color - Updated hex color code
 * @param {File} imageFile - New image file (optional)
 * @param {File} audioFile - New audio file (optional)
 * @param {boolean} isActive - Update active status
 * @returns {Promise} Response with success status and updated sub-category data
 */
export const updateSubCategory = async (
  subCategoryId,
  name,
  color = "#FF5733",
  imageFile = null,
  audioFile = null,
  isActive = true
) => {
  const token = getToken();
  
  if (!token) {
    return {
      success: false,
      data: null,
      message: "No authentication token found",
      isAuthError: true
    };
  }

  if (!subCategoryId) {
    return {
      success: false,
      data: null,
      message: "Sub-Category ID is required"
    };
  }

  if (!name || !name.trim()) {
    return {
      success: false,
      data: null,
      message: "Sub-category name is required"
    };
  }

  try {
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("color", color);
    formData.append("is_active", isActive);

    if (imageFile) {
      if (imageFile.size > 5 * 1024 * 1024) {
        return {
          success: false,
          data: null,
          message: "Image file size must be less than 5MB"
        };
      }
      formData.append("image_icon", imageFile);
    }

    if (audioFile) {
      if (audioFile.size > 10 * 1024 * 1024) {
        return {
          success: false,
          data: null,
          message: "Audio file size must be less than 10MB"
        };
      }
      formData.append("speak", audioFile);
    }

    const response = await fetch(
      API_ENDPOINTS.SUB_CATEGORIES.UPDATE(subCategoryId),
      {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      }
    );

    const data = await parseResponseSafely(response);

    if (!response.ok) {
      return {
        success: false,
        data: null,
        message: data.message || `Failed to update sub-category (${response.status})`,
        statusCode: response.status
      };
    }

    return {
      success: true,
      data: data.data || null,
      message: data.message || "Sub-category updated successfully"
    };
  } catch (error) {
    console.error(`Error updating sub-category ${subCategoryId}:`, error);
    return {
      success: false,
      data: null,
      message: `Network error: ${error.message}`,
      isNetworkError: true
    };
  }
};

/**
 * Delete (soft delete) a sub-category by ID
 * @param {number} subCategoryId - The sub-category ID to delete (required)
 * @returns {Promise} Response with success status
 */
export const deleteSubCategory = async (subCategoryId) => {
  const token = getToken();
  
  if (!token) {
    return {
      success: false,
      message: "No authentication token found",
      isAuthError: true
    };
  }

  if (!subCategoryId) {
    return {
      success: false,
      message: "Sub-Category ID is required"
    };
  }

  try {
    const response = await fetch(
      API_ENDPOINTS.SUB_CATEGORIES.DELETE(subCategoryId),
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    // 204 No Content is a successful response for DELETE
    if (response.status === 204) {
      return {
        success: true,
        message: "Sub-category deleted successfully"
      };
    }

    const data = await parseResponseSafely(response);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || `Failed to delete sub-category (${response.status})`,
        statusCode: response.status
      };
    }

    return {
      success: true,
      message: data.message || "Sub-category deleted successfully"
    };
  } catch (error) {
    console.error(`Error deleting sub-category ${subCategoryId}:`, error);
    return {
      success: false,
      message: `Network error: ${error.message}`,
      isNetworkError: true
    };
  }
};

/**
 * Search sub-categories by name (client-side filtering)
 * @param {Array} subCategories - Array of sub-category objects
 * @param {string} searchQuery - Search query string
 * @returns {Array} Filtered sub-categories
 */
export const searchSubCategories = (subCategories, searchQuery) => {
  if (!searchQuery || !searchQuery.trim()) {
    return subCategories;
  }

  const query = searchQuery.toLowerCase().trim();
  return subCategories.filter(subCat =>
    subCat.name.toLowerCase().includes(query)
  );
};

/**
 * Get sub-categories summary
 * @param {Array} subCategories - Array of sub-category objects
 * @returns {Object} Summary statistics
 */
export const getSubCategoriesSummary = (subCategories) => {
  return {
    total: subCategories.length,
    active: subCategories.filter(sc => sc.is_active).length,
    inactive: subCategories.filter(sc => !sc.is_active).length,
    totalItems: subCategories.reduce((sum, sc) => sum + (sc.items_count || 0), 0)
  };
};

/**
 * Format sub-category for display
 * @param {Object} subCategory - Sub-category object from API
 * @returns {Object} Formatted sub-category object
 */
export const formatSubCategory = (subCategory) => {
  return {
    ...subCategory,
    formattedName: subCategory.name || "Unnamed Sub-Category",
    displayColor: subCategory.color || "#FF5733",
    statusBadge: subCategory.is_active ? "Active" : "Inactive",
    statusColor: subCategory.is_active ? "green" : "gray",
    hasImage: !!subCategory.image_icon,
    hasAudio: !!subCategory.speak,
    itemsText: `${subCategory.items_count || 0} items`
  };
};

// Export all sub-category API functions as object
export const subCategoriesApiClient = {
  getSubCategoriesByParent,
  getSingleSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  searchSubCategories,
  getSubCategoriesSummary,
  formatSubCategory
};

export default subCategoriesApiClient;