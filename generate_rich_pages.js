const fs = require('fs');
const path = require('path');

// --- Templates ---
const blogTemplate = fs.readFileSync(path.join(__dirname, 'blog_template.html'), 'utf8');
const serviceTemplate = fs.readFileSync(path.join(__dirname, 'service_template.html'), 'utf8');
const pageTemplate = fs.readFileSync(path.join(__dirname, 'page_template.html'), 'utf8');
const caseStudyTemplate = fs.readFileSync(path.join(__dirname, 'case_study_template.html'), 'utf8');

// --- Helper: Generate List HTML ---
const listHTML = (items) => items.map(i => `<li>${i}</li>`).join('');

// --- Data: Case Studies ---
const caseStudies = [
    {
        slug: 'nexus',
        title: 'Nexus VR Launch',
        year: '2025',
        category: 'Immersive Web',
        client: 'Nexus Technologies',
        heroImg: 'https://images.unsplash.com/photo-1624571409412-1f253e1ecc89?auto=format&fit=crop&w=1600&q=80',
        services: ['3D Design', 'Web Development', 'Strategy'],
        tech: ['React Three Fiber', 'Next.js', 'WebGL', 'GSAP'],
        challenge: 'Nexus needed to launch their X1 headset with a bang. Traditional e-commerce pages felt flat. They wanted a web experience that rivaled the immersion of the headset itself.',
        solution: 'We built a fully interactive 3D landing page where users can "explode" the headset model to see internal components. The scroll-controlled animation tells the story of the hardware, resulting in a 400% increase in pre-order engagement compared to their previous static site.',
        gallery1: 'https://images.unsplash.com/photo-1633412803867-0f4abd1be462?auto=format&fit=crop&w=1200&q=80',
        gallery2: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=1200&q=80'
    },
    {
        slug: 'aura',
        title: 'Aura Interiors',
        year: '2025',
        category: 'E-Commerce',
        client: 'Aura Living',
        heroImg: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
        services: ['UX/UI Design', 'Shopify Dev', 'Art Direction'],
        tech: ['Shopify Plus', 'Liquid', 'Vue.js'],
        challenge: 'Aura’s previous site was cluttered and slow, failing to reflect their high-end, minimalist furniture. They needed a digital flagship store that felt like an art gallery.',
        solution: 'We stripped away the noise. Using a headless Shopify architecture, we created a lightning-fast browsing experience with massive, high-fidelity imagery. A custom "Room Visualizer" allows users to see pieces in context.',
        gallery1: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        gallery2: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
    },
    {
        slug: 'gym',
        title: 'Iron Forge Gym',
        year: '2024',
        category: 'Branding',
        client: 'Iron Forge Fitness',
        heroImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
        services: ['Brand Identity', 'Web Design', 'Local SEO'],
        tech: ['Webflow', 'Memberstack', 'Zapier'],
        challenge: 'Iron Forge was losing members to big-box chains. They lacked a distinct identity and their website was non-functional for booking classes.',
        solution: 'We rebranded them as the home for serious athletes. The new site features a bold, gritty aesthetic and a seamless class booking system. Member sign-ups increased by 40% in the first month.',
        gallery1: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
        gallery2: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80'
    },
    {
        slug: 'restaurant',
        title: 'Taste & Soul',
        year: '2024',
        category: 'Hospitality',
        client: 'T&S Group',
        heroImg: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
        services: ['Photography', 'Web Design', 'Reservations'],
        tech: ['WordPress', 'OpenTable API', 'React'],
        challenge: 'A fusion restaurant needed to fill tables on weeknights. Their old site didn\'t showcase their stunning dishes or allow for easy reservations.',
        solution: 'We put the food front and center with a dark, moody design. We integrated a custom reservation engine that reduces friction. The result? A 200% increase in online bookings.',
        gallery1: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
        gallery2: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80'
    },
    {
        slug: 'salon',
        title: 'Éclat Salon',
        year: '2024',
        category: 'Beauty',
        client: 'Éclat Paris',
        heroImg: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80',
        services: ['Booking System', 'Brand Strategy', 'Social Media'],
        tech: ['Next.js', 'PostgreSQL', 'Stripe'],
        challenge: 'Éclat’s phone lines were clogged with appointment calls. They needed a premium self-service booking platform that reflected their luxury status.',
        solution: 'We built a bespoke booking app that allows clients to choose stylists, services, and times. The design is clean, elegant, and perfectly responsive.',
        gallery1: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1200&q=80',
        gallery2: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80'
    },
    {
        slug: 'boutique',
        title: 'Velvet Boutique',
        year: '2023',
        category: 'Fashion',
        client: 'Velvet Global',
        heroImg: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
        services: ['E-Commerce', 'Performance', 'Motion'],
        tech: ['Hydrogen', 'Sanity CMS', 'Tailwind'],
        challenge: 'Velvet wanted to scale globally but their site was slow and crashed during drops. They needed enterprise-grade performance.',
        solution: 'We migrated them to a headless stack on Vercel Edge Network. The site now loads in under 800ms globally, handling traffic spikes with ease.',
        gallery1: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
        gallery2: 'https://images.unsplash.com/photo-1490481651871-32d6d6228b5b?auto=format&fit=crop&w=1200&q=80'
    },
    {
        slug: 'coaching',
        title: 'Bright Minds',
        year: '2023',
        category: 'Education',
        client: 'Bright Minds Academy',
        heroImg: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80',
        services: ['LMS', 'Student Portal', 'Web App'],
        tech: ['MERN Stack', 'AWS', 'Socket.io'],
        challenge: 'A leading coaching institute needed to digitize their curriculum and track student progress online.',
        solution: 'We developed a comprehensive Learning Management System (LMS) with live classes, test series, and performance analytics dashboards for parents.',
        gallery1: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
        gallery2: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80'
    }
];

