// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(13, 13, 13, 0.98)';
    } else {
        navbar.style.background = 'rgba(13, 13, 13, 0.95)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '') + 
                                (element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '') + 
                                (element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate counters when stats section is visible
            if (entry.target.classList.contains('about-stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    stat.textContent = '0' + text.replace(/\d/g, '');
                    animateCounter(stat, number);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .service-card, .about-stats, .contact-item').forEach(el => {
    observer.observe(el);
});

// Form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Simple form validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showNotification('Por favor, ingresa un email válido', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('¡Mensaje enviado exitosamente! Te contactaré pronto.', 'success');
        this.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#1E90FF' : type === 'error' ? '#FF6600' : '#333'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

function hideNotification(notification) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Typing animation for hero text
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

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        typeWriter(heroSubtitle, originalText, 80);
    }
});

// Parallax effect for hero background elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.bg-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skills animation on scroll
const skillsSection = document.querySelector('.skills-grid');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skills = entry.target.querySelectorAll('.skill');
                skills.forEach((skill, index) => {
                    setTimeout(() => {
                        skill.style.opacity = '1';
                        skill.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
    
    // Initially hide skills for animation
    document.querySelectorAll('.skill').forEach(skill => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateY(20px)';
        skill.style.transition = 'all 0.3s ease';
    });
}

// Add loading animation to page
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loading');
    
    // Remove loading class after animations complete
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 1000);
});

// Add custom cursor for interactive elements
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'custom-cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, #1E90FF, #FF6600);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: all 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(newCursor);
    }
    
    const customCursor = document.querySelector('.custom-cursor');
    customCursor.style.left = e.clientX - 10 + 'px';
    customCursor.style.top = e.clientY - 10 + 'px';
    customCursor.style.opacity = '1';
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.opacity = '0';
    }
});

// Console greeting message
console.log(`
🏀 ¡Hola! Soy Marko Pamich 
💻 Full Stack Developer & Professional Athlete
🚀 Creando experiencias digitales con disciplina deportiva

¿Interesado en trabajar juntos?
📧 marko.pamich@email.com
🔗 LinkedIn: /in/marko-pamich
`);

// Performance optimization - Lazy loading for images
const lazyImages = document.querySelectorAll('img[loading="lazy"]');

// Image loading handler
function handleImageLoad() {
    lazyImages.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
            // Hide placeholder background
            const placeholder = this.closest('.project-placeholder');
            if (placeholder) {
                placeholder.style.background = 'transparent';
            }
        });

        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            // Show fallback content
            const placeholder = this.closest('.project-placeholder');
            if (placeholder) {
                placeholder.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; color: #1E90FF;">
                        <i class="fas fa-image" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                        <span>Imagen no disponible</span>
                    </div>
                `;
            }
        });
    });
}

// Enhanced intersection observer for project images
const projectImageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target.querySelector('img[loading="lazy"]');
            if (img && !img.complete) {
                // Add loading animation
                const placeholder = img.closest('.project-placeholder');
                if (placeholder) {
                    placeholder.style.position = 'relative';
                    placeholder.insertAdjacentHTML('beforeend', `
                        <div class="image-loader" style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            color: #1E90FF;
                            font-size: 2rem;
                            z-index: 2;
                        ">
                            <i class="fas fa-spinner fa-spin"></i>
                        </div>
                    `);
                }
                
                img.addEventListener('load', function() {
                    // Remove loading animation
                    const loader = placeholder?.querySelector('.image-loader');
                    if (loader) {
                        loader.remove();
                    }
                }, { once: true });
            }
            projectImageObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe project cards for image loading
document.querySelectorAll('.project-card').forEach(card => {
    projectImageObserver.observe(card);
});

// Initialize image loading
document.addEventListener('DOMContentLoaded', handleImageLoad);
