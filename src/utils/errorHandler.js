/**
 * src/utils/errorHandler.js
 * ─────────────────────────────────────────────────────────────────────
 * Utility for extracting clean, user-facing error messages from
 * Axios errors and other thrown values.
 *
 * Usage:
 *   import { getErrorMessage } from "../utils/errorHandler";
 *   catch (err) { toast.error(getErrorMessage(err)); }
 * ─────────────────────────────────────────────────────────────────────
 */

/**
 * Extract a human-readable error message from any error value.
 *
 * Priority order:
 *   1. Backend `error` field  (res.data.error)
 *   2. Backend `message` field (res.data.message)
 *   3. Axios-level error.message (e.g. "Network Error")
 *   4. Provided fallback string
 *   5. Generic fallback
 *
 * @param {unknown} error - The caught error
 * @param {string} [fallback="Something went wrong. Please try again."]
 * @returns {string}
 */
export const getErrorMessage = (
  error,
  fallback = "Something went wrong. Please try again."
) => {
  if (!error) return fallback;

  // Axios response error (backend returned an error body)
  if (error?.response?.data?.error) return error.response.data.error;
  if (error?.response?.data?.message) return error.response.data.message;

  // Network / timeout errors
  if (error?.message === "Network Error") {
    return "Unable to connect to server. Make sure the backend is running.";
  }

  // Standard JS Error
  if (error?.message) return error.message;

  // String thrown directly
  if (typeof error === "string") return error;

  return fallback;
};

/**
 * Returns true if the error is a network connectivity failure.
 * Useful to show a specific "offline" UI.
 * @param {unknown} error
 * @returns {boolean}
 */
export const isNetworkError = (error) =>
  error?.message === "Network Error" || !error?.response;

/**
 * Returns the HTTP status code from an Axios error, or undefined.
 * @param {unknown} error
 * @returns {number|undefined}
 */
export const getStatusCode = (error) => error?.response?.status;
