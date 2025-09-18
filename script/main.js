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

// Enhanced image loading with fallback and loading states
function initializeImageHandling() {
    const allImages = document.querySelectorAll('img');
    
    allImages.forEach(img => {
        // Add loading state
        const wrapper = img.parentElement;
        if (wrapper) {
            wrapper.style.position = 'relative';
            wrapper.style.overflow = 'hidden';
        }

        // Create loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'image-loading';
        loadingIndicator.innerHTML = `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #1E90FF;
                font-size: 1.5rem;
                z-index: 2;
                background: rgba(0,0,0,0.8);
                padding: 1rem;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <i class="fas fa-spinner fa-spin"></i>
            </div>
        `;

        // Insert loading indicator
        if (wrapper && !img.complete) {
            wrapper.appendChild(loadingIndicator);
        }

        // Handle successful image load
        img.addEventListener('load', function() {
            this.classList.add('image-loaded');
            this.style.opacity = '1';
            
            // Remove loading indicator
            const loader = this.parentElement?.querySelector('.image-loading');
            if (loader) {
                loader.remove();
            }
            
            // Add fade-in animation
            this.style.transition = 'opacity 0.5s ease-in-out';
        });

        // Handle image error
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            
            // Remove loading indicator
            const loader = this.parentElement?.querySelector('.image-loading');
            if (loader) {
                loader.remove();
            }
            
            // Create fallback content
            const fallback = document.createElement('div');
            fallback.className = 'image-fallback';
            fallback.innerHTML = `
                <div style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 200px;
                    background: linear-gradient(135deg, #1E90FF20, #FF660020);
                    color: #1E90FF;
                    border-radius: 10px;
                    text-align: center;
                    padding: 2rem;
                ">
                    <i class="fas fa-image" style="font-size: 2rem; margin-bottom: 0.5rem; opacity: 0.7;"></i>
                    <span style="font-size: 0.9rem; opacity: 0.8;">Imagen no disponible</span>
                </div>
            `;
            
            // Replace image with fallback
            this.style.display = 'none';
            this.parentElement?.appendChild(fallback);
        });

        // Set initial styles
        if (!img.complete) {
            img.style.opacity = '0';
        }
    });
}

// Enhanced project card interactions
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(30, 144, 255, 0.3)';
            
            // Pause parallax effect on hover
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });

        // Add click interaction for project details
        card.addEventListener('click', function() {
            const projectTitle = this.querySelector('.project-title')?.textContent || 'Proyecto';
            showProjectDetails(projectTitle, index);
        });

        // Add entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Project details modal
function showProjectDetails(title, index) {
    const projects = [
        {
            title: 'Vieja Estación',
            description: 'Bar & Live Music Venue - Una experiencia completa de entretenimiento nocturno',
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
            features: ['Diseño responsivo', 'Galería interactiva', 'Sistema de eventos', 'Integración de redes sociales']
        },
        {
            title: 'Analytics Dashboard',
            description: 'Aplicación de visualización de datos con métricas en tiempo real',
            tech: ['React', 'Chart.js', 'Node.js', 'MongoDB'],
            features: ['Visualización de datos', 'Métricas en tiempo real', 'Panel administrativo', 'Exportación de reportes']
        },
        {
            title: 'Sports Training App',
            description: 'Aplicación de entrenamiento deportivo personalizado',
            tech: ['React Native', 'Firebase', 'TypeScript', 'Redux'],
            features: ['Planes de entrenamiento', 'Seguimiento de progreso', 'Comunidad de atletas', 'Análisis de rendimiento']
        }
    ];

    const project = projects[index] || projects[0];
    
    showNotification(`🚀 ${project.title}: ${project.description}`, 'info');
}

// Enhanced notification system with better styling
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: '#1E90FF',
        error: '#FF6600',
        info: '#333',
        warning: '#FFA500'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add enhanced styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1.2rem 1.8rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
        opacity: 0.7;
        transition: opacity 0.3s ease;
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
    
    closeBtn.addEventListener('mouseenter', function() {
        this.style.opacity = '1';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
        this.style.opacity = '0.7';
    });
    
    // Auto hide after 6 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 6000);
}

