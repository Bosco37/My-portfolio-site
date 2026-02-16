'use strict';

if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50
    });
}

const themeToggle = document.getElementById('theme-toggle');

function setTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    setTheme('light');
} else {
    setTheme('dark');
}

if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('light-mode')) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
        this.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.style.transform = 'rotate(0)';
        }, 300);
    });
}

const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        
        const icon = this.querySelector('i');
        if (icon) {
            if (sidebar.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0)';
            }
        }
    });
}

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

function switchPage(pageName) {
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const activePage = document.querySelector(`[data-page="${pageName}"]`);
    if (activePage) {
        activePage.classList.add('active');
    }
    
    navigationLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-nav-link') === pageName) {
            link.classList.add('active');
        }
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

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

const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    const titles = [
        'CSE Student @ LPU',
        'Time Management Enthusiast',
        'Problem Solver',
        'Tech Explorer'
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

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn ? submitBtn.innerHTML : '';
        
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
        }
        
        setTimeout(() => {
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '✅ Message sent successfully!';
            successMessage.style.cssText = `
                background: rgba(52, 211, 153, 0.1);
                color: #34d399;
                padding: 12px;
                border-radius: 8px;
                margin-bottom: 15px;
                text-align: center;
                border: 1px solid #34d399;
            `;
            
            this.insertBefore(successMessage, this.firstChild);
            
            this.reset();
            
            if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }, 1500);
    });
}

const projectLinks = document.querySelectorAll('.project-link');
projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            
            const toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.innerHTML = '🔗 GitHub repository coming soon!';
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #a78bfa;
                color: #000;
                padding: 12px 24px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(167, 139, 250, 0.3);
                z-index: 1000;
                animation: slideIn 0.3s ease;
                font-weight: 600;
            `;
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 3000);
        }
    });
});

const certificateLinks = document.querySelectorAll('.cert-card-link, .cert-compact-item');
certificateLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            
            const toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.innerHTML = '🔗 Certificate link will be added soon!';
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #a78bfa;
                color: #000;
                padding: 12px 24px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(167, 139, 250, 0.3);
                z-index: 1000;
                animation: slideIn 0.3s ease;
                font-weight: 600;
            `;
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 3000);
        }
    });
});

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

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
