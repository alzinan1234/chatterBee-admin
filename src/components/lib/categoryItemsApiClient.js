// ============================================
// FILE: lib/categoryItemsApiClient.js
// Purpose: Category Items/Buttons API client functions
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
 * Get all items/buttons for a sub-category
 * @param {number} subCategoryId - The sub-category ID (required)
 * @returns {Promise} Response with success status and items data
 */
export const getItemsBySubCategory = async (subCategoryId) => {
  const token = getToken();
  
  if (!token) {
    return {
      success: false,
      data: [],
      message: "No authentication token found. Please login first.",
      isAuthError: true
    };
  }

  if (!subCategoryId) {
    return {
      success: false,
      data: [],
      message: "Sub-Category ID is required"
    };
  }

  try {
    const response = await fetch(
      API_ENDPOINTS.CATEGORY_ITEMS.GET_BY_SUB_CATEGORY(subCategoryId),
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
        data: [],
        message: data.message || `Failed to fetch items (${response.status})`,
        statusCode: response.status
      };
    }

    return {
      success: true,
      data: data.data || [],
      message: data.message || "Items fetched successfully"
    };
  } catch (error) {
    console.error(`Error fetching items for sub-category ${subCategoryId}:`, error);
    return {
      success: false,
      data: [],
      message: `Network error: ${error.message}`,
      isNetworkError: true
    };
  }
};

/**
 * Get single item/button by ID
 * @param {number} itemId - The item ID to fetch
 * @returns {Promise} Response with success status and item data
 */
export const getSingleItem = async (itemId) => {
  const token = getToken();
  
  if (!token) {
    return {
      success: false,
      data: null,
      message: "No authentication token found",
      isAuthError: true
    };
  }

  if (!itemId) {
    return {
      success: false,
      data: null,
      message: "Item ID is required"
    };
  }

  try {
    const response = await fetch(
      API_ENDPOINTS.CATEGORY_ITEMS.GET_SINGLE(itemId),
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
        message: data.message || `Failed to fetch item (${response.status})`,
        statusCode: response.status
      };
    }

    return {
      success: true,
      data: data.data || null,
      message: data.message || "Item fetched successfully"
    };
  } catch (error) {
    console.error(`Error fetching item ${itemId}:`, error);
    return {
      success: false,
      data: null,
      message: `Network error: ${error.message}`,
      isNetworkError: true
    };
  }
};

/**
 * Create new item/button under a sub-category
 * @param {number} subCategoryId - The sub-category ID (required)
 * @param {string} word - Item/button name (required)
 * @param {string} speakAs - Text to speak (optional)
 * @param {string} color - Hex color code (optional)
 * @param {File} imageFile - Image file for item icon (optional)
 * @param {File} audioFile - Audio file for item (optional)
 * @param {boolean} isActive - Whether item is active (optional, default: true)
 * @returns {Promise} Response with success status and created item data
 */
export const createItem = async (
  subCategoryId,
  word,
  speakAs = "",
  color = "#FFD700",
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

  if (!word || !word.trim()) {
    return {
      success: false,
      data: null,
      message: "Item/Button word is required"
    };
  }

  try {
    const formData = new FormData();
    formData.append("word", word.trim());
    formData.append("color", color);
    formData.append("is_active", isActive);
    
    if (speakAs && speakAs.trim()) {
      formData.append("speak_as", speakAs.trim());
    }

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
      API_ENDPOINTS.CATEGORY_ITEMS.CREATE(subCategoryId),
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
        message: data.message || `Failed to create item (${response.status})`,
        statusCode: response.status
      };
    }

    return {
      success: true,
      data: data.data || null,
      message: data.message || "Item created successfully"
    };
  } catch (error) {
    console.error("Error creating item:", error);
    return {
      success: false,
      data: null,
      message: `Network error: ${error.message}`,
      isNetworkError: true
    };
  }
};

/**
 * Update existing item/button
 * @param {number} itemId - The item ID to update (required)
 * @param {string} word - Updated item/button name
 * @param {string} speakAs - Updated text to speak
 * @param {string} color - Updated hex color code
 * @param {File} imageFile - New image file (optional)
 * @param {File} audioFile - New audio file (optional)
 * @param {boolean} isActive - Update active status
 * @returns {Promise} Response with success status and updated item data
 */
