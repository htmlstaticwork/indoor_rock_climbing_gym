/**
 * Summit Ascent — Home Page JS
 * Features: Animated counters, back-to-top, scroll-reveal, newsletter UX
 */

document.addEventListener('DOMContentLoaded', () => {

    // ================================================
    // 1. ANIMATED STAT COUNTERS (on scroll into view)
    // ================================================
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const formatNumber = (n) => {
        if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
        return n.toString();
    };

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = formatNumber(current) + suffix;
            if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    // ================================================
    // 2. SCROLL-REVEAL ANIMATION
    // ================================================
    const revealEls = document.querySelectorAll(
        '.feature-card, .discipline-card, .coach-card, .testimonial-card, .price-card, .stat-item'
    );

    revealEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger delay based on element index within parent
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                const delay = index * 80;

                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);

                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach(el => revealObserver.observe(el));

    // ================================================
    // 3. BACK TO TOP BUTTON
    // ================================================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ================================================
    // 4. TESTIMONIALS CAROUSEL — auto-play
    // ================================================
    const testimonialsEl = document.getElementById('testimonialsCarousel');
    if (testimonialsEl && window.bootstrap) {
        const carousel = new bootstrap.Carousel(testimonialsEl, {
            interval: 6000,
            ride: 'carousel',
            wrap: true
        });
    }

    // ================================================
    // 5. NEWSLETTER FORM — UX feedback
    // ================================================
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input[type="email"]');
            const btn = newsletterForm.querySelector('button[type="submit"]');
            const originalIcon = btn.innerHTML;

            // Success state
            btn.innerHTML = '<i class="bi bi-check2"></i>';
            btn.style.background = '#22c55e';
            input.value = '';
            input.placeholder = 'You\'re subscribed! ✓';

            setTimeout(() => {
                btn.innerHTML = originalIcon;
                btn.style.background = '';
                input.placeholder = 'Your Email';
            }, 3000);
        });
    }

    // ================================================
    // 6. HERO SECTION — Parallax subtle scroll
    // ================================================
    const heroBg = document.querySelector('.hero-bg-img');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroHeight = document.querySelector('.hero-section')?.offsetHeight || 0;
            if (scrolled < heroHeight) {
                heroBg.style.transform = `scale(1) translateY(${scrolled * 0.3}px)`;
            }
        }, { passive: true });
    }

    // ================================================
    // 7. PRICING — Annual/Monthly Toggle (if added later)
    // ================================================
    // Placeholder for future billing toggle

    // ================================================
    // 8. NAVBAR — Highlight active section on scroll
    // ================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    const activeNavObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => activeNavObserver.observe(s));

});
