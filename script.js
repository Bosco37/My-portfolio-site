'use strict';

//===================================
// THEME TOGGLE
//===================================
const themeToggle = document.getElementById('theme-toggle');

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    setTheme('dark');
}

if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
        this.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.style.transform = 'rotate(0)';
        }, 300);
    });
}

//===================================
// SIDEBAR TOGGLE
//===================================
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
}

//===================================
// PAGE NAVIGATION - FIXED
//===================================
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

function switchPage(pageName) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const activePage = document.querySelector(`[data-page="${pageName}"]`);
    if (activePage) {
        activePage.classList.add('active');
    }
    
    // Update active state on nav buttons
    navigationLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-nav-link') === pageName) {
            link.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add click event to all nav buttons
if (navigationLinks.length > 0) {
    navigationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageName = this.getAttribute('data-nav-link');
            if (pageName) {
                switchPage(pageName);
            }
        });
    });
}

// Set About page as active by default
document.addEventListener('DOMContentLoaded', function() {
    const aboutPage = document.querySelector('[data-page="about"]');
    if (aboutPage) {
        aboutPage.classList.add('active');
    }
    
    navigationLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-nav-link') === 'about') {
            link.classList.add('active');
        }
    });
});

//===================================
// TYPING ANIMATION
//===================================
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    const titles = [
        'CSE Student @ LPU',
        'C++ Developer',
        'Flask Enthusiast',
        'Problem Solver'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }
    
    setTimeout(typeEffect, 1000);
}

//===================================
// CONTACT FORM
//===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('✅ Message sent successfully! I will get back to you soon.');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

//===================================
// PROJECT LINK HANDLING
//===================================
const projectLinks = document.querySelectorAll('.project-link');
projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            alert('🔗 GitHub repository coming soon!');
        }
    });
});

//===================================
// AOS INITIALIZATION
//===================================
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50
    });
}

//===================================
// MOBILE SIDEBAR
//===================================
if (navigationLinks.length > 0 && sidebar) {
    navigationLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 1024) {
                sidebar.classList.remove('active');
            }
        });
    });
}

window.addEventListener('resize', function() {
    if (window.innerWidth >= 1024 && sidebar) {
        sidebar.classList.remove('active');
    }
});