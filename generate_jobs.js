const fs = require('fs');
const path = require('path');

// --- Templates ---
const blogTemplate = fs.readFileSync(path.join(__dirname, 'blog_template.html'), 'utf8');
const serviceTemplate = fs.readFileSync(path.join(__dirname, 'service_template.html'), 'utf8');
const pageTemplate = fs.readFileSync(path.join(__dirname, 'page_template.html'), 'utf8');
const caseStudyTemplate = fs.readFileSync(path.join(__dirname, 'case_study_template.html'), 'utf8');
const careerTemplate = fs.readFileSync(path.join(__dirname, 'career_template.html'), 'utf8');

// --- Helper: Generate List HTML ---
const listHTML = (items) => items.map(i => `<li>${i}</li>`).join('');

// --- Helper: Fix Nav Active State ---
// Replaces the nav block with one where the specific link class has 'active' added
const setActiveNav = (html, activePage) => {
    // Reset all actives
    let newHtml = html.replace(/class="nav-link active"/g, 'class="nav-link"');

    // Set specific active
    if (activePage === 'home') newHtml = newHtml.replace('href="../index.html" class="nav-link"', 'href="../index.html" class="nav-link active"');
    if (activePage === 'work') newHtml = newHtml.replace('href="../work.html" class="nav-link"', 'href="../work.html" class="nav-link active"');
    if (activePage === 'expertise') newHtml = newHtml.replace('href="../expertise.html" class="nav-link"', 'href="../expertise.html" class="nav-link active"');
    if (activePage === 'agency') newHtml = newHtml.replace('href="../agency.html" class="nav-link"', 'href="../agency.html" class="nav-link active"');

    return newHtml;
};

// --- Career Data ---
const careers = [
    {
        slug: 'senior-frontend-engineer',
        title: 'Senior Frontend Engineer',
        location: 'Remote (EU Timezone)',
        type: 'Full-Time',
        intro: 'We are looking for a creative engineer who obsesses over interaction details. You will work directly with our design team to implement award-winning WebGL experiences.',
        responsibilities: [
            'Architect and build high-performance frontends using Next.js and React Three Fiber.',
            'Collaborate with designers to implement complex animations using GSAP.',
            'Optimize applications for maximum speed and accessibility (Core Web Vitals).',
            'Mentor junior developers and establish code quality standards.'
        ],
        requirements: [
            '5+ years of experience with React and modern CSS.',
            'Strong proficiency in Three.js / WebGL.',
            'Experience with headless CMS architectures (Sanity, Contentful).',
            'A portfolio demonstrating creative coding projects.'
        ]
    },
    {
        slug: 'product-designer',
        title: 'Product Designer (UI/UX)',
        location: 'Berlin / Hybrid',
        type: 'Full-Time',
        intro: 'Join our design team to craft world-class digital products. You will own the end-to-end design process for major client accounts.',
        responsibilities: [
            'Lead design workshops and discovery sessions with clients.',
            'Create high-fidelity prototypes in Figma.',
            'Design comprehensive design systems and component libraries.',
            'Work closely with developers to ensure implementation matches design intent.'
        ],
        requirements: [
            '4+ years of experience in product or agency design.',
            'Mastery of Figma and prototyping tools.',
            'Strong understanding of typography, layout, and color theory.',
            'Experience designing for both web and mobile platforms.'
        ]
    },
    {
        slug: 'seo-strategist',
        title: 'SEO Strategist',
        location: 'Remote',
        type: 'Contract / Full-Time',
        intro: 'Help our clients dominate search results. You will lead technical and content SEO strategies for high-growth startups.',
        responsibilities: [
            'Conduct comprehensive technical SEO audits.',
            'Develop content strategies based on keyword research and user intent.',
            'Monitor performance using GA4, GSC, and Ahrefs.',
            'Provide actionable recommendations to content and dev teams.'
        ],
        requirements: [
            '3+ years of experience in technical SEO.',
            'Deep understanding of Google algorithms and ranking factors.',
            'Experience with enterprise-level sites and migrations.',
            'Strong analytical skills and ability to report ROI.'
        ]
    }
];

// --- Generation Loop ---

// 1. Generate Careers
const careersDir = path.join(__dirname, 'about/jobs');
if (!fs.existsSync(careersDir)) fs.mkdirSync(careersDir, { recursive: true });

careers.forEach(job => {
    let content = careerTemplate
        .replace(/TITLE_PLACEHOLDER/g, job.title)
        .replace(/LOCATION_PLACEHOLDER/g, job.location)
        .replace(/TYPE_PLACEHOLDER/g, job.type)
        .replace(/INTRO_PLACEHOLDER/g, job.intro)
        .replace(/RESPONSIBILITIES_PLACEHOLDER/g, listHTML(job.responsibilities))
        .replace(/REQUIREMENTS_PLACEHOLDER/g, listHTML(job.requirements))
        .replace(/content="Premium digital agency specializing in design, development, and digital transformation."/g, `content="Join Lumia Digital as a ${job.title}. ${job.intro}"`)
        .replace(/content="TITLE_PLACEHOLDER \| Lumia Digital"/g, `content="${job.title} | Lumia Digital"`); // Fix OG Title if placeholder exists

    // Fix nav paths since we are deeper in /about/jobs/
    // 1. Replace existing ../ links with ../../
    // NOTE: This might turn existing ../../ into ../../../ so we fix that after.
    content = content.replace(/href="\.\.\//g, 'href="../../');
    content = content.replace(/src="\.\.\//g, 'src="../../');

    // 2. Fix triple nesting (created by step 1 on already correct links)
    content = content.replace(/href="\.\.\/\.\.\/\.\.\//g, 'href="../../');
    content = content.replace(/src="\.\.\/\.\.\/\.\.\//g, 'src="../../');

    // 3. Replace root-relative links (e.g. href="index.html") with ../../
    const rootLinks = ['index.html', 'work.html', 'expertise.html', 'agency.html', 'contact.html', 'style.css', 'script.js', 'favicon.png', 'logo.svg'];
    rootLinks.forEach(link => {
        // Replace href="link" with href="../../link"
        const regexHref = new RegExp(`href="${link}"`, 'g');
        content = content.replace(regexHref, `href="../../${link}"`);

        // Replace src="link" with src="../../link"
        const regexSrc = new RegExp(`src="${link}"`, 'g');
        content = content.replace(regexSrc, `src="../../${link}"`);
    });

    // Fix chatbot separately as it had specific issues
    content = content.replace('src="js/chatbot.js"', 'src="../../js/chatbot.js"');
    content = content.replace('src="../../js/email-forms.js"', 'src="../../js/email-forms.js"');

    // Fix favicon consistency
    content = content.replace('href="/favicon.png"', 'href="../../favicon.png"');

    fs.writeFileSync(path.join(careersDir, `${job.slug}.html`), content);
    console.log(`Generated Job: ${job.slug}`);
});

console.log('--- Career Pages Generated ---');
