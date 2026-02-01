// Bright Minds Academy - Coaching Website Script

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('hidden'), 800);
    });

    // Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuToggle?.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Counter Animation
    const counters = document.querySelectorAll('.stat-number[data-count]');
    let countersAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const update = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target.toLocaleString() + (target > 100 ? '+' : '%');
                }
            };
            update();
        });
    };

    const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !countersAnimated) {
            countersAnimated = true;
            animateCounters();
        }
    }, { threshold: 0.3 });

    const hero = document.querySelector('.hero');
    if (hero) heroObserver.observe(hero);

    // Scroll Animations
    const animateOnScroll = document.querySelectorAll('.about-content, .about-images, .course-card, .faculty-card, .testimonial-card, .result-stat, .topper-card, .contact-card, .cta-content, .cta-form-wrapper');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animateOnScroll.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
        scrollObserver.observe(el);
    });

    // Active nav on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 200;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Back to Top
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        backToTop?.classList.toggle('visible', window.scrollY > 500);
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form handling
    const enrollForm = document.getElementById('enrollForm');
    if (enrollForm) {
        enrollForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your interest! Our counselor will call you within 24 hours to schedule your free demo class.');
            enrollForm.reset();
        });
    }

    console.log('🎓 Bright Minds Academy loaded!');
});
