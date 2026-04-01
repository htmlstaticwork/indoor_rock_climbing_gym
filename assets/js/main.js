/**
 * Summit Ascent - Main JS
 * Features: Dark Mode, Preloader, RTL Toggle, Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader Initialization
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 800); // 800ms loading effect
        });
    }

    // 2. Dark Mode Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (themeToggle) {
        themeToggle.checked = currentTheme === 'dark';
        
        themeToggle.addEventListener('change', (e) => {
            const theme = e.target.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    }

    // 3. RTL Support Detection
    // For demonstration, let's look for a dir-toggle button if it exists
    const rtlToggle = document.getElementById('rtl-toggle');
    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        });
    }
    
    // 4. Form Validation (Bootstrap Style)
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // 5. Sticky Navbar Shadow on Scroll
    const navbar = document.querySelector('.navbar-sticky');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
            navbar.style.backgroundColor = 'rgba(var(--bg-light-rgb), 0.95)';
        } else {
            navbar.classList.remove('shadow-sm');
            navbar.style.backgroundColor = 'rgba(var(--bg-light-rgb), 0.85)';
        }
    });

    // 6. Active Link Highlighter
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});

/**
 * Helper function for skeleton loaders
 * @param {string} containerId 
 */
function showSkeleton(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="skeleton-box" style="height: 200px; width: 100%; margin-bottom: 10px;"></div>
            <div class="skeleton-box" style="height: 24px; width: 80%; margin-bottom: 5px;"></div>
            <div class="skeleton-box" style="height: 16px; width: 40%;"></div>
        `;
    }
}
