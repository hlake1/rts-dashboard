/**
 * Google Apps Script for RTS Dashboard Feedback
 * 
 * Deploy as Web App:
 * 1. In Apps Script editor (script.google.com)
 * 2. Click "Deploy" → "New deployment"
 * 3. Select type: Web app
 * 4. Execute as: (your email)
 * 5. Who has access: Anyone (or specific domain)
 * 6. Copy the deployment URL
 * 7. Add to dashboard as: APPS_SCRIPT_DEPLOYMENT_URL = "https://script.google.com/..."
 */

const SHEET_ID = '1XB8ulplXEpakKWeXQtU2IO25LCrvNY4qdaDGy4chVkE';
const FEEDBACK_SHEET_NAME = 'Feedback';
const HEADERS = ['Guest Name', 'Reason', 'Date', 'Notes'];

/**
 * Main handler for all requests
 */
function doPost(e) {
    try {
        const payload = JSON.parse(e.postData.contents);
        const action = payload.action;

        let response = {};

        switch (action) {
            case 'addFeedback':
                response = addFeedbackRow(
                    payload.guestName,
                    payload.reason,
                    payload.timestamp,
                    payload.notes
                );
                break;
            case 'getFeedbackStats':
                response = getFeedbackStats();
                break;
            case 'exportFeedback':
                response = exportFeedbackData();
                break;
            default:
                response = { success: false, message: 'Unknown action' };
        }

        return ContentService
            .createTextOutput(JSON.stringify(response))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        const errorResponse = {
            success: false,
            message: 'Error processing request',
            error: error.toString()
        };
        
        Logger.log('Error: ' + error);
        
        return ContentService
            .createTextOutput(JSON.stringify(errorResponse))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * Add a feedback row to the Feedback sheet
 */
function addFeedbackRow(guestName, reason, timestamp, notes) {
    try {
        const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
        let feedbackSheet = spreadsheet.getSheetByName(FEEDBACK_SHEET_NAME);

        // Create sheet if it doesn't exist
        if (!feedbackSheet) {
            feedbackSheet = spreadsheet.insertSheet(FEEDBACK_SHEET_NAME);
            feedbackSheet.appendRow(HEADERS);
        }

        // Format timestamp
        const date = new Date(timestamp).toLocaleString('en-GB');

        // Add feedback row
        feedbackSheet.appendRow([
            guestName,
            reason,
            date,
            notes || ''
        ]);

        Logger.log(`Feedback recorded: ${guestName} - ${reason}`);

        return {
            success: true,
            message: 'Feedback recorded successfully',
            guestName: guestName,
            reason: reason,
            timestamp: date
        };

    } catch (error) {
        Logger.log('Error adding feedback: ' + error);
        return {
            success: false,
            message: 'Error recording feedback',
            error: error.toString()
        };
    }
}

/**
 * Get feedback statistics
 */
function getFeedbackStats() {
    try {
        const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
        const feedbackSheet = spreadsheet.getSheetByName(FEEDBACK_SHEET_NAME);

        if (!feedbackSheet) {
            return { totalFeedback: 0, rejectionReasons: {} };
        }

        const data = feedbackSheet.getDataRange().getValues();
        
        if (data.length <= 1) {
            return { totalFeedback: 0, rejectionReasons: {} };
        }

        const reasons = {};
        
        // Skip header row (row 0)
        for (let i = 1; i < data.length; i++) {
            const reason = data[i][1]; // Column B is the reason
            
            if (reason) {
                reasons[reason] = (reasons[reason] || 0) + 1;
            }
        }

        return {
            totalFeedback: data.length - 1,
            rejectionReasons: reasons,
            lastUpdated: new Date().toISOString()
        };

    } catch (error) {
        Logger.log('Error getting stats: ' + error);
        return { totalFeedback: 0, rejectionReasons: {} };
    }
}

/**
 * Export all feedback data
 */
function exportFeedbackData() {
    try {
        const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
        const feedbackSheet = spreadsheet.getSheetByName(FEEDBACK_SHEET_NAME);

        if (!feedbackSheet) {
            return { feedback: [], count: 0 };
        }

        const data = feedbackSheet.getDataRange().getValues();
        const feedback = [];

        // Skip header row
        for (let i = 1; i < data.length; i++) {
            if (data[i][0]) { // Skip empty rows
                feedback.push({
                    guestName: data[i][0],
                    reason: data[i][1],
                    date: data[i][2],
                    notes: data[i][3] || ''
                });
            }
        }

        return {
            feedback: feedback,
            count: feedback.length,
            lastUpdated: new Date().toISOString()
        };

    } catch (error) {
        Logger.log('Error exporting feedback: ' + error);
        return { feedback: [], count: 0 };
    }
}

/**
 * Simple test function
 */
function doGet(e) {
    return HtmlService.createHtmlOutput('RTS Dashboard Feedback API is running.');
}
