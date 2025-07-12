# Project Analysis and Netlify Deployment Issue

## Project Overview
Please analyze this Loqui Events project - a React/TypeScript application built with Vite that displays events from Contentful CMS. The project has been successfully deployed to Netlify but is showing a white page with critical errors.

## Current Issue
After deployment to Netlify (loqui-events.netlify.app), the site displays a white page instead of the expected content. The deployment appears successful, but the application fails to load properly.

## Console Errors Found

### 1. Service Worker Cache Errors (Multiple instances)
```
sw.js:139 Uncaught (in promise) TypeError: Failed to execute 'put' on 'Cache': Request scheme 'chrome-extension' is unsupported 
     at handleExternalRequest (sw.js:139:13)
```

### 2. Contentful Access Token Error (Critical)
```
contentful-BCdGFSq4.js:1 Uncaught TypeError: Expected parameter accessToken 
     at M (contentful-BCdGFSq4.js:1:4120) 
     at services-G5PNLOg7.js:1:83
```

### 3. Image Preloading Warnings
```
loqui-events.netlify.app/:1 The resource `https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop` was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
```

## Analysis Required
1. **Examine the project structure** and understand the application architecture
2. **Identify why Contentful access token is missing** in production
3. **Review service worker implementation** and fix cache handling for external requests
4. **Check environment variable configuration** for Netlify deployment
5. **Analyze image preloading strategy** and optimize if needed

## Key Files to Review
- `src/services/contentful.ts` - Contentful configuration
- `public/sw.js` - Service worker implementation
- Environment variables setup for Netlify
- `vite.config.ts` - Build configuration
- `package.json` - Dependencies and scripts

## Expected Outcome
The site should load properly showing the events interface without console errors. The Contentful integration should work correctly, and the service worker should handle caching appropriately.

Please start by analyzing the project structure and identifying the root cause of these issues, particularly focusing on the missing Contentful access token which appears to be the primary blocker.