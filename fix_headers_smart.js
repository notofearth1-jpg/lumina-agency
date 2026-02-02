const fs = require('fs');
const path = require('path');

// --- Templates ---
const templates = [
    'blog_template.html',
    'service_template.html',
    'page_template.html',
    'case_study_template.html',
    'career_template.html'
];

// --- The Correct Header to Enforce (Corrected Path Logic) ---
const headerHTML = `
    <nav>
        <div class="nav-container">
            <a href="../../index.html" class="logo">LUMINA<span class="dot">.</span></a>
            <div class="desktop-menu">
                <a href="../../index.html" class="nav-link">Home</a>
                <a href="../../work.html" class="nav-link">Work</a>
                <a href="../../expertise.html" class="nav-link">Expertise</a>
                <a href="../../agency.html" class="nav-link">Agency</a>
            </div>
            <a href="../../contact.html" class="cta-button">Let's Talk</a>
            <button class="menu-toggle"><span class="line"></span><span class="line"></span></button>
        </div>
    </nav>
`;

const rootHeaderHTML = `
    <nav>
        <div class="nav-container">
            <a href="index.html" class="logo">LUMINA<span class="dot">.</span></a>
            <div class="desktop-menu">
                <a href="index.html" class="nav-link">Home</a>
                <a href="work.html" class="nav-link">Work</a>
                <a href="expertise.html" class="nav-link">Expertise</a>
                <a href="agency.html" class="nav-link">Agency</a>
            </div>
            <a href="contact.html" class="cta-button">Let's Talk</a>
            <button class="menu-toggle"><span class="line"></span><span class="line"></span></button>
        </div>
    </nav>
`;

// Helper to determine relative path depth
function getRelativeHeader(depth) {
    let prefix = '';
    for (let i = 0; i < depth; i++) prefix += '../';
    
    return `
    <nav>
        <div class="nav-container">
            <a href="${prefix}index.html" class="logo">LUMINA<span class="dot">.</span></a>
            <div class="desktop-menu">
                <a href="${prefix}index.html" class="nav-link">Home</a>
                <a href="${prefix}work.html" class="nav-link">Work</a>
                <a href="${prefix}expertise.html" class="nav-link">Expertise</a>
                <a href="${prefix}agency.html" class="nav-link">Agency</a>
            </div>
            <a href="${prefix}contact.html" class="cta-button">Let's Talk</a>
            <button class="menu-toggle"><span class="line"></span><span class="line"></span></button>
        </div>
    </nav>`;
}

// 1. Update Templates (Base Templates assume depth 2 for generation, or need variable injection)
// We will rely on generator scripts to inject the correct header, or fix them post-generation.
// Actually, let's fix the generator scripts to use this dynamic header.

// For now, let's fix the existing files directly based on their location.

function fixFileHeader(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Determine depth based on slashes in relative path from agency root
    // agency/index.html -> depth 0
    // agency/services/seo.html -> depth 1
    // agency/projects/nexus/index.html -> depth 2
    
    // We are running this script from /agency/
    const relPath = path.relative(__dirname, filePath);
    const depth = relPath.split(path.sep).length - 1;
    
    const newHeader = getRelativeHeader(depth);
    
    // Regex to match existing nav (including potentially broken ones)
    const navRegex = /<nav>[\s\S]*?<\/nav>/;
    
    if (navRegex.test(content)) {
        content = content.replace(navRegex, newHeader);
        
        // Fix Active State
        if (filePath.includes('index.html') && depth === 0) content = content.replace('href="index.html" class="nav-link"', 'href="index.html" class="nav-link active"');
        if (filePath.includes('work.html') || filePath.includes('projects/')) content = content.replace(/href="[^"]*work.html" class="nav-link"/, match => match.replace('class="nav-link"', 'class="nav-link active"'));
        if (filePath.includes('expertise.html') || filePath.includes('services/')) content = content.replace(/href="[^"]*expertise.html" class="nav-link"/, match => match.replace('class="nav-link"', 'class="nav-link active"'));
        if (filePath.includes('agency.html') || filePath.includes('about/')) content = content.replace(/href="[^"]*agency.html" class="nav-link"/, match => match.replace('class="nav-link"', 'class="nav-link active"'));
        
        fs.writeFileSync(filePath, content);
        console.log(`Fixed header for: ${relPath}`);
    }
}

// List of all files to fix
const files = [
    'index.html', 'work.html', 'expertise.html', 'agency.html', 'contact.html', 'sitemap.html',
    'services/seo.html', 'services/branding.html', 'services/motion.html', 
    'services/ecommerce.html', 'services/mobile-apps.html', 'services/analytics.html', 'services/development.html',
    'blog/rise-of-generative-ui.html', 'blog/webgpu-next-era.html', 'blog/seo-in-chatgpt-era.html',
    'blog/spatial-computing-web.html', 'blog/headless-cms-vs-monolith.html', 'blog/sustainable-web-design.html',
    'blog/micro-interactions-matter.html', 'blog/end-of-cookies.html', 'blog/ai-personalization.html', 'blog/nocode-vs-procode.html',
    'about/team.html', 'about/careers.html', 'about/culture.html', 'about/awards.html',
    'about/jobs/senior-frontend-engineer.html', 'about/jobs/product-designer.html', 'about/jobs/seo-strategist.html',
    'legal/privacy.html', 'legal/terms.html', 'legal/cookies.html', 'legal/impressum.html',
    'projects/nexus/index.html', 'projects/aura/index.html', 'projects/gym/index.html',
    'projects/restaurant/index.html', 'projects/salon/index.html', 'projects/boutique/index.html',
    'projects/coaching/index.html', 'projects/armory/index.html'
];

files.forEach(f => fixFileHeader(path.join(__dirname, f)));
