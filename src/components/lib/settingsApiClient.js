// ============================================
// FILE: lib/settingsApiClient.js
// Purpose: Settings & FAQ API Client Functions
// All endpoints come from API_ENDPOINTS in api.js
// Token is read from cookie (key: "token") — same as apiClient.js
// ============================================

import { API_ENDPOINTS } from "./api";

// ─────────────────────────────────────────────────────────────
// INTERNAL HELPERS  (mirrors apiClient.js pattern exactly)
// ─────────────────────────────────────────────────────────────

/** Read token from cookie — same logic as apiClient.js */
const getTokenFromCookie = () => {
  if (typeof document === "undefined") return null; // SSR guard
  const name = "token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length);
    }
  }
  return null;
};

/** Build auth headers — throws if no token found */
const getAuthHeaders = () => {
  const token = getTokenFromCookie();
  if (!token) throw new Error("Session expired. Please login again.");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

/**
 * Parse response — throws a readable error on non-2xx.
 * Handles 204 No Content gracefully.
 * Mirrors 401 handling from apiClient.js (clears bad cookie).
 */
const handleResponse = async (res) => {
  if (res.status === 204) return { success: true };

  const data = await res.json().catch(() => null);

  if (res.status === 401) {
    // Clear bad token — same as apiClient.js
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    throw new Error("Session expired. Please login again.");
  }

  if (!res.ok) {
    const message =
      data?.message || data?.detail || `Request failed [${res.status}]`;
    throw new Error(message);
  }

  return data;
};

// ─────────────────────────────────────────────────────────────
// SETTINGS — Privacy / Terms / About Us
// ─────────────────────────────────────────────────────────────

/**
 * GET /api/settings/
 * Returns raw array of all setting objects.
 */
export const getAllSettings = async () => {
  const res = await fetch(API_ENDPOINTS.SETTINGS.GET_ALL, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

/**
 * GET /api/settings/privacy-policy/
 * Returns { id, settings_type, title, content, ... }
 */
export const getPrivacyPolicy = async () => {
  const res = await fetch(API_ENDPOINTS.SETTINGS.PRIVACY_POLICY, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  const data = await handleResponse(res);
  return data?.data ?? data;
};

/**
 * GET /api/settings/terms-and-conditions/
 * Returns { id, settings_type, title, content, ... }
 */
export const getTermsAndConditions = async () => {
  const res = await fetch(API_ENDPOINTS.SETTINGS.TERMS_AND_CONDITIONS, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  const data = await handleResponse(res);
  return data?.data ?? data;
};

/**
 * GET /api/settings/about-us/
 * Returns { id, settings_type, title, content, ... }
 */
export const getAboutUs = async () => {
  const res = await fetch(API_ENDPOINTS.SETTINGS.ABOUT_US, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  const data = await handleResponse(res);
  return data?.data ?? data;
};

/**
 * PUT /api/settings/update/{type}/
 *
 * @param {"privacy" | "terms" | "about_us"} type
 * @param {{ content: string, title?: string }} payload
 */
export const updateSetting = async (type, payload) => {
  const res = await fetch(API_ENDPOINTS.SETTINGS.UPDATE(type), {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await handleResponse(res);
  return data?.data ?? data;
};

// ─────────────────────────────────────────────────────────────
// TAB ↔ API MAPPING  (used by SettingsPage component)
// ─────────────────────────────────────────────────────────────

const TAB_FETCHER_MAP = {
  "privacy-security": getPrivacyPolicy,
  "terms-conditions": getTermsAndConditions,
  "about-us":         getAboutUs,
};

const TAB_TYPE_MAP = {
  "privacy-security": "privacy",
  "terms-conditions": "terms",
  "about-us":         "about_us",
};

/**
 * Fetch content for a given SettingsPage tab key.
 * @param {"privacy-security" | "terms-conditions" | "about-us"} tabId
 */
export const fetchSettingByTab = async (tabId) => {
  const fetcher = TAB_FETCHER_MAP[tabId];
  if (!fetcher) throw new Error(`Unknown tab key: "${tabId}"`);
  return fetcher();
};

/**
 * Save HTML content for a given SettingsPage tab key.
 * @param {"privacy-security" | "terms-conditions" | "about-us"} tabId
 * @param {string} htmlContent  Rich-text HTML from the editor
 */
export const saveSettingByTab = async (tabId, htmlContent) => {
  const type = TAB_TYPE_MAP[tabId];
  if (!type) throw new Error(`Unknown tab key: "${tabId}"`);
  return updateSetting(type, { content: htmlContent });
};

// ─────────────────────────────────────────────────────────────
// FAQ CRUD
// ─────────────────────────────────────────────────────────────

/**
 * GET /api/settings/faq/
 * Returns array of FAQ objects: [{ id, settings_type, title, content, ... }]
 */
export const getAllFaqs = async () => {
  const res = await fetch(API_ENDPOINTS.FAQ.GET_ALL, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  const data = await handleResponse(res);
  return data?.data ?? data;
};

/**
 * POST /api/settings/faq/
 * @param {{ title: string, content: string }} payload
 */
export const createFaq = async (payload) => {
  const res = await fetch(API_ENDPOINTS.FAQ.CREATE, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await handleResponse(res);
  return data?.data ?? data;
};

/**
 * PUT /api/settings/faq/{id}/
 * @param {number} id
 * @param {{ title?: string, content?: string }} payload
 */
export const updateFaq = async (id, payload) => {
  const res = await fetch(API_ENDPOINTS.FAQ.UPDATE(id), {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await handleResponse(res);
  return data?.data ?? data;
};

/**
 * DELETE /api/settings/faq/{id}/
 * @param {number} id
 */
export const deleteFaq = async (id) => {
  const res = await fetch(API_ENDPOINTS.FAQ.DELETE(id), {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(res); // handles 204 No Content
};