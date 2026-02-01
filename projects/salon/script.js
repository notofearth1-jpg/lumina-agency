// Luxe Beauty - Salon Website Script

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('hidden'), 800);
    });

    // Navbar
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    menuToggle?.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.hero-slider-nav .dot');
    let currentSlide = 0;

    const showSlide = (index) => {
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
        currentSlide = index;
    };

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showSlide(i));
    });

    setInterval(() => {
        showSlide((currentSlide + 1) % slides.length);
    }, 5000);

    // Service Tabs
    const serviceTabs = document.querySelectorAll('.service-tab');
    const serviceCategories = document.querySelectorAll('.service-category');

    serviceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            
            serviceTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            serviceCategories.forEach(cat => {
                cat.classList.toggle('active', cat.id === target);
            });
        });
    });

    // Scroll Animations
    const animateOnScroll = document.querySelectorAll('.about-content, .about-images, .service-card, .gallery-item, .team-card, .testimonial-card, .booking-info, .booking-form-wrapper, .contact-info, .contact-map');

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
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your appointment request has been received. We will confirm shortly.');
            form.reset();
        });
    });

    console.log('✿ Luxe Beauty loaded!');
});
