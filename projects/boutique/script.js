// Vogue Atelier - Boutique Website Script

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
            mobileMenu.classList.remove('active');
        });
    });

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slider .slide');
    const prevBtn = document.querySelector('.hero-nav .prev');
    const nextBtn = document.querySelector('.hero-nav .next');
    const currentSpan = document.querySelector('.slide-counter .current');
    let currentSlide = 0;

    const showSlide = (index) => {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        currentSlide = index;
        if (currentSpan) currentSpan.textContent = String(index + 1).padStart(2, '0');
    };

    prevBtn?.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn?.addEventListener('click', () => showSlide(currentSlide + 1));

    setInterval(() => showSlide(currentSlide + 1), 6000);

    // Product Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            productCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // Wishlist toggle
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.textContent = btn.textContent === '♡' ? '♥' : '♡';
            btn.style.color = btn.textContent === '♥' ? '#c9a86c' : '';
        });
    });

    // Scroll Animations
    const animateOnScroll = document.querySelectorAll('.category-card, .product-card, .lookbook-item, .feature-item, .about-content, .about-images, .testimonial-card');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animateOnScroll.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
        scrollObserver.observe(el);
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

    // Newsletter form
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for subscribing!');
            form.reset();
        });
    });

    console.log('👗 Vogue Atelier loaded!');
});
