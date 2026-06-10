# RTS Dashboard Feedback System

## 🎯 What This Does

Adds a guest feedback system to the RTS Dashboard that lets Ben reject guests and provide feedback, which automatically records to Google Sheets and feeds into the research agent's daily workflow.

## ✨ Features

- **👎 Feedback Button** — Click to provide feedback on any guest
- **Modal Popup** — Select from 3 reasons:
  - 📅 Already booked
  - 🎯 Doesn't fit
  - 📊 Oversaturated
- **Optional Notes** — Add context about the rejection
- **Silent Submission** — No page reload, happens in background
- **Google Sheets Storage** — All feedback automatically saved
- **Agent Learning** — Research agent reads feedback daily

## 🚀 Quick Start

### 1. Set Up Google Apps Script (5 min)
1. Go to https://script.google.com
2. Create new project: "RTS Dashboard Feedback"
3. Copy code from `apps-script.gs` file
4. Click Deploy → New deployment → Web app
5. Copy the deployment URL

### 2. Configure Dashboard (1 min)
1. Open `config.js`
2. Find: `appsScriptDeploymentUrl: null`
3. Paste your deployment URL

### 3. Test (5 min)
1. Reload dashboard
2. Click 👎 on any guest
3. Select a reason
4. Click "Submit Feedback"
5. Check Google Sheets — should see your entry

### 4. Deploy to GitHub
```bash
cd rts-dashboard
git push origin main
```

## 📁 Files Included

| File | Purpose |
|------|---------|
| `index.html` | Dashboard with feedback UI |
| `google-sheets-helper.js` | Client-side API for Google Sheets |
| `apps-script.gs` | Server-side code (deploy to Google) |
| `config.js` | Configuration settings |
| `FEEDBACK_DEPLOYMENT_GUIDE.md` | Detailed setup instructions |
| `DEPLOYMENT_CHECKLIST.md` | Step-by-step verification |
| `SYSTEM_COMPLETION_REPORT.md` | Full technical documentation |

## 📊 Data Captured

When feedback is submitted, this is saved to Google Sheets:

| Field | Example |
|-------|---------|
| Guest Name | "Engineering Explained" |
| Reason | "Already booked" |
| Date | "2026-06-10 14:30:15" |
| Notes | "Interview scheduled June 15" |

## 🤖 Research Agent Integration

The research agent reads the Feedback sheet daily:

1. **Extracts "Already booked" guests** → Excludes from future recommendations
2. **Tracks "Oversaturated" patterns** → If 3+ rejections, diversify search
3. **Learns preferences** → Uses notes to refine strategy
4. **Reports in daily summary** → Includes feedback insights

See: `RESEARCH_AGENT_INSTRUCTIONS.md`

## 🔧 Troubleshooting

### Button doesn't appear?
- Reload the page (Ctrl+Shift+R)
- Check console for errors (F12)

### Modal doesn't open?
- Check browser console for JavaScript errors
- Verify `google-sheets-helper.js` is loading

### Feedback doesn't save?
- Verify Apps Script deployment URL in `config.js`
- Check Google Apps Script execution log for errors
- Ensure "Who has access" is set to "Anyone"

### Data doesn't appear in Google Sheets?
- Check Apps Script → Execution log
- Verify Feedback sheet exists
- Check column names match exactly

## 📞 Support

1. **Detailed Setup:** See `FEEDBACK_DEPLOYMENT_GUIDE.md`
2. **Verification:** See `DEPLOYMENT_CHECKLIST.md`
3. **Technical Details:** See `SYSTEM_COMPLETION_REPORT.md`
4. **Troubleshooting:** See `FEEDBACK_DEPLOYMENT_GUIDE.md` → Troubleshooting section

## 📚 Key Links

**Google Sheet:**
```
https://docs.google.com/spreadsheets/d/1XB8ulplXEpakKWeXQtU2IO25LCrvNY4qdaDGy4chVkE
```

**Apps Script Editor:**
```
https://script.google.com
```

**Dashboard Location:**
```
/data/.openclaw/workspace/rts-dashboard/index.html
```

## ✅ Success Checklist

- [ ] Google Apps Script deployed as Web App
- [ ] Deployment URL added to config.js
- [ ] Dashboard loads without errors
- [ ] 👎 button appears on guest cards
- [ ] Feedback submits silently
- [ ] Data appears in Google Sheets
- [ ] Research agent reads Feedback sheet daily
- [ ] Agent includes feedback summary in reports

## 🎓 How to Use

As Ben:
1. Review guests on dashboard
2. See one you want to reject?
3. Click the 👎 button
4. Select why you're passing
5. Add notes if needed (optional)
6. Click "Submit Feedback"
7. Done! No reload needed

As the research agent:
1. Read Feedback sheet each morning
2. Extract "Already booked" → add to exclusion list
3. Count "Oversaturated" → if 3+, pivot search
4. Include insights in daily report
5. Continuously improve recommendations

## 🔐 Privacy & Security

- ✅ No credentials stored in browser
- ✅ Google OAuth handles authentication
- ✅ All data stored in your Google Sheet
- ✅ Feedback only visible to sheet owners
- ✅ No third-party APIs used

## 📈 What's Next

**Short term:**
- Test feedback system
- Verify Google Sheets writes
- Confirm agent reads feedback

**Long term:**
- Track feedback patterns
- Refine search strategy based on rejections
- Build exclusion lists
- Measure improvement in guest quality

## 💡 Tips

1. **For Ben:** Be specific in notes — helps agent learn
2. **For Agent:** Review "Doesn't fit" notes weekly
3. **For Both:** Check saturation patterns monthly
4. **Maintenance:** Verify Apps Script health weekly

## 📞 Questions?

1. Check the FEEDBACK_DEPLOYMENT_GUIDE.md first
2. Review SYSTEM_COMPLETION_REPORT.md for technical details
3. Check browser console (F12) for error messages
4. Review Apps Script execution log for server errors

---

**Status:** ✅ Ready to deploy  
**Setup Time:** ~20 minutes  
**Maintenance:** ~5 minutes/week

Last updated: 2026-06-10
