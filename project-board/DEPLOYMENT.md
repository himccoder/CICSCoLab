# Deployment Guide

Your CICS CoLab Project Board is ready to deploy! 🚀

## ✅ Pre-Deployment Checklist

- [x] No linter errors
- [x] Production build successful
- [x] Google Sheets CSV endpoint configured
- [x] All features working

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
cd C:\Users\himni\OneDrive\Documents\CICSCoLab\project-board
vercel
```

3. **Follow prompts**:
   - Link to existing project or create new
   - Accept default settings
   - Done! You'll get a live URL

**Vercel Features:**
- ✅ Free for personal/educational use
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on git push

### Option 2: Netlify

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Deploy**:
```bash
cd C:\Users\himni\OneDrive\Documents\CICSCoLab\project-board
netlify deploy --prod
```

3. **Select the `dist` folder** when prompted

**Netlify Features:**
- ✅ Free tier available
- ✅ Drag-and-drop deployment option
- ✅ Custom domains
- ✅ Form handling

### Option 3: GitHub Pages

1. **Update `vite.config.js`** with your repo name:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/'
})
```

2. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

3. **Add to `package.json` scripts**:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

4. **Deploy**:
```bash
npm run deploy
```

### Option 4: Traditional Web Hosting

1. **Build is already created** in the `dist` folder

2. **Upload contents of `dist` folder** to your web host via:
   - FTP/SFTP
   - cPanel File Manager
   - SSH

3. **Files to upload**:
   - All contents of `dist/` folder
   - Make sure `index.html` is in the root

## 📝 Post-Deployment Steps

### 1. Test Your Live Site
- ✅ Check all pages load
- ✅ Test "Join a Project" button
- ✅ Test "Propose a Project" button
- ✅ Verify projects display correctly
- ✅ Test on mobile devices

### 2. Update Google Sheet (if needed)
Make sure your Google Sheet is:
- ✅ Published to web as CSV
- ✅ Accessible via the public URL
- ✅ Has the Status column for approvals

### 3. Share the URL
Once deployed, share your project board URL with:
- Students
- Faculty
- MUSIC committee
- Dean Keith Marzullo

## 🔧 Maintenance

### Adding New Projects
1. Review submissions in Google Sheet
2. Type "Approved" in Status column
3. Projects appear automatically (no redeployment needed!)

### Updating Content
If you need to change:
- Text/wording
- Colors/styling
- Form links

1. Make changes in code
2. Run `npm run build`
3. Redeploy using your chosen method

## 🌐 Custom Domain (Optional)

### For Vercel:
```bash
vercel domains add yourdomain.com
```

### For Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Follow DNS configuration steps

## 📊 Analytics (Optional)

Consider adding Google Analytics or similar:

1. Get tracking ID
2. Add to `index.html` in `<head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-ID');
</script>
```

## 🆘 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Projects Not Showing
- Check Google Sheet is public
- Verify CSV endpoint URL
- Check Status column has "Approved"

### Styling Issues
- Clear browser cache
- Check CSS files loaded correctly
- Verify all assets in dist folder

## 📞 Support

For deployment issues:
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- GitHub Pages: https://pages.github.com

---

**Your project board is production-ready!** Choose your deployment method and go live! 🎉

