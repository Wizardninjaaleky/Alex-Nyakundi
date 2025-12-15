# Alex Nyakundi - Professional Portfolio

A modern, responsive portfolio website with a complete backend system for content management. Showcases software development, data analysis, photography, videography, and video editing services.

## 🌟 Features

### Frontend Features
- **Multi-Service Portfolio**: Dedicated sections for all your professional services
  - Backend Development
  - App Development
  - Data Analysis
  - Photography
  - Videography
  - Video Editing & Training

- **Service Request System**: Clients can request services through dedicated modal forms
- **Contact Form**: General inquiry form for project discussions
- **Portfolio Gallery**: Filterable portfolio showcase with category filters
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Smooth Animations**: Scroll animations and interactive UI elements
- **Modern UI/UX**: Clean, professional design with gradient accents

### Backend Features ✨ NEW!
- **Admin Panel**: Easy-to-use interface for managing content
- **Profile Management**: Update contact info and social links
- **Portfolio Management**: Add, edit, and delete portfolio items
- **Image Upload**: Drag-and-drop image upload system
- **API Integration**: RESTful API for dynamic content
- **Data Storage**: JSON-based data storage

## 📁 Project Structure

```
portfolio/
│
├── index.html          # Main portfolio page
├── styles.css          # Stylesheet with responsive design
├── script.js           # JavaScript with API integration
├── README.md           # This file
├── ASSETS_GUIDE.md     # Image guide
│
├── backend/            # Backend server
│   ├── server.js       # Express server
│   ├── package.json    # Dependencies
│   ├── .env            # Environment variables
│   ├── data.json       # Content storage
│   ├── README.md       # Backend documentation
│   └── public/         # Admin panel
│       ├── index.html
│       └── admin.js
│
└── public/
    └── uploads/        # Uploaded images
```

## 🚀 Quick Start

### Frontend Only (Static Portfolio)

1. Open `index.html` in your browser
2. No server or build tools required

### With Backend (Dynamic Content Management)

