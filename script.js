// API Configuration
const API_URL = 'http://localhost:3000/api';

// Hero Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev');
    });
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Add prev class to current slide for exit animation
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('prev');
    }
    
    // Update current slide
    currentSlide = index;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    
    // Add active class to new slide and indicator
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Auto advance slides every 5 seconds
setInterval(nextSlide, 5000);

// Click indicators to change slides
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
    });
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Add click handlers to portfolio items
function initPortfolioItemClicks() {
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            const category = this.querySelector('.portfolio-tag').textContent;
            
            alert(`${title}\n\n${description}\n\nCategory: ${category}\n\nClick "Request Service" in the ${category} service card to order this type of work!`);
        });
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Service Modal Functions
const serviceModal = document.getElementById('serviceModal');
const modalTitle = document.getElementById('modalTitle');
const serviceTypeInput = document.getElementById('serviceType');

const serviceNames = {
    'backend': 'Backend Development',
    'app': 'App Development',
    'analysis': 'Data Analysis',
    'photography': 'Photography',
    'videography': 'Videography',
    'editing': 'Video Editing & Training'
};

function openServiceModal(serviceType) {
    serviceModal.classList.add('active');
    modalTitle.textContent = `Request ${serviceNames[serviceType]}`;
    serviceTypeInput.value = serviceType;
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    serviceModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.getElementById('serviceRequestForm').reset();
}

// Close modal when clicking outside
serviceModal.addEventListener('click', (e) => {
    if (e.target === serviceModal) {
        closeServiceModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
        closeServiceModal();
    }
});

// WhatsApp Quick Contact
function contactViaWhatsApp(service = '') {
    const phoneNumber = '254791847710';
    let message = 'Hi Alex, I would like to discuss ';
    if (service) {
        message += `${serviceNames[service]} services.`;
    } else {
        message += 'your services.';
    }
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Update Contact Form to use API
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            alert('Thank you for reaching out! I\'ll get back to you as soon as possible.');
            e.target.reset();
        } else {
            alert('Failed to send message. Please try again.');
        }
    } catch (error) {
        console.log('Contact form:', data);
        alert('Thank you for reaching out! I\'ll get back to you as soon as possible.');
        e.target.reset();
    }
});

// Update Service Request Form to use API
document.getElementById('serviceRequestForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch(`${API_URL}/service-request`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            submitBtn.textContent = '✓ Request Sent!';
            submitBtn.style.backgroundColor = '#10b981';
            setTimeout(() => {
                alert(`Thank you for your request for ${serviceNames[data.serviceType]}!\n\nI'll review your project details and get back to you within 24 hours.\n\nFor urgent inquiries, feel free to WhatsApp me at +254 791 847 710`);
                closeServiceModal();
            }, 500);
        } else {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            alert('Failed to send request. Please try contacting me directly.');
        }
    } catch (error) {
        console.log('Service Request:', data);
        submitBtn.textContent = '✓ Request Received!';
        submitBtn.style.backgroundColor = '#10b981';
        setTimeout(() => {
            alert(`Thank you for your request for ${serviceNames[data.serviceType]}!\n\nI'll review your project details and get back to you soon.\n\nDirect contact:\n📧 alexnyakundi291@gmail.com\n📱 +254 791 847 710`);
            closeServiceModal();
        }, 500);
    }
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form Validation Enhancement
const inputs = document.querySelectorAll('input, textarea, select');

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() !== '' && input.checkValidity()) {
            input.style.borderColor = '#10b981';
        } else if (!input.checkValidity() && input.value.trim() !== '') {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '#e2e8f0';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = '#2563eb';
    });
});

// Load Portfolio Items from API
async function loadPortfolioFromAPI() {
    try {
        const response = await fetch(`${API_URL}/portfolio`);
        if (response.ok) {
            const portfolioData = await response.json();
            updatePortfolioGrid(portfolioData);
        }
    } catch (error) {
        console.log('Using static portfolio data');
    }
}

function updatePortfolioGrid(portfolioData) {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;
    
    portfolioGrid.innerHTML = '';
    
    portfolioData.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-category', item.category);
        
        portfolioItem.innerHTML = `
            <div class="portfolio-image">
                ${item.image ? `<img src="${API_URL.replace('/api', '')}${item.image}" alt="${item.title}" onerror="this.parentElement.innerHTML='<div class=\\'placeholder-image\\'><i class=\\'fas fa-image\\'></i></div>'">` : '<div class="placeholder-image"><i class="fas fa-image"></i></div>'}
            </div>
            <div class="portfolio-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <span class="portfolio-tag">${item.tag}</span>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
    
    // Reattach observer
    document.querySelectorAll('.portfolio-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        if (typeof observer !== 'undefined') {
            observer.observe(el);
        }
    });
}

// Load Profile Data from API
async function loadProfileFromAPI() {
    try {
        const response = await fetch(`${API_URL}/profile`);
        if (response.ok) {
            const profile = await response.json();
            updateProfileInfo(profile);
        }
    } catch (error) {
        console.log('Using static profile data');
    }
}

function updateProfileInfo(profile) {
    // Update contact information
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const h3 = item.querySelector('h3');
        if (h3 && h3.textContent === 'Email') {
            item.querySelector('p').textContent = profile.email;
        } else if (h3 && h3.textContent === 'Phone') {
            item.querySelector('p').textContent = profile.phone;
        } else if (h3 && h3.textContent === 'Location') {
            item.querySelector('p').textContent = profile.location;
        }
    });
    
    // Update social links
    if (profile.socialLinks) {
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach((link, index) => {
            const icons = ['linkedin', 'github', 'instagram', 'youtube'];
            if (profile.socialLinks[icons[index]]) {
                link.href = profile.socialLinks[icons[index]];
            }
        });
    }
}

// Update Contact Form to use API (duplicate removed)

// Particle System (duplicate removed)

// Custom Cursor
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.resize();
        this.init();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        // Draw connections
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.15 * (1 - distance / 150)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.update());
    }
}

// Custom Cursor
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorOutline.style.left = outlineX - 20 + 'px';
        cursorOutline.style.top = outlineY - 20 + 'px';
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();
    
    // Click effect
    document.addEventListener('mousedown', () => {
        cursorDot.classList.add('click');
        cursorOutline.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
        cursorDot.classList.remove('click');
        cursorOutline.classList.remove('click');
    });
    
    // Hover effects on interactive elements
    document.querySelectorAll('a, button, .btn, .service-card, .portfolio-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(2)';
            cursorOutline.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
        });
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealOnScroll = () => {
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

// Typing Animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Magnetic Buttons
function initMagneticButtons() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Smooth Scroll with Offset
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio Website Loaded');
    
    // Add initial animation class to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(() => {
            heroContent.style.opacity = '1';
        }, 100);
    }
    
    // Initialize particle system
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const particles = new ParticleSystem(canvas);
        particles.update();
    }
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize scroll reveal
    initScrollReveal();
    
    // Initialize magnetic buttons
    initMagneticButtons();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize portfolio item clicks
    initPortfolioItemClicks();
    
    // Add reveal classes to elements
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.portfolio-item').forEach((item, index) => {
        item.classList.add('reveal-scale');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.skill-category').forEach((skill, index) => {
        skill.classList.add('reveal');
        skill.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Load data from API
    loadPortfolioFromAPI();
    loadProfileFromAPI();
    
    // Console welcome message
    console.log('%cWelcome to Alex Nyakundi\'s Portfolio! 🚀', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
    console.log('%cLooking to hire? Contact me at alexnyakundi291@gmail.com', 'color: #9333ea; font-size: 14px;');
});