export const updateItem = async (
  itemId,
  word,
  speakAs = "",
  color = "#FFD700",
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

  if (!itemId) {
    return {
      success: false,
      data: null,
      message: "Item ID is required"
    };
  }

  if (!word || !word.trim()) {
    return {
      success: false,
      data: null,
      message: "Item/Button word is required"
    };
  }

  try {
    const formData = new FormData();
    formData.append("word", word.trim());
    formData.append("color", color);
    formData.append("is_active", isActive);
    
    if (speakAs && speakAs.trim()) {
      formData.append("speak_as", speakAs.trim());
    }

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
      API_ENDPOINTS.CATEGORY_ITEMS.UPDATE(itemId),
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
        message: data.message || `Failed to update item (${response.status})`,
        statusCode: response.status
      };
    }

    return {
      success: true,
      data: data.data || null,
      message: data.message || "Item updated successfully"
    };
  } catch (error) {
    console.error(`Error updating item ${itemId}:`, error);
    return {
      success: false,
      data: null,
      message: `Network error: ${error.message}`,
      isNetworkError: true
    };
  }
};

/**
 * Delete (soft delete) an item/button by ID
 * @param {number} itemId - The item ID to delete (required)
 * @returns {Promise} Response with success status
 */
export const deleteItem = async (itemId) => {
  const token = getToken();
  
  if (!token) {
    return {
      success: false,
      message: "No authentication token found",
      isAuthError: true
    };
  }

  if (!itemId) {
    return {
      success: false,
      message: "Item ID is required"
    };
  }

  try {
    const response = await fetch(
      API_ENDPOINTS.CATEGORY_ITEMS.DELETE(itemId),
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
        message: "Item deleted successfully"
      };
    }

    const data = await parseResponseSafely(response);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || `Failed to delete item (${response.status})`,
        statusCode: response.status
      };
    }

    return {
      success: true,
      message: data.message || "Item deleted successfully"
    };
  } catch (error) {
    console.error(`Error deleting item ${itemId}:`, error);
    return {
      success: false,
      message: `Network error: ${error.message}`,
      isNetworkError: true
    };
  }
};

/**
 * Search items/buttons by name (client-side filtering)
 * @param {Array} items - Array of item objects
 * @param {string} searchQuery - Search query string
 * @returns {Array} Filtered items
 */
export const searchItems = (items, searchQuery) => {
  if (!searchQuery || !searchQuery.trim()) {
    return items;
  }

  const query = searchQuery.toLowerCase().trim();
  return items.filter(item =>
    item.word.toLowerCase().includes(query) ||
    (item.speak && item.speak.toLowerCase().includes(query))
  );
};

/**
 * Sort items by field
 * @param {Array} items - Array of item objects
 * @param {string} field - Field to sort by (word, color, created_at, etc.)
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted items
 */
export const sortItems = (items, field = "word", order = "asc") => {
  const sorted = [...items].sort((a, b) => {
    const valueA = a[field];
    const valueB = b[field];

    if (typeof valueA === "string") {
      return order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return order === "asc"
      ? valueA - valueB
      : valueB - valueA;
  });

  return sorted;
};

/**
 * Get items summary statistics
 * @param {Array} items - Array of item objects
 * @returns {Object} Summary statistics
 */
export const getItemsSummary = (items) => {
  return {
    total: items.length,
    active: items.filter(i => i.is_active).length,
    inactive: items.filter(i => !i.is_active).length,
    withAudio: items.filter(i => !!i.speak).length,
    withImage: items.filter(i => !!i.image_icon).length
  };
};

/**
 * Format item/button for display
 * @param {Object} item - Item object from API
 * @returns {Object} Formatted item object
 */
export const formatItem = (item) => {
  return {
    ...item,
    formattedWord: item.word || "Unnamed Item",
    displayColor: item.color || "#FFD700",
    statusBadge: item.is_active ? "Active" : "Inactive",
    statusColor: item.is_active ? "green" : "gray",
    hasImage: !!item.image_icon,
    hasAudio: !!item.speak,
    speakText: item.speak ? "Has audio" : "No audio"
  };
};

// Export all category items API functions as object
export const categoryItemsApiClient = {
  getItemsBySubCategory,
  getSingleItem,
  createItem,
  updateItem,
  deleteItem,
  searchItems,
  sortItems,
  getItemsSummary,
  formatItem
};

export default categoryItemsApiClient;