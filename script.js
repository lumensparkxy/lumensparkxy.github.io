// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initTypingEffect();
    initProjectCards();
    initContactForm();
    initThemeToggle();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Update active nav link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(
        '.hero-content, .about-content, .project-card, .skill-category, .contact-item'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat h3');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Counter animation
function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/\d/g, '');
    let current = 0;
    const increment = number / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = number + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 50);
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalHTML = heroTitle.innerHTML;
        
        // Extract text content and HTML structure
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalHTML;
        const textContent = tempDiv.textContent || tempDiv.innerText || '';
        
        // Clear the title and start typing
        heroTitle.innerHTML = '';
        
        setTimeout(() => {
            typeTextWithHTML(heroTitle, originalHTML, textContent, 0);
        }, 500);
    }
}

function typeTextWithHTML(element, originalHTML, textContent, index) {
    if (index < textContent.length) {
        // Get the current character from text content
        const currentChar = textContent.charAt(index);
        
        // Build the HTML progressively, but only show characters up to current index
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalHTML;
        
        // Find all text nodes and their positions
        const walker = document.createTreeWalker(
            tempDiv,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let textIndex = 0;
        let node;
        
        // Traverse text nodes and truncate content based on current typing position
        while (node = walker.nextNode()) {
            const nodeLength = node.textContent.length;
            if (textIndex + nodeLength <= index + 1) {
                // Keep this text node as is
                textIndex += nodeLength;
            } else {
                // Truncate this text node
                const keepLength = (index + 1) - textIndex;
                node.textContent = node.textContent.substring(0, keepLength);
                
                // Remove all subsequent text nodes
                let nextNode;
                while (nextNode = walker.nextNode()) {
                    nextNode.textContent = '';
                }
                break;
            }
        }
        
        element.innerHTML = tempDiv.innerHTML;
        setTimeout(() => typeTextWithHTML(element, originalHTML, textContent, index + 1), 50);
    }
}

// Project cards interactions
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click handlers for project links
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your project link logic here
            console.log('Project link clicked:', this.textContent);
        });
    });
}

// Generate WhatsApp number dynamically to hide from crawlers
function generateWhatsAppNumber() {
    // Obfuscated number generation - scrambled and encoded to avoid direct visibility
    const encoded = [
        String.fromCharCode(43), // +
        String.fromCharCode(57, 49), // 91
        String.fromCharCode(32), // space
        String.fromCharCode(57, 52, 48, 51, 53), // 94035
        String.fromCharCode(32), // space  
        String.fromCharCode(49, 51, 51, 56, 50) // 13382
    ];
    return encoded.join('');
}

// Contact form functionality (placeholder)
function initContactForm() {
    // Set WhatsApp number dynamically
    const whatsappElement = document.querySelector('.whatsapp-contact p');
    if (whatsappElement) {
        whatsappElement.textContent = generateWhatsAppNumber();
    }
    
    // Add event listeners for contact interactions
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('p').textContent;
            const heading = this.querySelector('h4').textContent;
            
            if (text.includes('@')) {
                // Email functionality
                window.location.href = `mailto:${text}`;
            } else if (this.classList.contains('whatsapp-contact')) {
                // WhatsApp functionality
                const phoneNumber = text.replace(/\s+/g, ''); // Remove spaces
                const message = encodeURIComponent('Hello! I am interested in enquiring about your premium organic pulses and lentils. Could you please provide more information about your products and pricing?');
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                window.open(whatsappUrl, '_blank');
            } else if (heading.toLowerCase().includes('location')) {
                // Location functionality - open Google Maps
                const encodedLocation = encodeURIComponent(text);
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
                window.open(googleMapsUrl, '_blank');
            }
        });
    });

    // Social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your social media links here
            console.log('Social link clicked:', this.getAttribute('aria-label'));
        });
    });
}

// Theme toggle (optional dark mode)
function initThemeToggle() {
    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Add theme toggle button if needed
    // This is a placeholder for future dark mode implementation
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Parallax effect for hero section
window.addEventListener('scroll', debounce(() => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage) {
        const speed = scrolled * 0.5;
        heroContent.style.transform = `translateY(${speed}px)`;
        heroImage.style.transform = `translateY(${speed * 0.3}px)`;
    }
}, 10));

// Skill items hover effect
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Loading screen (optional)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    });
}