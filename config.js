/**
 * RTS Dashboard Configuration
 * 
 * Set up Google Sheets integration and other settings
 */

// ===== GOOGLE SHEETS CONFIGURATION =====
// After deploying the Google Apps Script (see setup instructions below),
// copy the deployment URL here:

const RTS_CONFIG = {
    // Google Sheets IDs
    feedbackSheetId: '1XB8ulplXEpakKWeXQtU2IO25LCrvNY4qdaDGy4chVkE',
    feedbackSheetName: 'Feedback',
    
    // Google Apps Script Web App Deployment URL
    // TO SET UP:
    // 1. Go to script.google.com
    // 2. Copy the contents of apps-script.gs into a new Apps Script project
    // 3. Click "Deploy" → "New deployment"
    // 4. Select type: "Web app"
    // 5. Execute as: (your Google account)
    // 6. Who has access: "Anyone" or "Anyone with the link"
    // 7. Copy the deployment URL and paste it below:
    appsScriptDeploymentUrl: null, // CONFIGURE THIS
    
    // Optional: Enable debug logging
    debug: false
};

// Initialize Google Sheets helper once the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (RTS_CONFIG.appsScriptDeploymentUrl) {
        initGoogleSheetsHelper(RTS_CONFIG.appsScriptDeploymentUrl);
        console.log('[RTS Config] Google Sheets integration initialized');
    } else {
        console.warn('[RTS Config] Google Apps Script deployment URL not configured. Feedback will not be saved to Google Sheets.');
    }
});

// ===== SETUP INSTRUCTIONS =====
/*

STEP 1: Create Google Apps Script Project
========================================
1. Go to https://script.google.com
2. Create a new project
3. Delete the default "myFunction()" code
4. Copy ALL the code from apps-script.gs into the editor
5. Save the project (name it "RTS Dashboard Feedback")

STEP 2: Deploy as Web App
=========================
1. Click "Deploy" button (top right)
2. Select "New deployment"
3. Click the "Select type" dropdown and choose "Web app"
4. Configure:
   - Execute as: (your Google email)
   - Who has access: "Anyone" or "Anyone with the link"
5. Click "Deploy"
6. You'll see a dialog with the deployment URL
7. Copy the URL (looks like: https://script.google.com/macros/d/[ID]/userweb)

STEP 3: Add URL to Dashboard Config
===================================
1. Paste the deployment URL into config.js:
   appsScriptDeploymentUrl: "https://script.google.com/macros/d/[YOUR_ID]/userweb"
2. Save config.js
3. Reload the dashboard

STEP 4: Test Feedback System
============================
1. Open the dashboard
2. Click the 👎 button on any guest card
3. Select a reason (Already booked / Doesn't fit / Oversaturated)
4. Add optional notes
5. Click "Submit Feedback"
6. You should see "✅ Feedback recorded"
7. Go to the Feedback sheet to verify the entry was written

TROUBLESHOOTING
===============

Q: Feedback button doesn't show
A: Make sure you saved and reloaded index.html

Q: "Feedback will not be saved" warning in console
A: Configure appsScriptDeploymentUrl in config.js

Q: Feedback submits but doesn't appear in sheet
A: Check:
   - Apps Script deployment is "Web app" type
   - "Who has access" is set to "Anyone" or "Anyone with link"
   - Google Sheets ID is correct (1XB8ulplXEpakKWeXQtU2IO25LCrvNY4qdaDGy4chVkE)
   - Sheet name is exactly "Feedback"

Q: CORS error when submitting feedback
A: This is normal! The request uses mode: 'no-cors'
   The feedback still goes through in the background
   Check the Google Sheet to confirm

Q: "Error processing request" in status
A: Check the Apps Script deployment execution log:
   - Go to https://script.google.com
   - Click on your project
   - View the execution log for error details

MAINTAINING THE SYSTEM
======================

Regular Checks (Daily):
- Monitor Google Sheets feedback for new entries
- Review feedback patterns (Already booked / Doesn't fit / Oversaturated)

Monthly Updates:
- Check Apps Script deployment for errors
- Verify sheet structure hasn't been modified
- Update exclusion lists based on feedback

*/