function hideNotification(notification) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 400);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeImageHandling();
    initializeProjectCards();
    initializeContactForm(); // Solo la función simplificada
    
    // Show welcome message
    setTimeout(() => {
        showNotification('¡Bienvenido a mi portfolio! 🚀 Explora mis proyectos haciendo clic en las tarjetas.', 'info');
    }, 1500);
});

// ===========================
// WHATSAPP FUNCTIONALITY - ULTRA SIMPLE
// ===========================

// Función global ultra simple para el onclick
function enviarAWhatsApp() {
    console.log('🚀 Función enviarAWhatsApp() llamada');
    
    // Obtener valores directamente
    const nombre = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const asunto = document.getElementById('subject').value.trim();
    const mensaje = document.getElementById('message').value.trim();
    
    console.log('📝 Datos obtenidos:');
    console.log('- Nombre:', nombre);
    console.log('- Email:', email);
    console.log('- Asunto:', asunto);
    console.log('- Mensaje:', mensaje);
    
    // Validación super simple
    if (!nombre || !email || !asunto || !mensaje) {
        alert('Por favor, completa todos los campos antes de enviar.');
        console.log('❌ Campos incompletos');
        return;
    }
    
    console.log('✅ Todos los campos completados');
    
    // Crear mensaje para WhatsApp
    const textoWhatsApp = `Hola! Nueva consulta desde tu portfolio:
    
📝 Nombre: ${nombre}
📧 Email: ${email}
📋 Asunto: ${asunto}

💬 Mensaje:
${mensaje}

---
Enviado desde: ${window.location.href}`;
    
    // Codificar mensaje
    const mensajeCodificado = encodeURIComponent(textoWhatsApp);
    
    // Crear URL de WhatsApp
    const numeroWhatsApp = '5492996120756';
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
    
    console.log('📱 URL WhatsApp:', urlWhatsApp);
    
    // Abrir WhatsApp
    try {
        window.open(urlWhatsApp, '_blank');
        console.log('✅ WhatsApp abierto');
        
        // Limpiar formulario
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('message').value = '';
        
        alert('¡WhatsApp abierto! Completa el envío desde la aplicación.');
        
    } catch (error) {
        console.error('❌ Error al abrir WhatsApp:', error);
        alert('Error al abrir WhatsApp. Por favor, intenta de nuevo.');
    }
}

// Contact form functionality - VERSIÓN SIMPLIFICADA
function initializeContactForm() {
    console.log('🚀 Inicializando formulario de contacto (versión simplificada)...');
    
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
        console.error('❌ No se encontró el formulario con ID "contact-form"');
        return;
    }
    
    console.log('✅ Formulario encontrado');
    
    // Solo agregar el event listener, sin validación compleja
    contactForm.addEventListener('submit', handleFormSubmitSimple);
    console.log('✅ Event listener agregado');
}

// Función simplificada de envío - SIN validación compleja
function handleFormSubmitSimple(e) {
    e.preventDefault();
    console.log('📋 Formulario enviado (versión simple)');
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.innerHTML;
    
    // Obtener valores directamente
    const name = form.querySelector('#name').value || '';
    const email = form.querySelector('#email').value || '';
    const subject = form.querySelector('#subject').value || '';
    const message = form.querySelector('#message').value || '';
    
    console.log('� Valores obtenidos:');
    console.log('- Nombre:', name);
    console.log('- Email:', email);
    console.log('- Asunto:', subject);
    console.log('- Mensaje:', message);
    
    // Validación SUPER simple - solo verificar que no estén completamente vacíos
    if (!name || !email || !subject || !message) {
        console.log('❌ Algún campo está vacío');
        alert('Por favor completa todos los campos');
        return;
    }
    
    console.log('✅ Todos los campos tienen contenido');
    
    // Cambiar botón
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Abriendo WhatsApp...';
    
    // Crear datos
    const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };
    
    // Crear mensaje y abrir WhatsApp
    setTimeout(() => {
        try {
            const whatsappMessage = createWhatsAppMessageSimple(formData);
            openWhatsAppSimple(whatsappMessage);
            
            alert('¡WhatsApp abierto! Completa el envío desde la aplicación.');
            form.reset();
            
        } catch (error) {
            console.error('Error:', error);
            alert('Error al abrir WhatsApp');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = btnText;
        }
    }, 500);
}

