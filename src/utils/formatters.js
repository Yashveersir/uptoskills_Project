/**
 * src/utils/formatters.js
 * ─────────────────────────────────────────────────────────────────────
 * Shared data-formatting helpers for displaying values in the UI.
 *
 * Centralising these prevents inconsistent date/number formats
 * across different pages or components.
 * ─────────────────────────────────────────────────────────────────────
 */

/**
 * Format an ISO date string to a readable date.
 * @param {string|Date} dateInput
 * @param {Intl.DateTimeFormatOptions} [options]
 * @returns {string}  e.g. "May 20, 2026"
 */
export const formatDate = (dateInput, options = {}) => {
  if (!dateInput) return "—";
  try {
    return new Date(dateInput).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      ...options,
    });
  } catch {
    return String(dateInput);
  }
};

/**
 * Format a number with thousands separators.
 * @param {number|string} value
 * @returns {string}  e.g. "1,200"
 */
export const formatNumber = (value) => {
  const num = Number(value);
  if (isNaN(num)) return String(value);
  return num.toLocaleString("en-US");
};

/**
 * Format a decimal as a percentage string.
 * @param {number} value  e.g. 0.68
 * @param {number} [decimals=0]
 * @returns {string}  e.g. "68%"
 */
export const formatPercent = (value, decimals = 0) =>
  `${(value * 100).toFixed(decimals)}%`;

/**
 * Truncate a string to maxLength characters, appending "…".
 * @param {string} text
 * @param {number} [maxLength=80]
 * @returns {string}
 */
export const truncate = (text, maxLength = 80) => {
  if (!text || text.length <= maxLength) return text || "";
  return text.slice(0, maxLength).trimEnd() + "…";
};

/**
 * Convert a snake_case or camelCase key to a human-readable label.
 * @param {string} key  e.g. "enrollmentLimit"
 * @returns {string}    e.g. "Enrollment Limit"
 */
export const toLabel = (key) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();
