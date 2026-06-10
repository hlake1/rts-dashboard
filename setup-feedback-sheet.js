/**
 * Google Sheets API Setup for RTS Dashboard Feedback
 * Run this once to create the Feedback tab and columns
 * 
 * Usage: node setup-feedback-sheet.js
 * 
 * Requires: GOOGLE_SHEETS_API_KEY or OAuth2 token in environment
 */

const sheets = require('googleapis').sheets('v4');
const { google } = require('googleapis');

const SHEET_ID = '1XB8ulplXEpakKWeXQtU2IO25LCrvNY4qdaDGy4chVkE';
const FEEDBACK_SHEET_NAME = 'Feedback';

async function setupFeedbackSheet() {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });

        const sheetsApi = sheets({
            version: 'v4',
            auth: auth
        });

        console.log('🔧 Setting up Feedback sheet...');

        // First, check if Feedback sheet exists
        const spreadsheet = await sheetsApi.spreadsheets.get({
            spreadsheetId: SHEET_ID
        });

        const sheetExists = spreadsheet.data.sheets.some(s => s.properties.title === FEEDBACK_SHEET_NAME);

        if (!sheetExists) {
            console.log(`📝 Creating "${FEEDBACK_SHEET_NAME}" sheet...`);
            
            // Add new sheet
            await sheetsApi.spreadsheets.batchUpdate({
                spreadsheetId: SHEET_ID,
                requestBody: {
                    requests: [{
                        addSheet: {
                            properties: {
                                title: FEEDBACK_SHEET_NAME,
                                gridProperties: {
                                    rowCount: 1000,
                                    columnCount: 5
                                }
                            }
                        }
                    }]
                }
            });
        }

        // Add header row
        console.log('📋 Adding header columns...');
        await sheetsApi.spreadsheets.values.update({
            spreadsheetId: SHEET_ID,
            range: `${FEEDBACK_SHEET_NAME}!A1:D1`,
            valueInputOption: 'RAW',
            requestBody: {
                values: [[
                    'Guest Name',
                    'Reason',
                    'Date',
                    'Notes'
                ]]
            }
        });

        console.log('✅ Feedback sheet ready!');
        console.log(`📍 Sheet ID: ${SHEET_ID}`);
        console.log(`📄 Sheet Name: ${FEEDBACK_SHEET_NAME}`);
        console.log(`📊 Columns: Guest Name | Reason | Date | Notes`);

    } catch (error) {
        console.error('❌ Error setting up sheet:', error.message);
        process.exit(1);
    }
}

setupFeedbackSheet();
