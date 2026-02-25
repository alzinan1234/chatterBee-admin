// ============================================
// FILE: lib/categoryApiClient.js
// Purpose: Category-specific API client functions
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
 * Get all root categories with sub-categories and statistics
 * @returns {Promise} Response with success status and categories data
 */
export const getAllRootCategories = async () => {
  const token = getToken();
  
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await fetch(API_ENDPOINTS.CATEGORIES.GET_ALL_ROOT_CATEGORIES, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch categories");
    }

    return {
      success: true,
      data: data.data || [],
      message: data.message || "Categories fetched successfully"
    };
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return {
      success: false,
      data: [],
      message: error.message || "Failed to fetch categories"
    };
  }
};

/**
 * Get single category by ID with its sub-categories and items
 * @param {number} categoryId - The category ID to fetch
 * @returns {Promise} Response with success status and category data
 */
export const getSingleCategory = async (categoryId) => {
  const token = getToken();
  
  if (!token) {
    throw new Error("No authentication token found");
  }

  if (!categoryId) {
    throw new Error("Category ID is required");
  }

  try {
    const response = await fetch(
      API_ENDPOINTS.CATEGORIES.GET_SINGLE_CATEGORY(categoryId),
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch category");
    }

    return {
      success: true,
      data: data.data || null,
      message: data.message || "Category fetched successfully"
    };
  } catch (error) {
    console.error(`Error fetching category ${categoryId}:`, error);
    return {
      success: false,
      data: null,
      message: error.message || "Failed to fetch category"
    };
  }
};

/**
 * Create new root category with optional image and audio files
 * @param {string} name - Category name (required)
 * @param {string} color - Hex color code (optional)
 * @param {File} imageFile - Image file for category icon (optional)
 * @param {File} audioFile - Audio file for text-to-speech (optional)
 * @param {boolean} isActive - Whether category is active (optional, default: true)
 * @returns {Promise} Response with success status and created category data
 */
export const createCategory = async (
  name,
  color = "#FF5733",
  imageFile = null,
  audioFile = null,
  isActive = true
) => {
  const token = getToken();
  
  if (!token) {
    throw new Error("No authentication token found");
  }

  if (!name || !name.trim()) {
    throw new Error("Category name is required");
  }

  try {
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("color", color);
    formData.append("is_active", isActive);

    // Add image file if provided
    if (imageFile) {
      if (imageFile.size > 5 * 1024 * 1024) {
        throw new Error("Image file size must be less than 5MB");
      }
      formData.append("image_icon", imageFile);
    }

    // Add audio file if provided
    if (audioFile) {
      if (audioFile.size > 10 * 1024 * 1024) {
        throw new Error("Audio file size must be less than 10MB");
      }
      formData.append("speak", audioFile);
    }

    const response = await fetch(
      API_ENDPOINTS.CATEGORIES.CREATE_ROOT_CATEGORY,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
          // Don't set Content-Type for FormData, browser will set it with boundary
        },
        body: formData
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create category");
    }

    return {
      success: true,
      data: data.data || null,
      message: data.message || "Category created successfully"
    };
  } catch (error) {
    console.error("Error creating category:", error);
    return {
      success: false,
      data: null,
      message: error.message || "Failed to create category"
    };
  }
};

/**
 * Update existing category with optional new image and audio files
 * @param {number} categoryId - The category ID to update (required)
 * @param {string} name - Updated category name
 * @param {string} color - Updated hex color code
 * @param {File} imageFile - New image file (optional)
 * @param {File} audioFile - New audio file (optional)
 * @param {boolean} isActive - Update active status
 * @returns {Promise} Response with success status and updated category data
 */
