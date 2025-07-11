# GA4 Tracking Verification Guide

## How to Test the GA4 Implementation

### Step 1: Set Your GA4 Measurement ID
1. Go to your dashboard tracking settings
2. Enter your GA4 Measurement ID (format: G-XXXXXXXXXX)
3. Save the settings

### Step 2: Verify Script Loading
1. Open browser DevTools (F12)
2. Go to Network tab
3. Reload the page
4. Look for requests to `googletagmanager.com/gtag/js` - should load immediately
5. Check Console for "Google Analytics 4 initialized with consent mode" message

### Step 3: Test Consent Flow
1. Clear your browser's localStorage and cookies
2. Reload the page - cookie banner should appear
3. In DevTools Console, check for GA4 debug info (development mode only)
4. Click "Accept All" - should see consent update messages

### Step 4: Verify Google Tag Detection
**Method 1: Google Tag Assistant**
1. Go to https://tagassistant.google.com/
2. Enter your website URL
3. Click "Connect"
4. Navigate through your site
5. GA4 tag should appear in "Working tags" section

**Method 2: GA4 DebugView**
1. Install "Google Analytics Debugger" Chrome extension
2. Enable the debugger
3. Visit your site with debugger active
4. Go to GA4 → Admin → DebugView
5. Should see real-time events within 60 seconds

### Step 5: Check Network Requests
1. In DevTools Network tab, filter by "collect"
2. Should see requests to `google-analytics.com/g/collect?v=2`
3. Check request payload includes your measurement ID (tid parameter)
4. Status should be 200 (success)

### Expected Behavior
- ✅ GA4 script loads immediately (with denied consent initially)
- ✅ No user data sent until consent is granted
- ✅ Page views tracked automatically on navigation
- ✅ Google's tag detection system finds the implementation
- ✅ Consent preferences persisted across visits

### Debugging Tips
- **Console messages**: Enable development mode to see detailed logs
- **Network blocking**: Test without adblockers that might block GA4
- **Measurement ID**: Verify the ID format is correct (G-XXXXXXXXXX)
- **Domain verification**: Ensure your domain is added to GA4 property settings

This implementation uses Google Consent Mode v2, which allows Google's systems to detect your analytics implementation even before user consent, resolving the "Google tag wasn't detected" issue.
