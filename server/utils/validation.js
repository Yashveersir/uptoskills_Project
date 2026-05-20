/**
 * server/utils/validation.js
 * ─────────────────────────────────────────────────────────────────────
 * Consolidated Input Validation & Parsing Utilities
 * ─────────────────────────────────────────────────────────────────────
 */

/**
 * Safely parses a string ID as a positive integer.
 * @param {*} value 
 * @returns {number|null} positive integer or null if invalid
 */
export const parseId = (value) => {
  const id = Number.parseInt(value, 10);
  return Number.isInteger(id) && id > 0 ? id : null;
};

/**
 * Safely parses a positive integer with a fallback.
 * @param {*} value 
 * @param {number} fallback 
 * @returns {number} parsed positive integer or fallback
 */
export const parsePositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

/**
 * Trims whitespace from string values.
 * @param {*} value 
 * @returns {*} trimmed string, or original value if not a string
 */
export const cleanText = (value) => (typeof value === "string" ? value.trim() : value);

/**
 * Cleans and converts an email to lowercase.
 * @param {string} email 
 * @returns {string|*} cleaned lowercase email, or original if not a string
 */
export const normalizeEmail = (email) => {
  const cleaned = cleanText(email);
  return typeof cleaned === "string" ? cleaned.toLowerCase() : cleaned;
};

/**
 * Validates whether the given string is a valid email format.
 * @param {string} email 
 * @returns {boolean} true if valid email format
 */
export const isEmail = (email) => {
  if (typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
