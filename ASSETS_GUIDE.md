# Portfolio Assets Guide

This guide will help you add images and media to your portfolio.

## 📁 Recommended Folder Structure

Create the following folder structure to organize your media:

```
portfolio/
│
├── images/
│   ├── hero/
│   │   └── profile.jpg
│   ├── portfolio/
│   │   ├── dev-project-1.jpg
│   │   ├── dev-project-2.jpg
│   │   ├── photo-1.jpg
│   │   ├── photo-2.jpg
│   │   ├── video-1.jpg
│   │   └── video-2.jpg
│   └── about/
│       └── about-me.jpg
```

## 📷 Image Requirements

### Portfolio Images
- **Format**: JPG or PNG
- **Recommended Size**: 1200x800px (3:2 aspect ratio)
- **File Size**: Keep under 500KB for faster loading
- **Optimization**: Use tools like TinyPNG or ImageOptim

### Profile/Hero Image (Optional)
- **Size**: 500x500px (square)
- **Format**: JPG or PNG
- **Use**: Can be added to About section or Hero background

## 🎨 Adding Images to Portfolio Items

Replace the placeholder divs with real images:

### Before (Placeholder):
```html
<div class="portfolio-image">
    <div class="placeholder-image">
        <i class="fas fa-code"></i>
    </div>
</div>
```

### After (Real Image):
```html
<div class="portfolio-image">
    <img src="images/portfolio/dev-project-1.jpg" alt="E-Commerce Platform">
</div>
```

## 📸 Photography Portfolio Examples

For photography work, you'll want to showcase your best shots:

```html
<div class="portfolio-item" data-category="photography">
    <div class="portfolio-image">
        <img src="images/portfolio/wedding-photo-1.jpg" alt="Wedding Photography">
    </div>
    <div class="portfolio-info">
        <h3>Wedding Photography</h3>
        <p>Beautiful moments captured at the Smith-Jones wedding</p>
        <span class="portfolio-tag">Event Photography</span>
    </div>
</div>
```

## 🎥 Videography Portfolio Examples

For video work, you can:

1. **Use Video Thumbnails**: Screenshot from your best frame
2. **Link to External Hosting**: YouTube, Vimeo, etc.

```html
<div class="portfolio-item" data-category="videography">
    <div class="portfolio-image">
        <img src="images/portfolio/corporate-video-thumb.jpg" alt="Corporate Video">
    </div>
    <div class="portfolio-info">
        <h3>Brand Story</h3>
        <p>Documentary-style corporate video</p>
        <span class="portfolio-tag">Corporate Video</span>
        <a href="https://youtube.com/your-video" target="_blank" class="btn btn-outline" style="margin-top: 1rem;">Watch Video</a>
    </div>
</div>
```

## 🎬 Video Editing Portfolio Examples

Show before/after or final results:

```html
<div class="portfolio-item" data-category="editing">
    <div class="portfolio-image">
        <img src="images/portfolio/edit-project-1.jpg" alt="Music Video Edit">
    </div>
    <div class="portfolio-info">
        <h3>Music Video - Color Grading</h3>
        <p>Professional color grading in DaVinci Resolve</p>
        <span class="portfolio-tag">Color Grading</span>
    </div>
</div>
```

## 💻 Development Portfolio Examples

For code projects, use screenshots or mockups:

```html
<div class="portfolio-item" data-category="development">
    <div class="portfolio-image">
        <img src="images/portfolio/api-dashboard.jpg" alt="Analytics Dashboard">
    </div>
    <div class="portfolio-info">
        <h3>Analytics Dashboard</h3>
        <p>Real-time data visualization with REST API backend</p>
        <span class="portfolio-tag">Backend Development</span>
    </div>
</div>
```

## 🖼️ Where to Get Quality Images

While building your portfolio with real work:

### For Placeholder Images:
- [Unsplash](https://unsplash.com) - Free high-quality photos
- [Pexels](https://pexels.com) - Free stock photos and videos

### For Screenshots/Mockups:
- Take screenshots of your actual projects
- Use [Screely](https://screely.com) to create beautiful browser mockups
- Use [Mockuper](https://mockuper.net) for device mockups

### For Video Thumbnails:
- Export a frame from your best video moment
- Create custom thumbnails in Photoshop/Canva
- Use YouTube's auto-generated thumbnails

## 🎯 Image Optimization Tips

1. **Compress Images**: Use TinyPNG or ImageOptim before uploading
2. **Proper Format**: 
   - JPG for photos
   - PNG for graphics with transparency
   - WebP for modern browsers (best compression)
3. **Responsive Images**: Consider different sizes for mobile
4. **Alt Text**: Always include descriptive alt text for SEO and accessibility

## 🔗 Adding Hero Background (Optional)

To add a background image to the hero section, update the CSS:

```css
.hero {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%),
                url('images/hero/background.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}
```

## 📝 Image Checklist

Before deploying your portfolio:

- [ ] Create `images` folder structure
- [ ] Add portfolio project images (minimum 6 items)
- [ ] Optimize all images (compress, resize)
- [ ] Update `index.html` with image paths
- [ ] Add descriptive alt text to all images
- [ ] Test images on different devices
- [ ] Verify all images load correctly
- [ ] Consider adding loading animations

## 🚀 Next Steps

1. Gather your best work samples
2. Take screenshots or export frames
3. Optimize and organize images
4. Update HTML with real image paths
5. Test the portfolio thoroughly
6. Deploy!

---

**Remember**: This is YOUR portfolio. Showcase your actual work to attract real clients. The placeholder content is just a starting point - replace it with projects that demonstrate your skills and expertise!