export const updateCategory = async (
  categoryId,
  name,
  color = "#FF5733",
  imageFile = null,
  audioFile = null,
  isActive = true
) => {
  const token = getToken();
  
  if (!token) {
    throw new Error("No authentication token found");
  }

  if (!categoryId) {
    throw new Error("Category ID is required");
  }

  if (!name || !name.trim()) {
    throw new Error("Category name is required");
  }

  try {
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("color", color);
    formData.append("is_active", isActive);

    // Add image file if provided
    if (imageFile) {
      if (imageFile.size > 5 * 1024 * 1024) {
        throw new Error("Image file size must be less than 5MB");
      }
      formData.append("image_icon", imageFile);
    }

    // Add audio file if provided
    if (audioFile) {
      if (audioFile.size > 10 * 1024 * 1024) {
        throw new Error("Audio file size must be less than 10MB");
      }
      formData.append("speak", audioFile);
    }

    const response = await fetch(
      API_ENDPOINTS.CATEGORIES.UPDATE_CATEGORY(categoryId),
      {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
          // Don't set Content-Type for FormData, browser will set it with boundary
        },
        body: formData
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update category");
    }

    return {
      success: true,
      data: data.data || null,
      message: data.message || "Category updated successfully"
    };
  } catch (error) {
    console.error(`Error updating category ${categoryId}:`, error);
    return {
      success: false,
      data: null,
      message: error.message || "Failed to update category"
    };
  }
};

/**
 * Delete (soft delete) a category by ID
 * @param {number} categoryId - The category ID to delete (required)
 * @returns {Promise} Response with success status
 */
export const deleteCategory = async (categoryId) => {
  const token = getToken();
  
  if (!token) {
    throw new Error("No authentication token found");
  }

  if (!categoryId) {
    throw new Error("Category ID is required");
  }

  try {
    const response = await fetch(
      API_ENDPOINTS.CATEGORIES.DELETE_CATEGORY(categoryId),
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
        message: "Category deleted successfully"
      };
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete category");
    }

    return {
      success: true,
      message: data.message || "Category deleted successfully"
    };
  } catch (error) {
    console.error(`Error deleting category ${categoryId}:`, error);
    return {
      success: false,
      message: error.message || "Failed to delete category"
    };
  }
};

/**
 * Search categories by name (client-side filtering)
 * @param {Array} categories - Array of category objects
 * @param {string} searchQuery - Search query string
 * @returns {Array} Filtered categories
 */
export const searchCategories = (categories, searchQuery) => {
  if (!searchQuery || !searchQuery.trim()) {
    return categories;
  }

  const query = searchQuery.toLowerCase().trim();
  return categories.filter(category =>
    category.name.toLowerCase().includes(query)
  );
};

/**
 * Sort categories by field
 * @param {Array} categories - Array of category objects
 * @param {string} field - Field to sort by (name, created_at, updated_at, etc.)
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted categories
 */
export const sortCategories = (categories, field = "name", order = "asc") => {
  const sorted = [...categories].sort((a, b) => {
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
 * Get categories count summary
 * @param {Array} categories - Array of category objects
 * @returns {Object} Summary statistics
 */
export const getCategoriesSummary = (categories) => {
  return {
    total: categories.length,
    active: categories.filter(c => c.is_active).length,
    inactive: categories.filter(c => !c.is_active).length,
    deleted: categories.filter(c => c.is_deleted).length,
    totalSubCategories: categories.reduce((sum, c) => sum + (c.sub_categories_count || 0), 0)
  };
};

/**
 * Format category for display
 * @param {Object} category - Category object from API
 * @returns {Object} Formatted category object
 */
export const formatCategory = (category) => {
  return {
    ...category,
    formattedName: category.name || "Unnamed Category",
    displayColor: category.color || "#FF5733",
    statusBadge: category.is_active ? "Active" : "Inactive",
    statusColor: category.is_active ? "green" : "gray",
    hasImage: !!category.image_icon,
    hasAudio: !!category.speak,
    subCategoriesText: `${category.sub_categories_count || 0} sub-categories`
  };
};

// Export all category API functions as object
export const categoryApiClient = {
  getAllRootCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  searchCategories,
  sortCategories,
  getCategoriesSummary,
  formatCategory
};

export default categoryApiClient;