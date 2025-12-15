const API_URL = 'http://localhost:3000/api';
let credentials = { username: '', password: '' };

// Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    credentials = { username, password };
    
    try {
        // Test authentication with a simple API call
        const response = await fetch(`${API_URL}/data`);
        
        if (response.ok) {
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('adminContainer').classList.add('active');
            loadProfileData();
            loadPortfolioData();
        } else {
            showLoginError('Invalid credentials');
        }
    } catch (error) {
        showLoginError('Failed to connect to server. Make sure the backend is running.');
    }
});

function showLoginError(message) {
    const errorDiv = document.getElementById('loginError');
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    setTimeout(() => errorDiv.classList.remove('show'), 5000);
}

function logout() {
    credentials = { username: '', password: '' };
    document.getElementById('adminContainer').classList.remove('active');
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('loginForm').reset();
}

// Tab switching
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');
}

// Alert
function showAlert(message, type = 'success') {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type} show`;
    setTimeout(() => alertBox.classList.remove('show'), 5000);
}

// Load Profile Data
async function loadProfileData() {
    try {
        const response = await fetch(`${API_URL}/profile`);
        const profile = await response.json();
        
        document.getElementById('profileName').value = profile.name || '';
        document.getElementById('profileTitle').value = profile.title || '';
        document.getElementById('profileEmail').value = profile.email || '';
        document.getElementById('profilePhone').value = profile.phone || '';
        document.getElementById('profileLocation').value = profile.location || '';
        
        if (profile.socialLinks) {
            document.getElementById('socialLinkedin').value = profile.socialLinks.linkedin || '';
            document.getElementById('socialGithub').value = profile.socialLinks.github || '';
            document.getElementById('socialInstagram').value = profile.socialLinks.instagram || '';
            document.getElementById('socialYoutube').value = profile.socialLinks.youtube || '';
        }
    } catch (error) {
        showAlert('Failed to load profile data', 'error');
    }
}

// Save Profile
document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const profile = {
        name: document.getElementById('profileName').value,
        title: document.getElementById('profileTitle').value,
        email: document.getElementById('profileEmail').value,
        phone: document.getElementById('profilePhone').value,
        location: document.getElementById('profileLocation').value,
        socialLinks: {
            linkedin: document.getElementById('socialLinkedin').value,
            github: document.getElementById('socialGithub').value,
            instagram: document.getElementById('socialInstagram').value,
            youtube: document.getElementById('socialYoutube').value
        }
    };
    
    try {
        const response = await fetch(`${API_URL}/profile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...credentials, profile })
        });
        
        if (response.ok) {
            showAlert('Profile updated successfully!');
        } else {
            showAlert('Failed to update profile', 'error');
        }
    } catch (error) {
        showAlert('Failed to update profile', 'error');
    }
});

// Load Portfolio Data
async function loadPortfolioData() {
    try {
        const response = await fetch(`${API_URL}/portfolio`);
        const portfolio = await response.json();
        
        const grid = document.getElementById('portfolioGrid');
        grid.innerHTML = '';
        
        portfolio.forEach(item => {
            const card = document.createElement('div');
            card.className = 'portfolio-card';
            card.innerHTML = `
                <img src="${API_URL.replace('/api', '')}${item.image}" alt="${item.title}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22><rect fill=%22%23ddd%22 width=%22300%22 height=%22200%22/><text x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22 fill=%22%23999%22>No Image</text></svg>'">
                <div class="portfolio-card-body">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <p style="font-size: 0.9rem; color: #9ca3af;">
                        <strong>Category:</strong> ${item.category}<br>
                        <strong>Tag:</strong> ${item.tag}
                    </p>
                    <div class="portfolio-actions">
                        <button class="btn btn-danger" onclick="deletePortfolioItem(${item.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        showAlert('Failed to load portfolio items', 'error');
    }
}

// Show/Hide Add Portfolio Form
function showAddPortfolioForm() {
    document.getElementById('addPortfolioForm').style.display = 'block';
}

function hideAddPortfolioForm() {
    document.getElementById('addPortfolioForm').style.display = 'none';
    document.getElementById('portfolioForm').reset();
}

// Add Portfolio Item
document.getElementById('portfolioForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const item = {
        title: document.getElementById('portfolioTitle').value,
        description: document.getElementById('portfolioDescription').value,
        category: document.getElementById('portfolioCategory').value,
        tag: document.getElementById('portfolioTag').value,
        image: document.getElementById('portfolioImage').value
    };
    
    try {
        const response = await fetch(`${API_URL}/portfolio`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...credentials, item })
        });
        
        if (response.ok) {
            showAlert('Portfolio item added successfully!');
            hideAddPortfolioForm();
            loadPortfolioData();
        } else {
            showAlert('Failed to add portfolio item', 'error');
        }
    } catch (error) {
        showAlert('Failed to add portfolio item', 'error');
    }
});

// Delete Portfolio Item
async function deletePortfolioItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/portfolio/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        
        if (response.ok) {
            showAlert('Portfolio item deleted successfully!');
            loadPortfolioData();
        } else {
            showAlert('Failed to delete portfolio item', 'error');
        }
    } catch (error) {
        showAlert('Failed to delete portfolio item', 'error');
    }
}

// Image Upload
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');

uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        uploadFile(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        uploadFile(e.target.files[0]);
    }
});

async function uploadFile(file) {
    if (!file.type.startsWith('image/')) {
        showAlert('Please upload an image file', 'error');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
        showAlert('File size must be less than 5MB', 'error');
        return;
    }
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const data = await response.json();
            showAlert('Image uploaded successfully!');
            
            // Show preview
            const preview = document.getElementById('uploadPreview');
            const previewImage = document.getElementById('previewImage');
            const uploadedUrl = document.getElementById('uploadedUrl');
            
            previewImage.src = API_URL.replace('/api', '') + data.url;
            uploadedUrl.textContent = data.url;
            preview.style.display = 'block';
        } else {
            showAlert('Failed to upload image', 'error');
        }
    } catch (error) {
        showAlert('Failed to upload image', 'error');
    }
}