// Función simplificada para crear mensaje
function createWhatsAppMessageSimple(data) {
    const message = `Hola! Nueva consulta desde tu portfolio:

Nombre: ${data.name}
Email: ${data.email}  
Asunto: ${data.subject}

Mensaje:
${data.message}`;
    
    return encodeURIComponent(message);
}

// Función simplificada para abrir WhatsApp
function openWhatsAppSimple(message) {
    const phoneNumber = '5492996120756';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    
    console.log('📱 Abriendo WhatsApp:', whatsappURL);
    window.open(whatsappURL, '_blank');
}

// ===========================
// FUNCIONES DE PRUEBA GLOBALES
// ===========================

// Función ULTRA simple para probar
window.probarWhatsApp = function() {
    console.log('🧪 Probando WhatsApp directamente...');
    
    // Llenar campos
    document.getElementById('name').value = 'Usuario Prueba';
    document.getElementById('email').value = 'test@ejemplo.com';
    document.getElementById('subject').value = 'Mensaje de prueba';
    document.getElementById('message').value = 'Este es un mensaje de prueba desde la consola.';
    
    console.log('✅ Campos llenados');
    
    // Llamar función directa
    enviarAWhatsApp();
};

// Función para probar URL directa
window.abrirWhatsAppDirecto = function() {
    const mensaje = 'Prueba directa desde consola';
    const url = `https://wa.me/5492996120756?text=${encodeURIComponent(mensaje)}`;
    console.log('🔗 Abriendo URL:', url);
    window.open(url, '_blank');
};

// Función simple para probar desde la consola
window.testFormularioSimple = function() {
    console.log('🧪 Probando formulario simplificado...');
    
    const form = document.getElementById('contact-form');
    if (!form) {
        console.error('❌ Formulario no encontrado');
        return;
    }
    
    // Llenar con datos de prueba
    form.querySelector('#name').value = 'Usuario Prueba';
    form.querySelector('#email').value = 'test@ejemplo.com';
    form.querySelector('#subject').value = 'Consulta de prueba';
    form.querySelector('#message').value = 'Este es un mensaje de prueba.';
    
    console.log('✅ Formulario llenado con datos de prueba');
    
    // Enviar formulario
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
};

