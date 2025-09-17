// Global data object
let siteData = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load data first, then initialize
    loadSiteData().then(() => {
        populateContent();
        initNavigation();
        initScrollAnimations();
        initSmoothScrolling();
        initTypingEffect();
        initProjectCards();
        initContactForm();
        initThemeToggle();
    }).catch(error => {
        console.error('Failed to load site data:', error);
        // Continue with existing functionality even if data loading fails
        initNavigation();
        initScrollAnimations();
        initSmoothScrolling();
        initTypingEffect();
        initProjectCards();
        initContactForm();
        initThemeToggle();
    });
});

// Load site data from JSON file
async function loadSiteData() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        siteData = await response.json();
        console.log('Site data loaded successfully');
    } catch (error) {
        console.error('Error loading site data:', error);
        throw error;
    }
}

// Populate content from JSON data
function populateContent() {
    if (!siteData) {
        console.error('Site data not available');
        return;
    }

    try {
        populateMetadata();
        populateNavigation();
        populateHero();
        populateAbout();
        populateProducts();
        populateQuality();
        populateContact();
        populateFooter();
        console.log('Content populated successfully');
    } catch (error) {
        console.error('Error populating content:', error);
    }
}

// Populate page metadata
function populateMetadata() {
    if (siteData.site) {
        document.title = siteData.site.title;
        
        // Update meta tags
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) metaDescription.content = siteData.site.description;
        
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) metaKeywords.content = siteData.site.keywords;
        
        const metaAuthor = document.querySelector('meta[name="author"]');
        if (metaAuthor) metaAuthor.content = siteData.site.author;
        
        // Update company name in navigation
        const navLogo = document.querySelector('.nav-logo a');
        if (navLogo) navLogo.textContent = siteData.site.companyName;
    }
}

// Populate navigation
function populateNavigation() {
    if (siteData.navigation) {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.innerHTML = '';
            siteData.navigation.forEach(item => {
                const li = document.createElement('li');
                li.className = 'nav-item';
                li.innerHTML = `<a href="${item.href}" class="nav-link">${item.text}</a>`;
                navMenu.appendChild(li);
            });
        }
    }
}

// Populate hero section
function populateHero() {
    if (siteData.hero) {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) heroTitle.innerHTML = siteData.hero.title;
        
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) heroSubtitle.textContent = siteData.hero.subtitle;
        
        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription) heroDescription.textContent = siteData.hero.description;
        
        const heroButtons = document.querySelector('.hero-buttons');
        if (heroButtons && siteData.hero.buttons) {
            heroButtons.innerHTML = '';
            siteData.hero.buttons.forEach(button => {
                const a = document.createElement('a');
                a.href = button.href;
                a.className = button.class;
                a.textContent = button.text;
                heroButtons.appendChild(a);
            });
        }
    }
}

// Populate about section
function populateAbout() {
    if (siteData.about) {
        const aboutTitle = document.querySelector('#about .section-title');
        if (aboutTitle) aboutTitle.textContent = siteData.about.title;
        
        const aboutText = document.querySelector('.about-text');
        if (aboutText && siteData.about.paragraphs) {
            // Clear existing content but keep the stats section
            const statsSection = aboutText.querySelector('.about-stats');
            aboutText.innerHTML = '';
            
            // Add paragraphs
            siteData.about.paragraphs.forEach(paragraph => {
                const p = document.createElement('p');
                p.textContent = paragraph;
                aboutText.appendChild(p);
            });
            
            // Re-add stats section
            if (statsSection) {
                aboutText.appendChild(statsSection);
                
                // Update stats content
                if (siteData.about.stats) {
                    const statElements = statsSection.querySelectorAll('.stat');
                    siteData.about.stats.forEach((stat, index) => {
                        if (statElements[index]) {
                            const h3 = statElements[index].querySelector('h3');
                            const p = statElements[index].querySelector('p');
                            if (h3) h3.textContent = stat.number;
                            if (p) p.textContent = stat.label;
                        }
                    });
                }
            }
        }
    }
}

// Populate products section
function populateProducts() {
    if (siteData.products) {
        const productsTitle = document.querySelector('#products .section-title');
        if (productsTitle) productsTitle.textContent = siteData.products.title;
        
        const productsDescription = document.querySelector('#products .section-description');
        if (productsDescription) productsDescription.textContent = siteData.products.description;
        
        const productsGrid = document.querySelector('.projects-grid');
        if (productsGrid && siteData.products.items) {
            productsGrid.innerHTML = '';
            
            siteData.products.items.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'project-card';
                productCard.innerHTML = `
                    <div class="project-image">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                    </div>
                    <div class="project-content">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="project-tech">
                            ${product.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                        </div>
                        <div class="project-links">
                            <a href="#contact" class="project-link"><i class="fas fa-shopping-cart"></i> Order Now</a>
                            <a href="#" class="project-link"><i class="fas fa-info-circle"></i> Nutrition Facts</a>
                        </div>
                    </div>
                `;
                productsGrid.appendChild(productCard);
            });
        }
    }
}

// Populate quality section
function populateQuality() {
    if (siteData.quality) {
        const qualityTitle = document.querySelector('#quality .section-title');
        if (qualityTitle) qualityTitle.textContent = siteData.quality.title;
        
        const skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid && siteData.quality.categories) {
            skillsGrid.innerHTML = '';
            
            siteData.quality.categories.forEach(category => {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'skill-category';
                categoryDiv.innerHTML = `
                    <h3><i class="${category.icon}"></i> ${category.title}</h3>
                    <div class="skill-list">
                        ${category.items.map(item => `<span class="skill-item">${item}</span>`).join('')}
                    </div>
                `;
                skillsGrid.appendChild(categoryDiv);
            });
        }
    }
}

// Populate contact section
function populateContact() {
    if (siteData.contact) {
        const contactTitle = document.querySelector('#contact .section-title');
        if (contactTitle) contactTitle.textContent = siteData.contact.title;
        
        const contactDescription = document.querySelector('#contact .section-description');
        if (contactDescription) contactDescription.textContent = siteData.contact.description;
        
        const contactInfo = document.querySelector('.contact-info');
        if (contactInfo && siteData.contact.info) {
            contactInfo.innerHTML = '';
            
            siteData.contact.info.forEach(info => {
                const contactItem = document.createElement('div');
                contactItem.className = 'contact-item';
                if (info.type === 'whatsapp') {
                    contactItem.classList.add('whatsapp-contact');
                }
                
                contactItem.innerHTML = `
                    <i class="${info.icon}"></i>
                    <div>
                        <h4>${info.title}</h4>
                        <p>${info.value}</p>
                    </div>
                `;
                contactInfo.appendChild(contactItem);
            });
        }
        
        // Find and update social links
        const socialLinks = document.querySelector('.social-links');
        if (socialLinks && siteData.contact.socialLinks) {
            socialLinks.innerHTML = '';
            
            siteData.contact.socialLinks.forEach(link => {
                const a = document.createElement('a');
                a.href = link.href;
                a.className = 'social-link';
                a.setAttribute('aria-label', link.label);
                a.innerHTML = `<i class="${link.icon}"></i>`;
                socialLinks.appendChild(a);
            });
        }
    }
}

// Populate footer section
function populateFooter() {
    if (siteData.footer) {
        const footerContent = document.querySelector('.footer-content');
        if (footerContent) {
            footerContent.innerHTML = `
                <p>${siteData.footer.copyright}</p>
                <p>${siteData.footer.tagline}</p>
            `;
        }
    }
}

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