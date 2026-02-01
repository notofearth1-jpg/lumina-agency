// ==========================================
// SPICE GARDEN - Restaurant Website Script
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // PRELOADER
    // ==========================================
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1000);
    });

    // ==========================================
    // CUSTOM CURSOR
    // ==========================================
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 50);
        });

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .menu-item, .gallery-item, .specialty-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                cursorFollower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursorFollower.classList.remove('active');
            });
        });
    }

    // ==========================================
    // NAVBAR
    // ==========================================
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ==========================================
    // COUNTER ANIMATION
    // ==========================================
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString() + '+';
                }
            };

            updateCounter();
        });
    };

    // Trigger counter animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // ==========================================
    // MENU TABS
    // ==========================================
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetCategory = tab.dataset.tab;

            // Update active tab
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show target category
            menuCategories.forEach(category => {
                category.classList.remove('active');
                if (category.id === targetCategory) {
                    category.classList.add('active');
                }
            });
        });
    });

    // ==========================================
    // TESTIMONIALS SLIDER
    // ==========================================
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalSlides = testimonialCards.length;

    const updateSlider = () => {
        if (testimonialTrack) {
            testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    };

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    // Auto-slide
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000);

    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
    const animatedElements = document.querySelectorAll('.about-content, .about-images, .specialty-card, .menu-item, .gallery-item, .testimonial-card, .reservation-info, .reservation-form-wrapper, .contact-info, .contact-map');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });

    // Staggered animation for grid items
    const staggerElements = document.querySelectorAll('.specialty-card, .menu-item, .gallery-item');
    staggerElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    // ==========================================
    // BACK TO TOP
    // ==========================================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // FORM HANDLING
    // ==========================================
    const reservationForm = document.getElementById('reservationForm');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(reservationForm);
            const data = Object.fromEntries(formData);
            
            // Show success message (in real app, this would send to server)
            alert('Thank you for your reservation! We will confirm shortly via phone.');
            reservationForm.reset();
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            alert(`Thank you for subscribing with ${email}!`);
            newsletterForm.reset();
        });
    }

    // ==========================================
    // PARALLAX EFFECTS
    // ==========================================
    const heroVideo = document.querySelector('.hero-video');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        if (heroVideo && scrolled < window.innerHeight) {
            heroVideo.style.transform = `scale(${1 + scrolled * 0.0002})`;
        }
    });

    // ==========================================
    // SMOOTH SCROLL
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // LAZY LOADING IMAGES
    // ==========================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ==========================================
    // GALLERY LIGHTBOX (Simple version)
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const overlay = document.createElement('div');
            overlay.className = 'lightbox-overlay';
            overlay.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="lightbox-close">&times;</button>
                </div>
            `;
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            `;
            
            const lightboxImg = overlay.querySelector('img');
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 10px;
            `;
            
            const closeBtn = overlay.querySelector('.lightbox-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 30px;
                font-size: 3rem;
                color: white;
                background: none;
                border: none;
                cursor: pointer;
            `;
            
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';
            
            const closeLightbox = () => {
                overlay.remove();
                document.body.style.overflow = '';
            };
            
            closeBtn.addEventListener('click', closeLightbox);
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeLightbox();
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeLightbox();
            });
        });
    });

    console.log('🌿 Spice Garden website loaded successfully!');
});
