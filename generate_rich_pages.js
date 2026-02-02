const fs = require('fs');
const path = require('path');

// --- Templates ---
const blogTemplate = fs.readFileSync(path.join(__dirname, 'blog_template.html'), 'utf8');
const serviceTemplate = fs.readFileSync(path.join(__dirname, 'service_template.html'), 'utf8');
const legalTemplate = fs.readFileSync(path.join(__dirname, 'page_template.html'), 'utf8'); // Re-use simple one

// --- Blog Data (10 Posts) ---
const blogs = [
    {
        slug: 'rise-of-generative-ui',
        title: 'The Rise of Generative UI',
        desc: 'How AI is building interfaces on the fly and what it means for designers.',
        category: 'AI / DESIGN',
        readTime: '5 MIN READ',
        author: 'Alex Morgan',
        date: 'Oct 12, 2025',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
        content: `
            <h2>Interfaces That Adapt to You</h2>
            <p>Imagine a website that doesn't just look the same for everyone, but reconstructs itself based on your intent. Generative UI is shifting the paradigm from static layouts to fluid, intent-based components.</p>
            <p>By leveraging LLMs, we can now generate UI components on the fly. A dashboard for a CFO might prioritize high-level charts, while the same dashboard for an engineer focuses on logs and uptime.</p>
            <h2>The Role of the Designer</h2>
            <p>Does this mean the end of design? Far from it. Designers are moving from "painters" to "gardeners". We define the constraints, the design system tokens, and the rules of engagement.</p>
            <ul>
                <li><strong>Dynamic Components:</strong> UI elements that spawn based on context.</li>
                <li><strong>Personalized Flows:</strong> User journeys that shorten based on historical data.</li>
                <li><strong>Accessibility:</strong> Interfaces that auto-adjust contrast and size for user needs.</li>
            </ul>
            <p>The future isn't about pixel perfection; it's about system perfection.</p>
        `
    },
    {
        slug: 'webgpu-next-era',
        title: 'WebGPU: The Next Era of Graphics',
        desc: 'Unlocking native-level 3D performance in the browser.',
        category: 'TECH / 3D',
        readTime: '6 MIN READ',
        author: 'Sarah Chen',
        date: 'Nov 02, 2025',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        content: `
            <h2>Beyond WebGL</h2>
            <p>WebGL has served us well for over a decade, but it was built on OpenGL ES—an API designed for mobile devices from the 2000s. WebGPU is the modern successor, designed to map directly to Vulkan, Metal, and DirectX 12.</p>
            <h2>Compute Shaders</h2>
            <p>The biggest game-changer is compute shaders. This allows us to offload heavy calculations (physics, AI inference, particle systems) to the GPU, freeing up the main thread for interaction logic.</p>
            <p><strong>Key Benefits:</strong></p>
            <ul>
                <li><strong>10x Performance:</strong> Draw calls are significantly cheaper.</li>
                <li><strong>Browser AI:</strong> Running local LLMs efficiently in the browser.</li>
                <li><strong>Complex Simulations:</strong> Fluid dynamics and cloth simulation in real-time.</li>
            </ul>
        `
    },
    {
        slug: 'seo-in-chatgpt-era',
        title: 'SEO in the Age of ChatGPT',
        desc: 'Optimizing for Search Generative Experience (SGE) and LLMs.',
        category: 'STRATEGY / SEO',
        readTime: '4 MIN READ',
        author: 'Marcus Weber',
        date: 'Sep 28, 2025',
        image: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?auto=format&fit=crop&w=1200&q=80',
        content: `
            <h2>From Links to Answers</h2>
            <p>Google's SGE (Search Generative Experience) answers questions directly. If your content is just "10 blue links" bait, you will lose visibility. The goal now is to be the *source* of the AI's answer.</p>
            <h2>EEAT is King</h2>
            <p>Experience, Expertise, Authoritativeness, and Trustworthiness. AI can generate generic content, but it cannot generate genuine human experience. Personal anecdotes, original data studies, and contrarian takes are the new gold.</p>
            <ul>
                <li><strong>Structured Data:</strong> Feed the bots with clear Schema.org markup.</li>
                <li><strong>Brand Entity:</strong> Build your brand so users search for *you*, not just keywords.</li>
            </ul>
        `
    },
    {
        slug: 'spatial-computing-web',
        title: 'Spatial Computing & The Web',
        desc: 'Designing websites for Apple Vision Pro and Meta Quest.',
        category: 'VR / AR',
        readTime: '7 MIN READ',
        author: 'Elena Voigt',
        date: 'Dec 15, 2025',
        image: 'https://images.unsplash.com/photo-1622979135225-d2ba269fb1bd?auto=format&fit=crop&w=1200&q=80',
        content: `
            <h2>The Infinite Canvas</h2>
            <p>With the release of Vision Pro, the web is breaking out of the 16:9 monitor. Spatial web design isn't just about VR; it's about depth, glassmorphism, and gaze-based interaction.</p>
            <h2>CSS for Spatial</h2>
            <p>Did you know CSS is evolving? New media queries allow us to detect immersive sessions. We can now design layouts that curve around the user or float elements at different Z-depths.</p>
            <p>Brands that adopt spatial-ready websites now will define the luxury digital experience of the late 2020s.</p>
        `
    },
    {
        slug: 'headless-cms-vs-monolith',
        title: 'Headless CMS vs. Monolith',
        desc: 'Why modern brands are decoupling frontend from backend.',
        category: 'DEV / ARCHITECTURE',
        readTime: '5 MIN READ',
        author: 'David Kim',
        date: 'Aug 10, 2025',
        image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=1200&q=80',
        content: `
            <h2>Speed and Flexibility</h2>
            <p>Monolithic platforms (like old WordPress or Magento) couple the display layer with the data layer. This makes redesigns painful and performance optimization difficult.</p>
            <h2>The Headless Advantage</h2>
            <p>By using a Headless CMS (Sanity, Contentful, Strapi), we can build the frontend in React/Next.js. This results in:</p>
            <ul>
                <li><strong>Instant Page Loads:</strong> Static generation at the edge.</li>
                <li><strong>Omnichannel:</strong> Push content to Web, App, and Watch from one place.</li>
                <li><strong>Security:</strong> The database isn't exposed directly to the public web.</li>
            </ul>
        `
    },
    {
        slug: 'sustainable-web-design',
        title: 'Sustainable Web Design',
        desc: 'Reducing digital carbon footprints through code efficiency.',
        category: 'ETHICS / CODE',
        readTime: '4 MIN READ',
        author: 'Anna Green',
        date: 'Jul 22, 2025',
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
        content: `
            <h2>The Internet's Carbon Cost</h2>
            <p>If the internet were a country, it would be the 6th largest polluter. Every byte transferred requires energy. Heavy websites aren't just slow; they are dirty.</p>
            <h2>Green Coding</h2>
            <p>We practice sustainable design by:</p>
            <ul>
                <li><strong>Optimizing Assets:</strong> AVIF/WebP formats and lazy loading.</li>
                <li><strong>Dark Mode:</strong> Saves battery on OLED screens.</li>
                <li><strong>Efficient Caching:</strong> Reducing server requests.</li>
            </ul>
            <p>Good performance is good for the planet.</p>
        `
    },
    {
        slug: 'micro-interactions-matter',
        title: 'Why Micro-interactions Matter',
        desc: 'The psychology of UI animation and user delight.',
        category: 'UX / DESIGN',
        readTime: '3 MIN READ',
        author: 'Lucas Ponti',
        date: 'Jun 14, 2025',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
        content: `
            <h2>Feedback Loops</h2>
            <p>A button click shouldn't just do something; it should *feel* like it did something. Micro-interactions provide the tactile feedback that builds trust.</p>
            <h2>Delight in Details</h2>
            <p>It's the little things: the way a toggle slides, the bounce of a notification, the loading skeleton. These details separate a "functional" app from a "premium" product.</p>
        `
    },
    {
        slug: 'end-of-cookies',
        title: 'The End of Third-Party Cookies',
        desc: 'Marketing strategies for a privacy-first world.',
        category: 'MARKETING',
        readTime: '5 MIN READ',
        author: 'Rachel Moore',
        date: 'May 30, 2025',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        content: `
            <h2>Privacy Sandbox</h2>
            <p>Chrome is phasing out third-party cookies. Retargeting ads as we know them are dying. The solution? First-party data.</p>
            <h2>Owning Your Audience</h2>
            <p>Brands must build direct relationships. Email lists, community discords, and loyalty programs are more valuable than any ad pixel. We help brands build infrastructure to collect and utilize their own data ethically.</p>
        `
    },
    {
        slug: 'ai-personalization',
        title: 'AI-Driven Personalization',
        desc: 'Tailoring user journeys in real-time with machine learning.',
        category: 'AI / UX',
        readTime: '6 MIN READ',
        author: 'Tom Hiddleston',
        date: 'Apr 18, 2025',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
        content: `
            <h2>Dynamic Content</h2>
            <p>Why show the same hero banner to a returning customer as a first-time visitor? AI can analyze behavior in real-time to swap images, copy, and CTAs.</p>
            <p>We implement tools like Vercel Edge Middleware to personalize content at the CDN level, ensuring zero latency penalty for dynamic experiences.</p>
        `
    },
    {
        slug: 'nocode-vs-procode',
        title: 'No-Code vs. Pro-Code',
        desc: 'Finding the right balance for enterprise speed.',
        category: 'DEV / OPS',
        readTime: '4 MIN READ',
        author: 'Sarah Chen',
        date: 'Mar 22, 2025',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
        content: `
            <h2>The Hybrid Stack</h2>
            <p>Marketing teams need speed (Webflow, Framer). Product teams need power (React, Node). The modern enterprise uses both.</p>
            <p>We architect systems where the marketing site is agile and no-code, while the core app remains a robust engineering feat, stitched together seamlessly on the same domain.</p>
        `
    }
];

