document.addEventListener('DOMContentLoaded', () => {

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
});
