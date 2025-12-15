# Backend Setup Guide

## Portfolio Backend with Admin Panel

Your portfolio now has a complete backend system that allows you to:
- Update your profile information
- Add/delete portfolio items
- Upload images
- Manage all content through an admin panel

## Prerequisites

**Install Node.js** (if not already installed):
1. Download from: https://nodejs.org/
2. Install the LTS version (Long Term Support)
3. Verify installation: `node --version` and `npm --version`

## Installation Steps

### 1. Navigate to Backend Folder

```powershell
cd backend
```

### 2. Install Dependencies

```powershell
npm install
```

This will install:
- **express**: Web server framework
- **cors**: Enable cross-origin requests
- **multer**: Handle file uploads
- **body-parser**: Parse request bodies
- **dotenv**: Environment variables

### 3. Configure Environment Variables

Edit `backend/.env` file to change default credentials:

```env
PORT=3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme123
NODE_ENV=development
```

**⚠️ IMPORTANT**: Change the default password before deploying!

## Running the Backend

### Development Mode (Auto-restart on changes)

```powershell
npm run dev
```

### Production Mode

```powershell
npm start
```

The server will start on `http://localhost:3000`

## Accessing the Admin Panel

1. Start the backend server (see above)
2. Open browser: `http://localhost:3000/admin`
3. Login with credentials from `.env` file
   - Default username: `admin`
   - Default password: `changeme123`

## Admin Panel Features

### 1. Profile Management
- Update your name, title, email, phone
- Update location
- Manage social media links (LinkedIn, GitHub, Instagram, YouTube)

### 2. Portfolio Management
- View all portfolio items
- Add new portfolio items
- Delete existing items
- Each item includes:
  - Title
  - Description
  - Category (development, photography, videography, editing)
  - Tag
  - Image URL

### 3. Image Upload
- Drag & drop or click to upload
- Supported formats: JPG, PNG, GIF, WebP
- Maximum file size: 5MB
- Images are stored in `public/uploads/`
- Get image URL to use in portfolio items

## API Endpoints

All endpoints are prefixed with `/api`

### Public Endpoints (No authentication required)

- `GET /api/data` - Get all data
- `GET /api/profile` - Get profile information
- `GET /api/services` - Get services list
- `GET /api/portfolio` - Get portfolio items
- `POST /api/contact` - Submit contact form
- `POST /api/service-request` - Submit service request
- `GET /api/health` - Health check

### Protected Endpoints (Authentication required)

All require `username` and `password` in request body:

- `POST /api/profile` - Update profile
- `POST /api/services` - Update services
- `POST /api/portfolio` - Add portfolio item
- `PUT /api/portfolio/:id` - Update portfolio item
- `DELETE /api/portfolio/:id` - Delete portfolio item
- `POST /api/upload` - Upload image

### Example API Request (Profile Update)

```javascript
fetch('http://localhost:3000/api/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        username: 'admin',
        password: 'changeme123',
        profile: {
            name: 'Alex Nyakundi',
            email: 'alex@example.com',
            phone: '+254 712 345 678'
        }
    })
});
```

## Data Storage

Data is stored in `backend/data.json` as a JSON file. This includes:
- Profile information
- About section
- Services
- Portfolio items

### Backup Your Data

Regularly backup `backend/data.json` and `public/uploads/` folder!

## Frontend Integration

The frontend (`index.html`, `script.js`) is already configured to:
- Load portfolio items from API
- Load profile data from API
- Submit contact forms to API
- Submit service requests to API

The frontend will work with or without the backend running:
- **With backend**: Dynamic content from API
- **Without backend**: Static content from HTML

## Workflow for Updating Content

1. **Start the backend server**
   ```powershell
   cd backend
   npm start
   ```

2. **Upload images** (if needed)
   - Go to `http://localhost:3000/admin`
   - Login
   - Go to "Upload Images" tab
   - Upload your images
   - Copy the image URL (e.g., `/uploads/1234567890-image.jpg`)

3. **Add portfolio items**
   - Go to "Portfolio" tab
   - Click "Add New Item"
   - Fill in details
   - Paste the image URL from step 2
   - Submit

4. **Update profile**
   - Go to "Profile" tab
   - Update your information
   - Save changes

5. **View changes**
   - Open `index.html` in browser
   - Changes appear automatically (may need to refresh)

## File Structure

```
backend/
├── server.js           # Main server file
├── package.json        # Dependencies
├── .env               # Environment variables (KEEP SECRET!)
├── data.json          # Content storage
├── public/            # Admin panel
│   ├── index.html     # Admin interface
│   └── admin.js       # Admin functionality
└── uploads/           # Uploaded images (ignored)

public/
└── uploads/           # Uploaded images served to frontend
```

## Security Notes

⚠️ **IMPORTANT SECURITY CONSIDERATIONS**:

1. **Change default password** in `.env` before deploying
2. **Never commit `.env` file** to Git (add to `.gitignore`)
3. **Use HTTPS** in production
4. For production, consider:
   - Using a real database (MongoDB, PostgreSQL)
   - Implementing JWT authentication
   - Adding rate limiting
   - Using environment-specific configs

## Troubleshooting

### "Port already in use"
Change the port in `.env` or kill the process:
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Images not showing
- Check that images are in `public/uploads/`
- Verify image URL starts with `/uploads/`
- Check browser console for errors

### "Cannot connect to server"
- Make sure backend is running
- Check the port matches in `.env` and `script.js`
- Verify no firewall is blocking localhost

### Login fails
- Check credentials in `.env`
- Clear browser cache
- Check browser console for errors

## Deployment

### Backend Deployment Options

1. **Heroku**
2. **Railway**
3. **Render**
4. **DigitalOcean**
5. **AWS/Azure**

### Frontend Deployment

Keep frontend separate or serve from backend:

**Option 1: Separate** (Recommended)
- Frontend: GitHub Pages/Netlify/Vercel
- Backend: Heroku/Railway/Render

**Option 2: Serve from Backend**
- Add frontend files to `backend/public`
- Update `server.js` to serve static files

## Next Steps

1. Install Node.js if not already installed
2. Run `npm install` in backend folder
3. Start server with `npm start`
4. Access admin panel and update content
5. Add your real portfolio images
6. Update profile information
7. Test all features
8. Deploy to production

---

**Need Help?** Check the console logs in the browser and terminal for error messages.
