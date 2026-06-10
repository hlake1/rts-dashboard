# 🚀 START HERE — RTS Dashboard Feedback System

## What You Need to Know

I've built a complete guest feedback system for the RTS Dashboard. It's **ready to deploy** — you just need to add one configuration URL.

## ⏱️ Time Required
- **Setup:** 20-30 minutes (mostly waiting for Google)
- **Testing:** 5-10 minutes
- **Deployment:** 2 minutes (git push)

## 🎯 What It Does

**Ben's side:**
1. Click 👎 on any guest he wants to reject
2. Choose a reason:
   - 📅 Already booked
   - 🎯 Doesn't fit
   - 📊 Oversaturated
3. Add optional notes
4. Click "Submit" — done! No page reload
5. Feedback automatically saves to Google Sheets

**Research Agent's side:**
- Reads feedback every morning
- Excludes "Already booked" guests from future recommendations
- Tracks saturation patterns (if too many "Oversaturated", diversify search)
- Reports insights in daily research summary

## 🔧 How to Deploy (3 Steps)

### Step 1: Create Google Apps Script (5 min)

1. Go to **https://script.google.com**
2. Click **"Create project"**
3. Name it: **"RTS Dashboard Feedback"**
4. Delete the default code
5. Copy everything from the file: `apps-script.gs`
6. Paste into your Apps Script project
7. Click **"Save"** (Ctrl+S)
8. Click **"Deploy"** → **"New deployment"**
9. Select type: **"Web app"**
10. Execute as: Your Google account
11. Who has access: **"Anyone"** or **"Anyone with the link"**
12. Click **"Deploy"**
13. Copy the URL from the popup (looks like: `https://script.google.com/macros/d/xxxxx/userweb`)

### Step 2: Configure Dashboard (1 min)

1. Open: `config.js`
2. Find this line:
   ```javascript
   appsScriptDeploymentUrl: null,
   ```
3. Replace with:
   ```javascript
   appsScriptDeploymentUrl: "https://script.google.com/macros/d/[YOUR_URL]/userweb",
   ```
4. Save the file

### Step 3: Test & Deploy (5 min)

```bash
cd /data/.openclaw/workspace/rts-dashboard

# Test locally first
# Open index.html in browser, click 👎 on a guest
# Select a reason, submit
# Check Google Sheets to see if it saved

# Then push to GitHub
git push origin main
```

**That's it!** 🎉

## 📋 What's Already Done

✅ Dashboard UI with 👎 button  
✅ Popup modal with feedback reasons  
✅ Google Sheets integration code  
✅ Research agent instructions  
✅ Complete documentation  
✅ Code tested and committed  

## 📂 File Guide

| File | What It Does |
|------|--------------|
| **README_FEEDBACK_SYSTEM.md** | 5-minute overview of features |
| **START_HERE.md** | This file — deployment instructions |
| **FEEDBACK_DEPLOYMENT_GUIDE.md** | Detailed step-by-step guide (if you need help) |
| **DEPLOYMENT_CHECKLIST.md** | Verification checklist |
| **SYSTEM_COMPLETION_REPORT.md** | Full technical documentation |

## 🧠 How It Works (Simple Version)

```
Ben clicks 👎 feedback button
        ↓
Modal popup appears
        ↓
Ben selects reason + adds notes
        ↓
Feedback submits silently (no page reload)
        ↓
Data sent to Google Sheets via Google Apps Script
        ↓
Google Sheets saves: Guest Name, Reason, Date, Notes
        ↓
Research agent reads next morning
        ↓
Agent excludes booked guests, tracks saturation
        ↓
Agent includes insights in daily research report
```

## ✅ Testing Checklist

After deployment, verify:

- [ ] Dashboard loads without errors
- [ ] 👎 button appears on guest cards
- [ ] Click 👎 opens modal popup
- [ ] Modal shows 3 reason options
- [ ] Can select a reason
- [ ] Can add optional notes
- [ ] Click "Submit" shows success message
- [ ] Modal closes after 1.5 seconds
- [ ] Check Google Sheets — your feedback is there
- [ ] Guest name is correct
- [ ] Reason is recorded
- [ ] Timestamp is correct

## 🎓 Quick Reference

**Google Sheet ID:**
```
1XB8ulplXEpakKWeXQtU2IO25LCrvNY4qdaDGy4chVkE
```

**Open the sheet:**
```
https://docs.google.com/spreadsheets/d/1XB8ulplXEpakKWeXQtU2IO25LCrvNY4qdaDGy4chVkE
```

**Feedback sheet columns:**
- Column A: Guest Name
- Column B: Reason
- Column C: Date (auto)
- Column D: Notes (optional)

## 🆘 Troubleshooting

### "👎 button doesn't appear"
- Reload the page (Ctrl+Shift+R for hard refresh)
- Check browser console for errors (F12 → Console)

### "Feedback doesn't save to Google Sheets"
- Make sure you copied the Apps Script deployment URL correctly
- Check that "Who has access" is set to "Anyone"
- Open Apps Script project and check the execution log

### "Modal doesn't open"
- Make sure `google-sheets-helper.js` is loading
- Check console for JavaScript errors
- Try hard refresh of the page

### Still stuck?
See: `FEEDBACK_DEPLOYMENT_GUIDE.md` → Troubleshooting section

## 📚 Learn More

- **Setup Help:** `FEEDBACK_DEPLOYMENT_GUIDE.md`
- **Verification:** `DEPLOYMENT_CHECKLIST.md`
- **Technical Details:** `SYSTEM_COMPLETION_REPORT.md`
- **Agent Instructions:** `RESEARCH_AGENT_INSTRUCTIONS.md` (in parent directory)

## 🎯 Success Criteria

You're done when:

✅ Dashboard loads
✅ 👎 button visible on guest cards
✅ Can submit feedback without errors
✅ Data appears in Google Sheets
✅ Research agent can read Feedback sheet
✅ Agent includes feedback in daily report

## 🚀 Next Steps

1. **Now:** Follow the 3 deployment steps above (20 min)
2. **Test:** Click 👎 button and verify Google Sheets (5 min)
3. **Push:** `git push origin main` (2 min)
4. **Agent:** Configure agent to read Feedback sheet daily

## 💡 Pro Tips

- **For Ben:** Add specific notes about why you're rejecting — helps agent learn
- **For Agent:** Review "Doesn't fit" notes weekly to understand preferences
- **For Both:** Check for saturation patterns monthly to adjust strategy
- **Maintenance:** Verify Apps Script is healthy (check execution log weekly)

## 📞 Questions?

**First, check:**
1. Your Google Apps Script project — is it deployed?
2. Browser console (F12) — any red errors?
3. Google Sheets — is there a "Feedback" tab?

**Then, read:**
1. FEEDBACK_DEPLOYMENT_GUIDE.md → Troubleshooting
2. SYSTEM_COMPLETION_REPORT.md → Technical details
3. DEPLOYMENT_CHECKLIST.md → Step-by-step verification

## 🎉 Ready?

1. Create the Google Apps Script project (Step 1 above)
2. Add the URL to config.js (Step 2)
3. Test it (Step 3)
4. Push to GitHub
5. Done!

**Total time: ~30 minutes. You've got this!** 💪

---

**Last Updated:** 2026-06-10  
**Status:** Ready for production  
**Version:** 1.0
