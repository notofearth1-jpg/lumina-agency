const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'page_template.html');
const template = fs.readFileSync(templatePath, 'utf8');

const pages = [
    // Services
    {
        path: 'services/seo.html',
        title: 'SEO Strategy',
        category: 'EXPERTISE / GROWTH',
        intro: 'Dominating search results isn’t magic—it’s engineering. We build technical and content-driven SEO strategies that drive sustainable organic growth.',
        body1: 'Our approach goes beyond keywords. We analyze search intent, site architecture, and performance metrics to build a foundation for long-term visibility.',
        body2: 'From technical audits to authority building, we ensure every aspect of your digital presence is optimized for both search engines and human users.',
        h1: 'Technical SEO Audits',
        h2: 'Content Strategy',
        h3: 'Authority Building'
    },
    {
        path: 'services/branding.html',
        title: 'Brand Identity',
        category: 'EXPERTISE / DESIGN',
        intro: 'A brand is more than a logo. It’s a feeling, a promise, and a memory. We craft visual identities that resonate deeply with your target audience.',
        body1: 'We start by understanding your core values and market position. Then, we translate that essence into a cohesive visual system.',
        body2: 'Our deliverables include comprehensive brand guidelines, typography systems, color palettes, and motion languages that future-proof your identity.',
        h1: 'Visual Identity Systems',
        h2: 'Brand Strategy',
        h3: 'Motion Branding'
    },
    {
        path: 'services/motion.html',
        title: 'Motion Design',
        category: 'EXPERTISE / ANIMATION',
        intro: 'Static is boring. We use motion to guide attention, explain complex concepts, and delight users with every interaction.',
        body1: 'Using tools like WebGL, GSAP, and Three.js, we create fluid animations that feel natural and performant.',
        body2: 'Motion isn’t just decoration; it’s communication. We ensure every transition and micro-interaction serves a clear purpose.',
        h1: 'WebGL Experiences',
        h2: 'UI Animation',
        h3: '3D Interactions'
    },
    {
        path: 'services/ecommerce.html',
        title: 'E-Commerce',
        category: 'EXPERTISE / DEVELOPMENT',
        intro: 'Converting visitors into loyal customers requires a frictionless shopping experience. We build stores that sell.',
        body1: 'We specialize in headless Shopify and custom Next.js commerce solutions that offer unparalleled speed and customization.',
        body2: 'From product discovery to checkout, we optimize every step of the funnel to maximize average order value and conversion rates.',
        h1: 'Headless Shopify',
        h2: 'Conversion Optimization',
        h3: 'Custom Integrations'
    },
    {
        path: 'services/mobile-apps.html',
        title: 'Mobile Apps',
        category: 'EXPERTISE / DEVELOPMENT',
        intro: 'Put your brand in your customer’s pocket. We design and build native and cross-platform mobile applications.',
        body1: 'Using React Native and Flutter, we deliver native-like performance with a single codebase, accelerating time to market.',
        body2: 'We focus on intuitive gestures, offline capabilities, and seamless integration with your existing digital ecosystem.',
        h1: 'React Native Development',
        h2: 'iOS & Android Design',
        h3: 'App Store Optimization'
    },
    {
        path: 'services/analytics.html',
        title: 'Data & Analytics',
        category: 'EXPERTISE / STRATEGY',
        intro: 'Guesswork is expensive. We implement robust analytics tracking to give you actionable insights into user behavior.',
        body1: 'We set up custom tracking events, funnels, and dashboards that reveal exactly how users interact with your product.',
        body2: 'This data drives our continuous optimization process, ensuring your digital product gets better every single day.',
        h1: 'Custom Event Tracking',
        h2: 'User Journey Mapping',
        h3: 'Conversion Funnels'
    },

    // Blog
    {
        path: 'blog/future-of-webgl.html',
        title: 'The Future of WebGL',
        category: 'INSIGHTS / TECH',
        intro: 'Why the web is becoming more immersive than ever, and how WebGL is powering the next generation of digital experiences.',
        body1: 'Browsers are more powerful than ever. With WebGPU on the horizon, the gap between native graphics and web graphics is closing fast.',
        body2: 'We explore how brands can leverage 3D on the web to create memorable, distinct experiences without sacrificing performance.',
        h1: 'Performance Optimization',
        h2: 'WebGPU vs WebGL',
        h3: 'Interactive Storytelling'
    },
    {
        path: 'blog/speed-matters.html',
        title: 'Why Speed Matters',
        category: 'INSIGHTS / PERFORMANCE',
        intro: 'Milliseconds equal millions. A deep dive into Core Web Vitals and why performance is the ultimate competitive advantage.',
        body1: 'Google’s latest updates prioritize page experience more than ever. A slow site doesn’t just annoy users; it disappears from search results.',
        body2: 'We discuss techniques like code splitting, edge caching, and image optimization that keep our client sites lightning fast.',
        h1: 'Core Web Vitals',
        h2: 'Edge Computing',
        h3: 'Resource Prioritization'
    },
    {
        path: 'blog/design-systems.html',
        title: 'Design Systems 101',
        category: 'INSIGHTS / DESIGN',
        intro: 'Scaling consistency. How a robust design system saves time, money, and headaches as your product grows.',
        body1: 'A design system is more than a style guide. It’s a living infrastructure of code and design decisions.',
        body2: 'We break down the atomic design methodology and how we implement it using tools like Figma and Storybook.',
        h1: 'Atomic Design',
        h2: 'Component Libraries',
        h3: 'Documentation'
    },
    {
        path: 'blog/seo-trends-2026.html',
        title: 'SEO Trends 2026',
        category: 'INSIGHTS / STRATEGY',
        intro: 'The search landscape is changing. AI overviews, voice search, and video indexing are redefining visibility.',
        body1: 'Traditional keyword stuffing is dead. Semantic search and user intent are the new kings of ranking.',
        body2: 'We analyze the shift towards "Answer Engine Optimization" and how to prepare your content for the AI era.',
        h1: 'AI Search Overview',
        h2: 'Video SEO',
        h3: 'Semantic Relevance'
    },
    {
        path: 'blog/headless-commerce.html',
        title: 'Headless Commerce',
        category: 'INSIGHTS / TECH',
        intro: 'Decoupling the frontend from the backend. Why modern brands are moving away from monolithic platforms.',
        body1: 'Headless architecture allows for ultimate flexibility. You can change your frontend without touching your backend logic.',
        body2: 'We compare Shopify Hydrogen, Next.js Commerce, and other modern stacks for building high-performance stores.',
        h1: 'API-First Approach',
        h2: 'Omnichannel Experience',
        h3: 'Frontend Freedom'
    },
    {
        path: 'blog/ai-in-design.html',
        title: 'AI in Design',
        category: 'INSIGHTS / FUTURE',
        intro: 'Tool or threat? How artificial intelligence is augmenting our creative process, not replacing it.',
        body1: 'AI helps us iterate faster, explore more concepts, and automate mundane tasks.',
        body2: 'However, the human touch—empathy, strategy, and taste—remains irreplaceable. We explore the balance.',
        h1: 'Generative Prototyping',
        h2: 'Automated Asset Gen',
        h3: 'Human-AI Collaboration'
    },

    // About
    {
        path: 'about/team.html',
        title: 'Our Team',
        category: 'AGENCY / PEOPLE',
        intro: 'A collective of dreamers, doers, and thinkers. We are a diverse team united by a passion for digital excellence.',
        body1: 'Our team comes from all over the world, bringing unique perspectives to every project.',
        body2: 'We believe in a flat hierarchy where the best idea wins, regardless of job title.',
        h1: 'Leadership',
        h2: 'Designers',
        h3: 'Engineers'
    },
    {
        path: 'about/careers.html',
        title: 'Careers',
        category: 'AGENCY / JOIN US',
        intro: 'Build the future with us. We are always looking for exceptional talent to join our Berlin HQ or remote team.',
        body1: 'We offer competitive salaries, equity options, and a culture that values deep work and work-life balance.',
        body2: 'Check out our open positions in design, engineering, and strategy.',
        h1: 'Open Roles',
        h2: 'Benefits',
        h3: 'Remote Culture'
    },
    {
        path: 'about/culture.html',
        title: 'Culture',
        category: 'AGENCY / VALUES',
        intro: 'We value craft, curiosity, and collaboration. Our culture is built on trust and the relentless pursuit of quality.',
        body1: 'We don’t do "crunch time". We believe sustained excellence comes from rested, happy minds.',
        body2: 'Continuous learning is part of the job. We sponsor courses, conferences, and side projects.',
        h1: 'Work-Life Balance',
        h2: 'Continuous Learning',
        h3: 'Radical Transparency'
    },
    {
        path: 'about/awards.html',
        title: 'Awards',
        category: 'AGENCY / RECOGNITION',
        intro: 'Recognition for our commitment to excellence. We are proud to be recognized by industry leaders.',
        body1: 'From Awwwards to The FWA, our work has been featured on the world’s most prestigious design platforms.',
        body2: 'While awards are nice, our clients’ success remains our primary metric.',
        h1: 'Awwwards Site of the Day',
        h2: 'FWA Recognition',
        h3: 'Clutch Top Agency'
    },

    // Legal
    {
        path: 'legal/privacy.html',
        title: 'Privacy Policy',
        category: 'LEGAL',
        intro: 'Your privacy is important to us. This policy outlines how we collect, use, and protect your personal data.',
        body1: 'We only collect data that is necessary for providing our services. We never sell your data to third parties.',
        body2: 'We use industry-standard encryption and security practices to keep your information safe.',
        h1: 'Data Collection',
        h2: 'Data Usage',
        h3: 'Your Rights'
    },
    {
        path: 'legal/terms.html',
        title: 'Terms of Service',
        category: 'LEGAL',
        intro: 'The rules of the road. By using our website and services, you agree to these terms.',
        body1: 'These terms govern your use of our website and any services we provide.',
        body2: 'We reserve the right to modify these terms at any time. Continued use constitutes acceptance.',
        h1: 'Usage Rights',
        h2: 'Liability',
        h3: 'Termination'
    },
    {
        path: 'legal/cookies.html',
        title: 'Cookie Policy',
        category: 'LEGAL',
        intro: 'How we use cookies to improve your experience. We believe in transparency.',
        body1: 'Cookies help us understand how you use our site so we can make it better.',
        body2: 'You have full control over your cookie preferences settings.',
        h1: 'Essential Cookies',
        h2: 'Analytics Cookies',
        h3: 'Managing Preferences'
    },
    {
        path: 'legal/impressum.html',
        title: 'Impressum',
        category: 'LEGAL',
        intro: 'Legal information required by German law (TMG).',
        body1: 'Lumia Digital GmbH\nTorstr. 1\n10119 Berlin\nGermany',
        body2: 'Managing Director: Vibhu Thanki\nVAT ID: DE 123 456 789\nEmail: hello@lumiadigital.site',
        h1: 'Company Info',
        h2: 'Contact',
        h3: 'Dispute Resolution'
    }
];

pages.forEach(page => {
    let content = template
        .replace(/TITLE_PLACEHOLDER/g, page.title)
        .replace(/CATEGORY_PLACEHOLDER/g, page.category)
        .replace(/CONTENT_INTRO_PLACEHOLDER/g, page.intro)
        .replace(/CONTENT_BODY_1/g, page.body1)
        .replace(/CONTENT_BODY_2/g, page.body2)
        .replace(/HIGHLIGHT_1/g, page.h1)
        .replace(/HIGHLIGHT_2/g, page.h2)
        .replace(/HIGHLIGHT_3/g, page.h3);
    
    fs.writeFileSync(path.join(__dirname, page.path), content);
    console.log(`Created ${page.path}`);
});
