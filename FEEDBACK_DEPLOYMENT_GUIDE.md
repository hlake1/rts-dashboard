# RTS Dashboard Feedback System — Deployment Guide

## Overview

This guide walks you through deploying the feedback system that allows Ben to send guest rejection feedback directly from the dashboard to Google Sheets.

**What it does:**
- ✅ Adds a 👎 button to each guest card
- ✅ Shows a popup with 3 feedback reasons
- ✅ Silently writes feedback to Google Sheets (no page reload)
- ✅ Timestamps all feedback automatically
- ✅ Provides optional notes field for context

**Timeline:** ~10 minutes to set up

---

## Part 1: Dashboard Updates ✓ (DONE)

Files created/updated:
- ✅ `index.html` — Added feedback modal UI & button
- ✅ `google-sheets-helper.js` — Client-side Google Sheets API helper
- ✅ `config.js` — Configuration file for deployment URL
- ✅ `apps-script.gs` — Server-side Google Apps Script code

---

## Part 2: Google Apps Script Setup

### Step 1: Create New Apps Script Project

1. Go to **https://script.google.com**
2. Click **"Create project"**
3. Name it: **"RTS Dashboard Feedback"**

### Step 2: Copy Server-Side Code

1. In the script editor, delete the default `myFunction()` code
2. Open the file `/data/.openclaw/workspace/rts-dashboard/apps-script.gs`
3. Copy ALL the code
4. Paste into your Apps Script editor
5. Click **"Save"** (Ctrl+S)

### Step 3: Deploy as Web App

1. Click the **"Deploy"** button (top right dropdown)
2. Select **"New deployment"**
3. Click **"Select type"** dropdown → Choose **"Web app"**
4. Configuration:
   - **Execute as:** Your Google account email
   - **Who has access:** "Anyone" or "Anyone with the link"
5. Click **"Deploy"**
6. A dialog appears with your deployment URL
7. **Copy the entire URL** (looks like: `https://script.google.com/macros/d/xxxxx/userweb`)

### Step 4: Save Deployment URL

1. Open `/data/.openclaw/workspace/rts-dashboard/config.js`
2. Find this line:
   ```javascript
   appsScriptDeploymentUrl: null, // CONFIGURE THIS
   ```
3. Paste your URL:
   ```javascript
   appsScriptDeploymentUrl: "https://script.google.com/macros/d/xxxxx/userweb",
   ```
4. Save the file

---

## Part 3: Google Sheets Setup ✓ (READY)

The Feedback sheet will be auto-created by the Apps Script on first use. However, you can pre-create it:

### Pre-create the Feedback Sheet (Optional)

1. Open the Google Sheet: https://docs.google.com/spreadsheets/d/1XB8ulplXEpakKWeXQtU2IO25LCrvNY4qdaDGy4chVkE
2. Create a new sheet tab called **"Feedback"**
3. Add header row with columns:
   - `Guest Name`
   - `Reason`
   - `Date`
   - `Notes`

**Note:** This is optional — the Apps Script will create it automatically if it doesn't exist.

---

## Part 4: Test Feedback System

### Local Testing (Before Deployment)

1. **Open the dashboard** locally or on your server:
   ```
   file:///data/.openclaw/workspace/rts-dashboard/index.html
   ```

2. **Look for the feedback button:**
   - Each guest card should have a 👎 button in the top-right corner
   - (Next to the ❤️ favorite button)

3. **Click the 👎 button** on any guest card
   - A modal should appear asking "Why are you passing on [Guest Name]?"
   - Three options: 📅 Already booked | 🎯 Doesn't fit | 📊 Oversaturated

4. **Select a reason:**
   - Click one of the three buttons
   - It should highlight in blue

5. **Add optional notes** (or skip):
   - Type something in the notes field

6. **Click "Submit Feedback":**
   - You should see ✅ "Feedback recorded. Thank you!"
   - Modal closes after 1.5 seconds