// --- Service Data ---
const services = [
    {
        slug: 'seo',
        title: 'SEO Strategy',
        desc: 'Dominating search results isn’t magic—it’s engineering.',
        features: `
            <div class="feature-item"><h3>Technical Audits</h3><p>Deep crawl analysis to fix indexing and render-blocking issues.</p></div>
            <div class="feature-item"><h3>Content Silos</h3><p>Structuring content to establish topical authority.</p></div>
            <div class="feature-item"><h3>Core Web Vitals</h3><p>Speed optimization for ranking boosts.</p></div>
        `,
        process: `
            <div class="process-row"><div class="step-num">01</div><div><h3>Audit</h3><p>We analyze your current footprint and competitors.</p></div></div>
            <div class="process-row"><div class="step-num">02</div><div><h3>Strategy</h3><p>Keyword mapping and technical roadmap.</p></div></div>
            <div class="process-row"><div class="step-num">03</div><div><h3>Execution</h3><p>Content creation and on-page optimization.</p></div></div>
        `
    },
    {
        slug: 'branding',
        title: 'Brand Identity',
        desc: 'We craft visual identities that resonate deeply with your target audience.',
        features: `
            <div class="feature-item"><h3>Visual Systems</h3><p>Logos, typography, and color theory.</p></div>
            <div class="feature-item"><h3>Voice & Tone</h3><p>Defining how your brand speaks.</p></div>
            <div class="feature-item"><h3>Brand Guidelines</h3><p>A rulebook for consistency.</p></div>
        `,
        process: `
            <div class="process-row"><div class="step-num">01</div><div><h3>Discovery</h3><p>Understanding your core values.</p></div></div>
            <div class="process-row"><div class="step-num">02</div><div><h3>Concept</h3><p>Iterating on visual directions.</p></div></div>
            <div class="process-row"><div class="step-num">03</div><div><h3>Delivery</h3><p>Final assets and style guides.</p></div></div>
        `
    },
    {
        slug: 'motion',
        title: 'Motion Design',
        desc: 'We use motion to guide attention and delight users.',
        features: `
            <div class="feature-item"><h3>WebGL</h3><p>High-performance 3D graphics.</p></div>
            <div class="feature-item"><h3>Micro-interactions</h3><p>Subtle UI feedback.</p></div>
            <div class="feature-item"><h3>Scrolltelling</h3><p>Narrative-driven scroll experiences.</p></div>
        `,
        process: `
            <div class="process-row"><div class="step-num">01</div><div><h3>Storyboarding</h3><p>Planning the motion flow.</p></div></div>
            <div class="process-row"><div class="step-num">02</div><div><h3>Animation</h3><p>GSAP and Three.js implementation.</p></div></div>
            <div class="process-row"><div class="step-num">03</div><div><h3>Optimization</h3><p>Ensuring 60fps performance.</p></div></div>
        `
    },
    {
        slug: 'ecommerce',
        title: 'E-Commerce',
        desc: 'We build stores that sell, using headless architecture.',
        features: `
            <div class="feature-item"><h3>Headless Shopify</h3><p>Ultimate flexibility and speed.</p></div>
            <div class="feature-item"><h3>Custom Checkout</h3><p>Optimized for conversion.</p></div>
            <div class="feature-item"><h3>PIM Integration</h3><p>Managing complex catalogs.</p></div>
        `,
        process: `
            <div class="process-row"><div class="step-num">01</div><div><h3>Architecture</h3><p>Selecting the right stack.</p></div></div>
            <div class="process-row"><div class="step-num">02</div><div><h3>Build</h3><p>Frontend development and API hookups.</p></div></div>
            <div class="process-row"><div class="step-num">03</div><div><h3>Launch</h3><p>Testing payments and fulfillment.</p></div></div>
        `
    },
    {
        slug: 'mobile-apps',
        title: 'Mobile Apps',
        desc: 'Native and cross-platform apps for iOS and Android.',
        features: `
            <div class="feature-item"><h3>React Native</h3><p>One codebase, two platforms.</p></div>
            <div class="feature-item"><h3>Native UI</h3><p>Smooth, platform-specific interactions.</p></div>
            <div class="feature-item"><h3>Offline Mode</h3><p>Robust local data sync.</p></div>
        `,
        process: `
            <div class="process-row"><div class="step-num">01</div><div><h3>UX Design</h3><p>Mobile-first prototyping.</p></div></div>
            <div class="process-row"><div class="step-num">02</div><div><h3>Dev</h3><p>Building core features.</p></div></div>
            <div class="process-row"><div class="step-num">03</div><div><h3>Deploy</h3><p>App Store submission.</p></div></div>
        `
    },
    {
        slug: 'analytics',
        title: 'Data & Analytics',
        desc: 'Guesswork is expensive. We implement robust tracking.',
        features: `
            <div class="feature-item"><h3>Event Tracking</h3><p>Measuring every click and interaction.</p></div>
            <div class="feature-item"><h3>Dashboards</h3><p>Real-time visualization of KPIs.</p></div>
            <div class="feature-item"><h3>A/B Testing</h3><p>Data-driven optimization.</p></div>
        `,
        process: `
            <div class="process-row"><div class="step-num">01</div><div><h3>Audit</h3><p>Reviewing current data quality.</p></div></div>
            <div class="process-row"><div class="step-num">02</div><div><h3>Setup</h3><p>GTM and GA4 configuration.</p></div></div>
            <div class="process-row"><div class="step-num">03</div><div><h3>Analysis</h3><p>Monthly reporting and insights.</p></div></div>
        `
    }
];

