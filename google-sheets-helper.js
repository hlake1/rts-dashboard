/**
 * Google Sheets Helper for RTS Dashboard Feedback
 * Handles silent background writes to Google Sheets via Apps Script
 */

const SHEET_ID = '1XB8ulplXEpakKWeXQtU2IO25LCrvNY4qdaDGy4chVkE';
const FEEDBACK_SHEET_NAME = 'Feedback';

// Apps Script deployment URL - Set this after deploying the Apps Script
// This will be provided as a config constant
let APPS_SCRIPT_DEPLOYMENT_URL = null;

/**
 * Initialize the Google Sheets helper with Apps Script deployment URL
 * @param {string} deploymentUrl - The Apps Script web app deployment URL
 */
function initGoogleSheetsHelper(deploymentUrl) {
    APPS_SCRIPT_DEPLOYMENT_URL = deploymentUrl;
    console.log('[GoogleSheetsHelper] Initialized with deployment URL');
}

/**
 * Write feedback to Google Sheets silently (no page reload)
 * @param {string} guestName - Name of the guest
 * @param {string} reason - Feedback reason (Already booked / Doesn't fit / Oversaturated)
 * @param {string} notes - Optional notes
 * @returns {Promise<{success: boolean, message: string}>}
 */
async function writeFeedbackToSheets(guestName, reason, notes = '') {
    if (!APPS_SCRIPT_DEPLOYMENT_URL) {
        console.error('[GoogleSheetsHelper] Deployment URL not set. Initialize first.');
        return { success: false, message: 'Google Sheets integration not configured' };
    }

    try {
        const timestamp = new Date().toISOString();
        const payload = {
            action: 'addFeedback',
            guestName: guestName,
            reason: reason,
            timestamp: timestamp,
            notes: notes
        };

        const response = await fetch(APPS_SCRIPT_DEPLOYMENT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            mode: 'no-cors' // Allow cross-origin without CORS headers
        });

        console.log(`[GoogleSheetsHelper] Feedback submitted for "${guestName}" (${reason})`);
        
        return {
            success: true,
            message: 'Feedback recorded',
            timestamp: timestamp
        };
    } catch (error) {
        console.error('[GoogleSheetsHelper] Error writing to sheets:', error);
        return {
            success: false,
            message: error.message
        };
    }
}

/**
 * Get feedback statistics from Google Sheets
 * @returns {Promise<{totalFeedback: number, rejectionReasons: object}>}
 */
async function getFeedbackStats() {
    if (!APPS_SCRIPT_DEPLOYMENT_URL) {
        return { totalFeedback: 0, rejectionReasons: {} };
    }

    try {
        const response = await fetch(APPS_SCRIPT_DEPLOYMENT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'getFeedbackStats' }),
            mode: 'no-cors'
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('[GoogleSheetsHelper] Error reading stats:', error);
        return { totalFeedback: 0, rejectionReasons: {} };
    }
}

/**
 * Export feedback data for agent analysis
 * @returns {Promise<Array>} Array of feedback entries
 */
async function exportFeedbackData() {
    if (!APPS_SCRIPT_DEPLOYMENT_URL) {
        return [];
    }

    try {
        const response = await fetch(APPS_SCRIPT_DEPLOYMENT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'exportFeedback' }),
            mode: 'no-cors'
        });

        const data = await response.json();
        return data.feedback || [];
    } catch (error) {
        console.error('[GoogleSheetsHelper] Error exporting feedback:', error);
        return [];
    }
}