**Prerequisites**: Install [Node.js](https://nodejs.org/) first

1. **Install backend dependencies**:
   ```powershell
   cd backend
   npm install
   ```

2. **Start the backend server**:
   ```powershell
   npm start
   ```
   Server runs on `http://localhost:3000`

3. **Access Admin Panel**:
   - URL: `http://localhost:3000/admin`
   - Default username: `admin`
   - Default password: `changeme123`
   - ⚠️ Change password in `backend/.env` file!
## 🎨 Customization

### Using the Admin Panel (Recommended)

1. Start the backend server
2. Login to admin panel: `http://localhost:3000/admin`
3. Update profile, add portfolio items, upload images
4. Changes reflect automatically on the frontend

### Manual Customization

#### Update Personal Information

1. **Contact Details** (in `index.html` or via admin panel):
   - Update email, phone number, and location
   - Add your social media links

2. **Hero Section**:
   - Modify your name and tagline

3. **About Section**:
   - Update your bio and professional background
1. **Contact Details** (in `index.html`):
### Add Your Portfolio Items

**Via Admin Panel** (Recommended):
1. Upload images in "Upload Images" tab
2. Go to "Portfolio" tab
3. Click "Add New Item"
4. Fill in details and submit

**Manually** (in `index.html`):
2. **Hero Section**:
   - Modify your name and tagline in the hero section

3. **About Section**:
   - Update your bio and professional background

### Add Your Portfolio Items

Replace the placeholder portfolio items with your actual work:

```html
<div class="portfolio-item" data-category="development">
    <div class="portfolio-image">
        <img src="path/to/your/image.jpg" alt="Project Name">
    </div>
    <div class="portfolio-info">
        <h3>Your Project Name</h3>
        <p>Project description</p>
        <span class="portfolio-tag">Category</span>
    </div>
</div>
```

### Add Real Images

The portfolio currently uses placeholder icons. To add real images:

1. Create an `images` folder in your project directory
2. Add your photos/screenshots to this folder
3. Update the portfolio items in `index.html` to use real images instead of placeholder divs

### Color Scheme

Modify the CSS variables in `styles.css` to change colors:

```css
:root {
    --primary-color: #2563eb;    /* Main brand color */
## 📧 Form Handling

Forms are now connected to the backend API!

**With Backend Running**:
- Contact form submissions → `POST /api/contact`
- Service requests → `POST /api/service-request`
- Data is logged in server console
- Can be extended to send emails or save to database

**Without Backend**:
- Forms show success alerts
- Data logged to browser console

### Email Integration (Optional)

Add email functionality in `backend/server.js`:
- Use **Nodemailer** for email sending
- Integrate with **SendGrid**, **Mailgun**, or **AWS SES**
- See backend README for examples
- Use serverless functions (Netlify, Vercel)
- Integrate with email APIs (SendGrid, Mailgun)

### Option 3: Google Forms Integration

Connect forms to Google Forms for easy submission tracking.

## 🎯 Service Request System

The portfolio includes a modal-based service request system. When clients click "Request Service" on any service card:

1. A modal opens with a dedicated form
2. The service type is pre-selected
3. Client fills in their details and project requirements
4. Form data is captured (currently logged to console)

To make this functional, integrate with:
- Email services
- CRM systems
- Custom booking systems
- Database storage

## 📱 Responsive Design

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality + API integration
- **Font Awesome**: Icons

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web server framework
- **Multer**: File upload handling
- **CORS**: Cross-origin resource sharing
- **JSON Storage**: Lightweight data storage
## 🌐 Deployment

### Frontend Deployment

#### GitHub Pages
1. Push code to GitHub
2. Go to Settings > Pages
3. Select main branch
4. Site live at `https://yourusername.github.io/repo-name`

#### Netlify
1. Drag and drop project folder to Netlify
2. Or connect GitHub repository
3. Deploy instantly

### Backend Deployment

#### Railway (Recommended)
```powershell
# Install Railway CLI
npm install -g railway

## 📝 Customization Checklist

### With Backend
- [ ] Install Node.js
- [ ] Run `npm install` in backend folder
- [ ] Change admin password in `backend/.env`
- [ ] Start backend server
- [ ] Login to admin panel
- [ ] Update profile information via admin
- [ ] Upload portfolio images
- [ ] Add portfolio items via admin
- [ ] Test contact form submissions
- [ ] Deploy backend to hosting service
- [ ] Update `API_URL` in `script.js` with live backend URL
- [ ] Deploy frontend

### Without Backend
- [ ] Update personal information in HTML
- [ ] Add social media links
- [ ] Replace placeholder portfolio items
- [ ] Add actual project images
- [ ] Update skills and services
- [ ] Configure alternative form handling
- [ ] Test on multiple devices
- [ ] Deploy frontend
# Deploy
git push heroku main
```

#### Render
1. Connect GitHub repository
2. Select backend folder
3. Deploy automatically
## Next Steps

### Immediate Steps
1. **Install Node.js** from https://nodejs.org/
2. **Setup backend**:
   ```powershell
   cd backend
   npm install
   npm start
   ```
3. **Access admin panel**: `http://localhost:3000/admin`
4. **Update content** through admin interface

### Content Updates
1. Upload your real portfolio images
2. Add your actual projects and work
3. Update profile with real contact info
4. Customize services if needed

### Going Live
1. Test everything locally
2. Deploy backend (Railway/Heroku/Render)
3. Update API URL in frontend
4. Deploy frontend (Netlify/Vercel/GitHub Pages)
5. Share your portfolio!

---

**Documentation**:
- [Backend Setup Guide](backend/README.md) - Complete backend documentation
- [Assets Guide](ASSETS_GUIDE.md) - Image optimization tips

**Need Help?** 
- Check backend logs for errors
- Check browser console for frontend issues
- Ensure backend is running when using admin panel
**Option 2: Together**
- Deploy backend with static file serving
- Serve frontend from backend
- Single deployment

See [Backend README](backend/README.md) for detailed deployment steps.
### Vercel

```powershell
npm i -g vercel
vercel
```

## 📝 Customization Checklist

- [ ] Update personal information (name, email, phone)
- [ ] Add social media links
- [ ] Replace placeholder portfolio items with real projects
- [ ] Add actual project images
- [ ] Update skills and services as needed
- [ ] Configure form submission handling
- [ ] Update color scheme to match your brand
- [ ] Add your own photos for About section
- [ ] Test on multiple devices and browsers
- [ ] Deploy to hosting platform

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is free to use for personal and commercial purposes.

## 🤝 Support

For questions or issues, feel free to reach out or modify the code to suit your needs.

---

**Note**: This portfolio uses placeholder content and icons. Replace all placeholders with your actual work, images, and contact information before deploying to production.

## Next Steps

1. Add your real portfolio images to showcase your work
2. Update all personal information and contact details
3. Configure form handling for service requests
4. Test the portfolio thoroughly
5. Deploy to a hosting platform
6. Share your portfolio URL with clients!