// --- Generation Loop ---

// 1. Generate Blogs
blogs.forEach(blog => {
    let content = blogTemplate
        .replace(/TITLE_PLACEHOLDER/g, blog.title)
        .replace(/META_DESC_PLACEHOLDER/g, blog.desc)
        .replace(/CATEGORY_PLACEHOLDER/g, blog.category)
        .replace(/READ_TIME_PLACEHOLDER/g, blog.readTime)
        .replace(/AUTHOR_PLACEHOLDER/g, blog.author)
        .replace(/AUTHOR_IMG_PLACEHOLDER/g, `https://ui-avatars.com/api/?name=${blog.author}&background=random`)
        .replace(/DATE_PLACEHOLDER/g, blog.date)
        .replace(/IMAGE_PLACEHOLDER/g, blog.image)
        .replace('CONTENT_PLACEHOLDER', blog.content);
    
    fs.writeFileSync(path.join(__dirname, 'blog', `${blog.slug}.html`), content);
    console.log(`Generated Blog: ${blog.slug}`);
});

// 2. Generate Services
services.forEach(service => {
    let content = serviceTemplate
        .replace(/TITLE_PLACEHOLDER/g, service.title)
        .replace(/META_DESC_PLACEHOLDER/g, service.desc)
        .replace(/INTRO_PLACEHOLDER/g, service.desc)
        .replace('FEATURES_PLACEHOLDER', service.features)
        .replace('PROCESS_PLACEHOLDER', service.process);

    fs.writeFileSync(path.join(__dirname, 'services', `${service.slug}.html`), content);
    console.log(`Generated Service: ${service.slug}`);
});

console.log('--- Content Generation Complete ---');
