document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not loaded. Flowing menu effect will not work.');
        return;
    }

    const menuItems = document.querySelectorAll('.menu__item');

    const animationDefaults = { duration: 0.6, ease: 'expo.out' };
    const marqueeSpeed = 15; // Duration in seconds for one loop

    // Function to calculate distance metric
    const distMetric = (x, y, x2, y2) => {
        const xDiff = x - x2;
        const yDiff = y - y2;
        return xDiff * xDiff + yDiff * yDiff;
    };

    // Function to find closest edge (top or bottom)
    const findClosestEdge = (mouseX, mouseY, width, height) => {
        const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
        const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
        return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
    };

    menuItems.forEach(item => {
        const link = item.querySelector('.menu__item-link');
        const text = link.textContent.trim();
        const image = link.getAttribute('data-image');

        if (!text || !image) return;

        // generated marquee structure
        const marquee = document.createElement('div');
        marquee.className = 'marquee';
        marquee.innerHTML = `
            <div class="marquee__inner-wrap">
                <div class="marquee__inner" aria-hidden="true">
                    <!-- Parts injected later -->
                </div>
            </div>
        `;
        item.appendChild(marquee);

        const marqueeInner = marquee.querySelector('.marquee__inner');

        // Calculate repetitions ensuring enough width to cover screen + buffer
        // Approx width of one part? We can't know until rendered.
        // Let's create one part, measure, then clone.

        const createPart = () => {
            const part = document.createElement('div');
            part.className = 'marquee__part';
            part.innerHTML = `
                <span>${text}</span>
                <div class="marquee__img" style="background-image: url('${image}')"></div>
            `;
            return part;
        };

        // Append initial parts to fill likely viewport
        // Just adding a safe number for now (e.g., 6) or measuring.
        // React code calculates exact needs.
        // Lets add 4 initially, measure, then add more if needed?

        let repetitions = 6;
        for (let i = 0; i < repetitions; i++) {
            marqueeInner.appendChild(createPart());
        }

        // Marquee Animation using GSAP
        // We need the width of ONE part to animate 'x' by that amount.
        // Wait for load/render?

        let marqueeAnim;

        const setupMarquee = () => {
            if (marqueeAnim) marqueeAnim.kill();

            const part = marqueeInner.querySelector('.marquee__part');
            if (part) {
                const contentWidth = part.offsetWidth;

                // If content is very small, we might need more repetitions?
                // For now assuming 6 is enough.

                // Animate x from 0 to -contentWidth (smooth infinite loop)
                // Actually, if we use repeat: -1, ease: 'none'

                marqueeAnim = gsap.to(marqueeInner, {
                    x: -contentWidth,
                    duration: marqueeSpeed,
                    ease: 'none',
                    repeat: -1
                });
            }
        };

        // Setup after a brief delay to ensure layout
        setTimeout(setupMarquee, 100);
        window.addEventListener('resize', () => setTimeout(setupMarquee, 100));

        // Hover Interactions
        link.addEventListener('mouseenter', (ev) => {
            const rect = item.getBoundingClientRect();
            const x = ev.clientX - rect.left;
            const y = ev.clientY - rect.top;
            const edge = findClosestEdge(x, y, rect.width, rect.height);

            // GSAP Timeline
            const tl = gsap.timeline({ defaults: animationDefaults });

            const initialY = edge === 'top' ? '-101%' : '101%';
            const innerInitialY = edge === 'top' ? '101%' : '-101%';

            tl.set(marquee, { y: initialY }, 0)
                .set(marqueeInner, { y: innerInitialY }, 0) // Parallax/Reveal effect compensation
                // Wait, the "inner" ref in React code: "marqueeInnerRef". 
                // React: marqueeRef (y: -101%), marqueeInnerRef (y: 101%) -> to (0%).
                // This creates a sliding reveal where the content inside slides opposite to container?
                // Yes, standard reveal effect.
                // Note: My HTML structure is marquee > inner-wrap > inner.
                // React: marquee > inner-wrap > inner.
                // The animation targets [marqueeRef, marqueeInnerRef]. 
                // "marqueeInnerRef" is likely the `marquee__inner` div? Or `marquee__inner-wrap`?
                // React code: <div className="marquee__inner-wrap"><div className="marquee__inner" ref={marqueeInnerRef}>
                // Yes it targets the scrolling container.

                .to([marquee, marqueeInner], { y: '0%' }, 0);
        });

        link.addEventListener('mouseleave', (ev) => {
            const rect = item.getBoundingClientRect();
            const x = ev.clientX - rect.left;
            const y = ev.clientY - rect.top;
            const edge = findClosestEdge(x, y, rect.width, rect.height);

            const targetY = edge === 'top' ? '-101%' : '101%';
            const innerTargetY = edge === 'top' ? '101%' : '-101%';

            const tl = gsap.timeline({ defaults: animationDefaults });

            tl.to(marquee, { y: targetY }, 0)
                .to(marqueeInner, { y: innerTargetY }, 0);
        });

    });
});
