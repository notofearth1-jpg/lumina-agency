document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // INTRO ANIMATION (First Visit Only)
    // ========================================
    const introOverlay = document.getElementById('introOverlay');
    const introFlame = document.getElementById('introFlame');
    const introLetters = document.querySelectorAll('.intro-letter');
    const introDot = document.querySelector('.intro-dot');

    // Check if user has already seen the intro animation
    const hasSeenIntro = localStorage.getItem('lumiaIntroSeen');

    if (introOverlay && hasSeenIntro) {
        // User has already seen the intro - hide immediately without animation
        introOverlay.remove();
    } else if (introOverlay && introFlame && typeof lottie !== 'undefined' && typeof blueFireAnimationData !== 'undefined') {
        // First visit - play the full intro animation
        lottie.loadAnimation({
            container: introFlame,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: blueFireAnimationData
        });

        // Animation sequence timing
        // 0s - Flame appears centered
        // 1.2s - Flame slides left (CSS animation)
        // 1.5s - Letters start appearing one by one
        // ~3s - All letters visible
        // 3.5s - Overlay fades out

        setTimeout(() => {
            // Animate letters one by one
            introLetters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.classList.add('animate');
                }, index * 40); // 40ms stagger between letters
            });

            // Animate the dot after all letters
            setTimeout(() => {
                if (introDot) introDot.classList.add('animate');
            }, introLetters.length * 40 + 100);

            // Fade out overlay and reveal website
            setTimeout(() => {
                introOverlay.classList.add('hidden');
                // Mark intro as seen in localStorage
                localStorage.setItem('lumiaIntroSeen', 'true');
                // Remove overlay from DOM after animation
                setTimeout(() => {
                    introOverlay.remove();
                }, 800);
            }, introLetters.length * 40 + 500);

        }, 600); // Start letter animation after flame slides left (0.6s)
    } else if (introOverlay) {
        // If Lottie not available, just hide overlay
        introOverlay.classList.add('hidden');
        localStorage.setItem('lumiaIntroSeen', 'true');
    }


    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Nav Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Logo Flame Effect - Lottie Animation + Page Dim
    const logo = document.querySelector('.logo');
    const flameContainer = document.getElementById('logoFlame');

    if (logo) {
        // Create dim overlay if it doesn't exist
        let dimOverlay = document.querySelector('.page-dim-overlay');
        if (!dimOverlay) {
            dimOverlay = document.createElement('div');
            dimOverlay.className = 'page-dim-overlay';
            document.body.appendChild(dimOverlay);
        }

        // Initialize Lottie animation - always playing
        if (flameContainer && typeof lottie !== 'undefined' && typeof blueFireAnimationData !== 'undefined') {
            lottie.loadAnimation({
                container: flameContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: blueFireAnimationData
            });
        }

        // Hover: just toggle dim overlay (animation always plays)
        logo.addEventListener('mouseenter', () => {
            dimOverlay.classList.add('active');
        });

        logo.addEventListener('mouseleave', () => {
            dimOverlay.classList.remove('active');
        });
    }

    // Expanding Project Cards (Scroll Intersection)
    const observerOptions = {
        threshold: 0.5, // Trigger when 50% visible
        rootMargin: "-10% 0px -10% 0px" // Focus area in center of screen
    };

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add 'active-scroll' class when in center view
            if (entry.isIntersecting) {
                entry.target.classList.add('active-scroll');
            } else {
                entry.target.classList.remove('active-scroll');
            }
        });
    }, observerOptions);

    const projectRows = document.querySelectorAll('.project-row');
    projectRows.forEach(row => {
        projectObserver.observe(row);
    });

    // Custom Mouse Glow (Performance Optimized)
    const orb = document.querySelector('.glow-orb');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateOrb() {
        // Smooth easing
        const ease = 0.1;
        currentX += (mouseX - currentX) * ease;
        currentY += (mouseY - currentY) * ease;

        if (orb) {
            orb.style.transform = `translate(${currentX - 300}px, ${currentY - 300}px)`;
        }
        requestAnimationFrame(animateOrb);
    }

    // Start animation loop
    animateOrb();

    // Spotlight Text Effect
    const highlightText = document.querySelector('.highlight');
    if (highlightText) {
        document.addEventListener('mousemove', (e) => {
            const rect = highlightText.getBoundingClientRect();
            // Calculate mouse position relative to the element
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            highlightText.style.setProperty('--x', `${x}px`);
            highlightText.style.setProperty('--y', `${y}px`);
        });
    }

    // ========================================
    // 3D TECH ORB MOUSE INTERACTION
    // ========================================
    const techOrbs = document.querySelectorAll('.tech-orb');

    techOrbs.forEach(orb => {
        const orbInner = orb.querySelector('.orb-inner');

        orb.addEventListener('mousemove', (e) => {
            const rect = orb.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Calculate rotation based on mouse position
            const rotateX = (y / rect.height) * -30;
            const rotateY = (x / rect.width) * 30;

            orbInner.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        orb.addEventListener('mouseleave', () => {
            orbInner.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });
});