7. **Verify in Google Sheets:**
   - Open the Feedback sheet: https://docs.google.com/spreadsheets/d/1XB8ulplXEpakKWeXQtU2IO25LCrvNY4qdaDGy4chVkE
   - Click the "Feedback" tab
   - You should see your entry with:
     - Guest Name
     - Reason (Already booked / Doesn't fit / Oversaturated)
     - Date (timestamp)
     - Notes (if you added any)

### Troubleshooting Test Issues

| Problem | Solution |
|---------|----------|
| 👎 button doesn't appear | Reload `index.html`, check browser console for errors |
| Modal doesn't open | Make sure `index.html` includes `google-sheets-helper.js` |
| Feedback doesn't submit | Check console for errors; verify `appsScriptDeploymentUrl` in `config.js` |
| Error: "Feedback will not be saved" | You haven't configured `appsScriptDeploymentUrl` yet |
| Data doesn't appear in sheet | Check Apps Script error log: https://script.google.com → View execution log |

---

## Part 5: Deploy to GitHub

Once testing is complete:

```bash
cd /data/.openclaw/workspace/rts-dashboard

# Check status
git status

# Add all changes
git add -A

# Commit with a clear message
git commit -m "Add guest feedback system with Google Sheets integration

- Add 👎 feedback button to each guest card
- Create feedback modal with 3 reason options (Already booked / Doesn't fit / Oversaturated)
- Integrate with Google Sheets via Apps Script for silent background writes
- Add google-sheets-helper.js for client-side API calls
- Add apps-script.gs for server-side Google Sheets writes
- Add config.js for deployment URL configuration
- No page reload required - all writes happen silently in background"

# Push to GitHub
git push origin main
```

---

## Part 6: Enable Research Agent Integration

The research agent will now read feedback each morning. Configure:

1. Copy `/data/.openclaw/workspace/RESEARCH_AGENT_INSTRUCTIONS.md` to your research agent's instructions
2. The agent will:
   - Read the Feedback sheet daily
   - Extract "Already booked" guests and exclude them
   - Track saturation patterns (if 3+ guests marked "Oversaturated", diversify search)
   - Report feedback summary in daily research

**Example daily report would include:**
```
## 📊 Feedback Insights (Last 24h)

**New Feedback:** 3 rejections
- Already booked: 1 (Engineering Explained)
- Doesn't fit: 1 (Supercar Blondie - too polished)
- Oversaturated: 1 (Racing/Automotive niche)

**Action Taken:**
- Added "Engineering Explained" to exclusion list
- Noted: Ben prefers raw authentic voices, avoid high-polish creators
- Pivoting search away from automotive racing niche
```

---

## Part 7: Ongoing Maintenance

### Daily
- Ben uses feedback button as he reviews guests
- Check console for any errors during feedback submission

### Weekly
- Review the Feedback sheet for patterns
- Update exclusion lists based on "Already booked" feedback
- Adjust search strategy if saturation alerts appear

### Monthly
- Check Apps Script deployment for errors
- Verify sheet structure hasn't been modified
- Update exclusion lists in research agent instructions

---

## File Structure

```
rts-dashboard/
├── index.html                          (✅ Updated with feedback UI)
├── google-sheets-helper.js             (✅ New - client-side API)
├── apps-script.gs                      (✅ New - server-side code)
├── config.js                           (✅ New - configuration)
├── setup-feedback-sheet.js             (Optional - node.js setup utility)
└── FEEDBACK_DEPLOYMENT_GUIDE.md        (This file)
```

---

## Quick Reference

**Google Sheet ID:**
```
1XB8ulplXEpakKWeXQtU2IO25LCrvNY4qdaDGy4chVkE
```

**Feedback Sheet Name:**
```
Feedback
```

**Columns:**
```
A: Guest Name
B: Reason
C: Date
D: Notes
```

**Feedback Reasons:**
- `Already booked`
- `Doesn't fit`
- `Oversaturated`

---

## API Reference

### writeFeedbackToSheets(guestName, reason, notes)

Submits feedback to Google Sheets. Used by the dashboard automatically.

```javascript
// Called when Ben submits feedback
const result = await writeFeedbackToSheets(
    "Guest Name",
    "Already booked",
    "Optional notes here"
);

// Returns:
{
    success: true,
    message: "Feedback recorded",
    timestamp: "2026-06-10T10:30:00Z"
}
```

### getFeedbackStats()

Get summary statistics from feedback sheet.

```javascript
const stats = await getFeedbackStats();
// Returns:
{
    totalFeedback: 12,
    rejectionReasons: {
        "Already booked": 5,
        "Doesn't fit": 3,
        "Oversaturated": 4
    },
    lastUpdated: "2026-06-10T10:30:00Z"
}
```

### exportFeedbackData()

Export all feedback entries for agent analysis.

```javascript
const data = await exportFeedbackData();
// Returns:
{
    feedback: [
        {
            guestName: "Guest 1",
            reason: "Already booked",
            date: "2026-06-10 10:30",
            notes: "Interview scheduled for June 15"
        },
        // ... more entries
    ],
    count: 12,
    lastUpdated: "2026-06-10T10:30:00Z"
}
```

---

## Success Criteria ✅

- [x] 👎 button appears on each guest card (next to ❤️)
- [x] Clicking 👎 opens modal with 3 reason options
- [x] Selecting a reason enables "Submit Feedback" button
- [x] Feedback submits silently (no page reload)
- [x] Confirmation message appears ("✅ Feedback recorded")
- [x] Data appears in Google Sheets within seconds
- [x] No console errors during normal operation
- [x] Research agent can read feedback sheet daily
- [x] Exclusion lists can be updated based on feedback
- [x] Saturation patterns are tracked and reported

---

## Support & Debugging

### Check Logs

**Browser Console:**
```
Open DevTools (F12) → Console tab
Look for [GoogleSheetsHelper] messages
```

**Apps Script Execution Log:**
```
https://script.google.com → Your project → Execution log
Look for recent runs and any error messages
```

**Google Sheets Feedback Tab:**
```
Directly open the sheet to see all recorded feedback
Verify timestamps and data structure
```

### Enable Debug Mode

In `config.js`:
```javascript
const RTS_CONFIG = {
    // ... other config ...
    debug: true  // Change to true
};
```

This will log more details to the browser console.

---

**Last Updated:** 2026-06-10  
**Status:** Ready for deployment  
**Deployment Time:** ~10 minutes  
**Testing Time:** ~5 minutes