// --- Data: Agency Pages ---
const agencyPages = [
    {
        path: 'about/team.html',
        title: 'Leadership',
        category: 'AGENCY / PEOPLE',
        intro: 'We are a collective of visionaries, engineers, and artists. Led by industry veterans, our team is dedicated to pushing the boundaries of digital.',
        body1: 'Our leadership team brings together decades of experience from top tech companies and design studios.',
        body2: 'We believe in a flat hierarchy where the best idea wins. Every member of the team is empowered to make decisions and drive impact.',
        h1: 'Vibhu Thanki',
        h2: 'Founder & CEO',
        h3: 'Creative Director'
    },
    {
        path: 'about/careers.html',
        title: 'Careers',
        category: 'AGENCY / JOIN US',
        intro: 'Do the best work of your life. We are looking for exceptional talent to help us build the future of the web.',
        body1: 'Current Openings: 1. Senior Frontend Engineer (React/WebGL) - Remote. 2. UI/UX Designer - Berlin/Hybrid. 3. SEO Strategist - Remote.',
        body2: 'We offer competitive equity, unlimited PTO, and a stipend for learning and development. If you are obsessed with quality, we want to hear from you.',
        h1: 'Frontend Engineer',
        h2: 'Product Designer',
        h3: 'Growth Marketer'
    },
    {
        path: 'about/culture.html',
        title: 'Our Culture',
        category: 'AGENCY / DNA',
        intro: 'We value craft, curiosity, and collaboration. We are not a feature factory; we are a laboratory for digital innovation.',
        body1: 'We work in small, autonomous squads. This keeps us fast and agile. We prioritize deep work and protect our makers from unnecessary meetings.',
        body2: 'Diversity is our strength. We actively seek out perspectives that challenge our own, fostering an environment of continuous growth.',
        h1: 'Deep Work',
        h2: 'Radical Candor',
        h3: 'Continuous Learning'
    },
    {
        path: 'about/awards.html',
        title: 'Recognition',
        category: 'AGENCY / AWARDS',
        intro: 'Our work has been recognized by the industry’s most prestigious bodies. But our proudest metric is client success.',
        body1: '2025: Awwwards Agency of the Year Nominee. 2024: Webby Award for Best Use of Animation. 2024: CSS Design Awards - Site of the Day.',
        body2: 'These accolades validate our commitment to pushing the envelope of what is possible in a browser.',
        h1: 'Awwwards',
        h2: 'The FWA',
        h3: 'Webby Awards'
    }
];

// --- Generation Loop ---

// 1. Generate Case Studies
caseStudies.forEach(cs => {
    let content = caseStudyTemplate
        .replace(/TITLE_PLACEHOLDER/g, cs.title)
        .replace(/META_DESC_PLACEHOLDER/g, `Case study for ${cs.title} - ${cs.challenge}`)
        .replace(/YEAR_PLACEHOLDER/g, cs.year)
        .replace(/CATEGORY_PLACEHOLDER/g, cs.category)
        .replace(/HERO_IMG_PLACEHOLDER/g, cs.heroImg)
        .replace(/SERVICES_LIST_PLACEHOLDER/g, listHTML(cs.services))
        .replace(/TECH_STACK_PLACEHOLDER/g, listHTML(cs.tech))
        .replace(/CLIENT_PLACEHOLDER/g, cs.client)
        .replace(/CHALLENGE_PLACEHOLDER/g, cs.challenge)
        .replace(/SOLUTION_PLACEHOLDER/g, cs.solution)
        .replace(/GALLERY_IMG_1/g, cs.gallery1)
        .replace(/GALLERY_IMG_2/g, cs.gallery2);

    const dir = path.join(__dirname, 'projects', cs.slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), content);
    console.log(`Generated Case Study: ${cs.slug}`);
});

// 2. Generate Agency Pages
agencyPages.forEach(page => {
    let content = pageTemplate
        .replace(/TITLE_PLACEHOLDER/g, page.title)
        .replace(/CATEGORY_PLACEHOLDER/g, page.category)
        .replace(/CONTENT_INTRO_PLACEHOLDER/g, page.intro)
        .replace(/CONTENT_BODY_1/g, page.body1)
        .replace(/CONTENT_BODY_2/g, page.body2)
        .replace(/HIGHLIGHT_1/g, page.h1)
        .replace(/HIGHLIGHT_2/g, page.h2)
        .replace(/HIGHLIGHT_3/g, page.h3);
    
    fs.writeFileSync(path.join(__dirname, page.path), content);
    console.log(`Generated Agency Page: ${page.path}`);
});

console.log('--- Rich Content Generation Complete ---');
