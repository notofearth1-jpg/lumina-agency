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

// --- The Correct Header to Enforce ---
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

// Update Templates
templates.forEach(t => {
    let content = fs.readFileSync(path.join(__dirname, t), 'utf8');
    
    // Determine correct header depth
    let header = headerHTML.replace(/\.\.\/\.\.\//g, '../'); // Default (1 level deep)
    if (t === 'case_study_template.html') {
        header = headerHTML; // Keep ../../ for Case Studies (2 levels deep)
    }

    // Regex to replace existing <nav> block
    content = content.replace(/<nav>[\s\S]*?<\/nav>/, header); 
    fs.writeFileSync(path.join(__dirname, t), content);
});

// Update Root Pages
['work.html', 'expertise.html', 'agency.html', 'contact.html', 'sitemap.html'].forEach(p => {
    let content = fs.readFileSync(path.join(__dirname, p), 'utf8');
    content = content.replace(/<nav>[\s\S]*?<\/nav>/, rootHeaderHTML);
    
    // Set Active State
    if(p === 'index.html') content = content.replace('href="index.html" class="nav-link"', 'href="index.html" class="nav-link active"');
    if(p === 'work.html') content = content.replace('href="work.html" class="nav-link"', 'href="work.html" class="nav-link active"');
    if(p === 'expertise.html') content = content.replace('href="expertise.html" class="nav-link"', 'href="expertise.html" class="nav-link active"');
    if(p === 'agency.html') content = content.replace('href="agency.html" class="nav-link"', 'href="agency.html" class="nav-link active"');

    fs.writeFileSync(path.join(__dirname, p), content);
});

console.log("Headers unified.");
