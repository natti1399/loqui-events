# Netlify CMS Setup Guide for Loqui Events

## ✅ Completed (Automated)

The following files and configurations have been automatically created:

### 📁 Files Created
- `public/admin/index.html` - CMS admin interface
- `public/admin/config.yml` - CMS configuration
- `public/_redirects` - Netlify routing
- `src/types/Event.ts` - TypeScript interfaces
- `src/hooks/useEvents.ts` - React hook for events
- `src/utils/markdownParser.ts` - Markdown parsing utilities
- `src/data/events/` - Sample event markdown files
- `src/data/settings/general.md` - Site settings

### 🔧 Code Updates
- Updated `App.tsx` to use dynamic events
- Added required dependencies to `package.json`
- Integrated event loading and display system

## 🚀 Manual Steps Required

### Step 1: Install Dependencies
```bash
cd "/Users/jeshiseifo/Desktop/Loqui events"
npm install
```

### Step 2: Deploy to Netlify
1. **Push to Git** (if not already done):
   ```bash
   git add .
   git commit -m "Add Netlify CMS integration"
   git push origin main
   ```

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Deploy the site

### Step 3: Enable Netlify Identity
1. In your Netlify dashboard, go to **Site settings**
2. Navigate to **Identity** tab
3. Click **Enable Identity**
4. Under **Registration preferences**, select **Invite only**
5. Under **External providers**, you can optionally enable Google/GitHub login

### Step 4: Enable Git Gateway
1. Still in **Identity** settings
2. Scroll down to **Services**
3. Click **Enable Git Gateway**
4. This allows the CMS to commit directly to your repository

### Step 5: Invite Sandra as Admin
1. In **Identity** tab, click **Invite users**
2. Enter Sandra's email: `sandra@loquievents.no`
3. Send the invitation
4. Sandra will receive an email to set up her account

### Step 6: Test the CMS
1. Visit `https://your-site-name.netlify.app/admin`
2. Sandra can log in with her credentials
3. Test creating/editing events
4. Verify changes appear on the live site

## 📋 Sandra's Workflow

### Adding a New Event
1. Go to `https://your-site-name.netlify.app/admin`
2. Click **Events** → **New Event**
3. Fill in all fields:
   - **Title**: Event name
   - **Date**: YYYY-MM-DD format
   - **Time**: e.g., "18:00-21:00"
   - **Location**: Venue name
   - **Price**: Number only (e.g., 450)
   - **Description**: Full event description
   - **Short Description**: Brief summary for cards
   - **Image**: Upload event image
   - **Stripe Link**: Payment URL
   - **Max Participants**: Number limit
   - **Category**: Select from dropdown
   - **Status**: Usually "upcoming"
   - **Published**: Check to make live
4. Click **Publish** → **Publish now**

### Editing Site Settings
1. Go to **Settings** → **General Settings**
2. Update contact info, social media links, etc.
3. Changes apply site-wide immediately

### Managing Events
- **Edit**: Click any event to modify
- **Delete**: Use delete button (be careful!)
- **Unpublish**: Uncheck "Published" to hide
- **Preview**: Use preview mode before publishing

## 🔧 Technical Details

### Event Data Structure
Events are stored as markdown files in `/src/data/events/` with frontmatter:

```yaml
---
title: Event Name
date: 2025-02-15
time: 18:00-21:00
location: Oslo Sentrum
price: 450
description: Full description
shortDescription: Brief summary
image: /optimized/image.webp
stripeLink: https://buy.stripe.com/...
maxParticipants: 20
category: Creative
status: upcoming
published: true
---
```

### Image Optimization
- Images are automatically optimized by Netlify
- Recommended size: 1200x800px
- Supported formats: JPG, PNG, WebP

### Automatic Deployment
- Every CMS change triggers a new build
- Changes are live within 2-3 minutes
- No manual deployment needed

## 🆘 Troubleshooting

### CMS Not Loading
- Check if Identity is enabled
- Verify Git Gateway is active
- Ensure user has been invited

### Events Not Appearing
- Check if event is published
- Verify date format (YYYY-MM-DD)
- Check browser console for errors

### Build Failures
- Check Netlify build logs
- Verify all required fields are filled
- Ensure image files exist

## 📞 Support

If you encounter issues:
1. Check the Netlify build logs
2. Verify all CMS fields are properly filled
3. Contact technical support if needed

---

**Next Steps**: Complete the manual setup steps above, then Sandra can start managing events through the CMS interface at `/admin`.