/* 
// FUNCIONES ANTIGUAS COMENTADAS TEMPORALMENTE
async function handleFormSubmit(e) {
    e.preventDefault();
    console.log('📋 Formulario enviado');
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.innerHTML;
    
    // Obtener valores de campos
    const nameValue = form.name ? form.name.value.trim() : '';
    const emailValue = form.email ? form.email.value.trim() : '';
    const subjectValue = form.subject ? form.subject.value.trim() : '';
    const messageValue = form.message ? form.message.value.trim() : '';
    
    console.log('📝 Datos del formulario:');
    console.log('- Nombre:', `"${nameValue}"`);
    console.log('- Email:', `"${emailValue}"`);
    console.log('- Asunto:', `"${subjectValue}"`);
    console.log('- Mensaje:', `"${messageValue}"`);
    
    // Validación detallada
    const errors = [];
    
    if (!nameValue) {
        errors.push('Nombre es requerido');
    }
    
    if (!emailValue) {
        errors.push('Email es requerido');
    } else if (!isValidEmail(emailValue)) {
        errors.push('Email no es válido');
    }
    
    if (!subjectValue) {
        errors.push('Asunto es requerido');
    }
    
    if (!messageValue) {
        errors.push('Mensaje es requerido');
    }
    
    if (errors.length > 0) {
        console.log('❌ Errores encontrados:', errors);
        showNotification(`Errores: ${errors.join(', ')}`, 'error');
        return;
    }
    
    console.log('✅ Validación pasada correctamente');
    
    // Deshabilitar botón y mostrar loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando WhatsApp...';
    console.log('🔄 Botón deshabilitado');
    
    // Obtener datos del formulario
    const formData = {
        name: nameValue,
        email: emailValue,
        subject: subjectValue,
        message: messageValue
    };
    
    try {
        // Crear mensaje para WhatsApp
        const whatsappMessage = createWhatsAppMessage(formData);
        console.log('💬 Mensaje creado:', whatsappMessage);
        
        // Abrir WhatsApp
        console.log('📱 Abriendo WhatsApp...');
        openWhatsApp(whatsappMessage);
        
        // Mostrar mensaje de éxito
        setTimeout(() => {
            showNotification('¡Redirigiendo a WhatsApp! 📱 Completa el envío desde la aplicación.', 'success');
            form.reset();
            console.log('✅ Formulario reseteado');
        }, 1000);
        
    } catch (error) {
        console.error('❌ Error:', error);
        showNotification('Error al abrir WhatsApp. Por favor, intenta de nuevo.', 'error');
    } finally {
        // Restaurar botón
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = btnText;
            console.log('🔄 Botón restaurado');
        }, 2000);
    }
}

// Crear mensaje formateado para WhatsApp
function createWhatsAppMessage(data) {
    const message = `🌟 *Nueva consulta desde Portfolio Web*

👤 *Nombre:* ${data.name}
📧 *Email:* ${data.email}
📋 *Asunto:* ${data.subject}

💬 *Mensaje:*
${data.message}

---
_Enviado desde portfolio web: ${window.location.href}_`;
    
    return encodeURIComponent(message);
}

// Abrir WhatsApp con mensaje pre-llenado
function openWhatsApp(message) {
    const phoneNumber = '5492996120756'; // Tu número de WhatsApp con código de país
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    
    console.log('📱 Número de WhatsApp:', phoneNumber);
    console.log('🔗 URL generada:', whatsappURL);
    
    // Abrir en una nueva ventana/pestaña
    try {
        const newWindow = window.open(whatsappURL, '_blank');
        if (newWindow) {
            console.log('✅ WhatsApp abierto correctamente');
        } else {
            console.log('⚠️ Posible bloqueo de popup');
        }
    } catch (error) {
        console.error('❌ Error al abrir WhatsApp:', error);
    }
}

// Validar todos los campos del formulario
function validateAllFields(form) {
    let isValid = true;
    const fields = form.querySelectorAll('input[required], textarea[required]');
    
    fields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validación en tiempo real (simplificada)
function setupFormValidation() {
    console.log('🔍 Configurando validación...');
    
    const form = document.getElementById('contact-form');
    if (!form) {
        console.error('❌ No se encontró el formulario para validación');
        return;
    }
    
    const inputs = form.querySelectorAll('input, textarea');
    console.log('📝 Campos encontrados:', inputs.length);
    
    inputs.forEach((input, index) => {
        console.log(`Campo ${index + 1}:`, input.name);
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearValidationErrors);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    console.log(`🔍 Validando campo ${field.name}: "${value}"`);
    
    clearFieldError(field);
    
    if (!value) {
        console.log(`❌ Campo ${field.name} está vacío`);
        showFieldError(field, 'Este campo es obligatorio');
        return false;
    }
    
    if (field.type === 'email' && !isValidEmail(value)) {
        console.log(`❌ Email ${value} no es válido`);
        showFieldError(field, 'Por favor, ingresa un email válido');
        return false;
    }
    
    console.log(`✅ Campo ${field.name} es válido`);
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
    field.classList.add('error');
}

function clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.classList.remove('error');
}

function clearValidationErrors(e) {
    clearFieldError(e.target);
}

// ===========================
// DEBUG FUNCTIONS (para usar en consola)
// ===========================

// Función para probar el formulario desde la consola
window.testContactForm = function() {
    console.log('🧪 Probando formulario de contacto...');
    
    const form = document.getElementById('contact-form');
    if (!form) {
        console.error('❌ Formulario no encontrado');
        return;
    }
    
    // Llenar campos con datos de prueba
    form.name.value = 'Prueba Usuario';
    form.email.value = 'prueba@test.com';
    form.subject.value = 'Mensaje de prueba';
    form.message.value = 'Este es un mensaje de prueba desde la consola.';
    
    console.log('✅ Campos llenados con datos de prueba');
    console.log('🚀 Enviando formulario...');
    
    // Simular envío
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
};

// Función para verificar el estado del formulario
window.checkFormStatus = function() {
    console.log('📊 Estado del formulario:');
    
    const form = document.getElementById('contact-form');
    if (!form) {
        console.error('❌ Formulario no encontrado');
        return;
    }
    
    const fields = {
        name: form.name?.value || 'NO ENCONTRADO',
        email: form.email?.value || 'NO ENCONTRADO',
        subject: form.subject?.value || 'NO ENCONTRADO',
        message: form.message?.value || 'NO ENCONTRADO'
    };
    
    console.table(fields);
    
    return fields;
};
*/
